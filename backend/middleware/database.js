const AWS = require("aws-sdk");
const fs = require("fs");
require("dotenv").config();

export default class Database {
    constructor() {
        // Configure the AWS credentials and region
        AWS.config.update({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION,
        });
        // Create a DynamoDB instance
        this.dynamodb = new AWS.DynamoDB();
        // Create a S3 instance
        this.s3 = new AWS.S3();
    }
    #getUserImg(userEmail) {
        param = { BucketName: process.env.CYCLIC_BUCKETNAME, Key: userEmail };
        this.s3.getObject(params, (err, data) => {
            if (err) {
                console.error("Error retrieving item:", err);
            } else {
                return data.Body.toString();
            }
        });
    }

    #getItemsImg(itemId) {
        // key prefix = 'collection_name/'
        const params = {
            Bucket: process.env.CYCLIC_BUCKETNAME,
            Prefix: itemId + "/",
        };
        this.s3.listObjectsV2(params, (err, data) => {
            if (err) {
                console.error("Error listing objects:", err);
            } else {
                return data.Contents;
            }
        });
    }

    #addItemImg(itemId, imgArr) {
        //note for future reference:
        // Access the uploaded image files using req.files
        // pass req.files as imgArr
        for (let i = 0; i < imgArr.length; ++i) {
            const image = imgArr[i];
            // Read the image file data
            const imageData = fs.readFileSync(image.path);
            // Create a unique key for each image
            const key = `${itemId}/${i + 1}`;

            const params = {
                Bucket: process.env.CYCLIC_BUCKETNAME,
                Key: key,
                Body: imageData,
            };

            // Use the putObject method to add the image to the bucket
            this.s3.putObject(params, (err) => {
                if (err) {
                    console.error("Error updating user's image:", err);
                }
            });
            // Remove the uploaded image file from the server
            fs.unlinkSync(image.path);
        }
    }

    #updateUserImg(userEmail, item) {
        const params = {
            Bucket: process.env.CYCLIC_BUCKETNAME,
            Key: userEmail,
            Body: item,
        };

        this.s3.putObject(params, (err) => {
            if (err) {
                console.error("Error updating user's image:", err);
            }
        });
    }

    async getUserInfo(userEmail) {
        const pk = "user";
        const sk = userEmail;
        const client = new this.dynamodb.DocumentClient();
        const params = {
            TableName: process.env.CYCLICDB,
            Key: {
                pk: pk,
                sk: sk,
            },
        };
        const result = await client.get(params).promise();
        const user = result.Item;
        console.log(user); // debug
        const userImg = this.#getUserImg(userEmail);
        user.img = userImg;
        return user;
    }

    async updateUserInfo(userEmail, userImg = null, userName = "") {
        if (userImg) {
            // update s3
            this.#updateUserImg(userEmail, userImg);
        }
        if (userName.length != 0) {
            // update username in dynamodb
            const primaryKey = {
                pk: "user",
                sk: userEmail,
            };
            const updateExpression = "SET username = :username";
            const expressionAttributeValues = {
                ":username": userName,
            };
            const params = {
                TableName: process.env.CYCLICDB,
                Key: primaryKey,
                UpdateExpression: updateExpression,
                ExpressionAttributeValues: expressionAttributeValues,
            };
            const client = new this.dynamodb.DocumentClient();
            const result = await client.update(params).promise();
            const updatedUser = result.Attributes;
            console.log(updatedUser); //debug
        }
    }

    async getItemsByUser(userEmail) {
        const pk = "item";
        const sk = userEmail;
        const client = new this.dynamodb.DocumentClient();
        const params = {
            TableName: process.env.CYCLICDB,
            KeyConditionExpression: "pk = :pk and begins_with(sk, :startsWith)",
            ExpressionAttributeValues: {
                ":pk": pk,
                ":startsWith": sk,
            },
        };
        const result = await client.query(params).promise();
        const items = result.Items;
        items.forEach((item) => {
            var imgs = this.#getItemsImg(item.sk);
            item.imgs = imgs;
        });
        console.log(items); // debug
        return items;
    }

    async getActiveItems() {
        const pk = "item";
        const params = {
            TableName: process.env.CYCLICDB,
            KeyConditionExpression: "#pk = :pk",
            FilterExpression: "attribute_exists(active) AND active = :active",
            ExpressionAttributeNames: {
                "#pk": "pk",
            },
            ExpressionAttributeValues: {
                ":pk": pk,
                ":active": true,
            },
        };
        const client = new this.dynamodb.DocumentClient();
        const result = await client.query(params).promise();

        const items = result.Items;
        items.forEach((item) => {
            var imgs = this.#getItemsImg(item.sk);
            item.imgs = imgs;
        });
        console.log(items);
        return items;
    }

    async addItem(
        userEmail,
        itemListedTime,
        itemTitle,
        itemDescription,
        itemPrice,
        itemImgs
    ) {
        const itemId = userEmail + "-" + itemListedTime;
        const item = {
            pk: "item",
            sk: itemId,
            data: {
                title: itemTitle,
                description: itemDescription,
                price: itemPrice,
                active: true,
                buyers: [],
            },
        };
        const client = new this.dynamodb.DocumentClient();

        const params = {
            TableName: process.env.CYCLICDB,
            Item: item,
        };
        await client.put(params).promise();

        // add item images to s3
        this.#addItemImg(itemId, itemImgs);
    }

    async updateItem(itemId, itemTitle, itemDescription, itemPrice, active) {
        const primaryKey = {
            pk: "item",
            sk: userEmail,
        };
        const updateExpression =
            "SET title = :title, description = :description, price = :price, active = :active";
        const expressionAttributeValues = {
            ":title": itemTitle,
            ":description": itemDescription,
            ":price": itemPrice,
            ":active": active,
        };
        const params = {
            TableName: process.env.CYCLICDB,
            Key: primaryKey,
            UpdateExpression: updateExpression,
            ConditionExpression: "begins_with(sk, :startsWith)",
            ExpressionAttributeValues: {
                ":startsWith": itemId,
                ...expressionAttributeValues,
            },
        };
        const client = new this.dynamodb.DocumentClient();
        const result = await client.update(params).promise();
        const updatedItem = result.Attributes;
        console.log(updatedItem); //debug
    }

    async buyItem(userEmail, itemId) {
        const primaryKey = {
            pk: "item",
            sk: itemId,
        };

        const params = {
            TableName: process.env.CYCLICDB,
            Key: primaryKey,
            UpdateExpression:
                "SET buyers = list_append(if_not_exists(buyers, :emptyList), :listValue)",
            ExpressionAttributeValues: {
                ":emptyList": [],
                ":listValue": [userEmail],
            },
        };
        const client = new this.dynamodb.DocumentClient();
        const result = await client.update(params).promise();
        const updatedItem = result.Attributes;
        console.log(updatedItem); //debug
    }
}
