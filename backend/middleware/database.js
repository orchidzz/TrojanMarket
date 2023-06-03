const AWS = require("aws-sdk");
const fs = require("fs");
require("dotenv").config();

class Database {
    constructor() {
        // Configure the AWS credentials and region
        AWS.config.update({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            sessionToken: process.env.AWS_SESSION_TOKEN,
            region: process.env.AWS_REGION,
        });
        // Create a DynamoDB instance
        // AWS.DynamoDB = new AWS.DynamoDB();
        // Create a S3 instance
        this.s3 = new AWS.S3();
    }
    async #getUserImg(userEmail) {
        try {
            const params = {
                Bucket: process.env.CYCLIC_BUCKET_NAME,
                Key: userEmail,
            };
            var data = await this.s3.getObject(params).promise();
            return data.Body.toString();
        } catch (err) {
            if (err.statusCode === 404) {
                console.log("User's image not found");
            } else {
                console.error("Error retrieving user's image:", err);
            }
            return null;
        }
    }

    async #getItemsImg(itemId) {
        try {
            // key prefix = 'collection_name/'
            const params = {
                Bucket: process.env.CYCLIC_BUCKET_NAME,
                Prefix: itemId + "/",
            };
            const data = await this.s3.listObjectsV2(params);
            return data.Contents;
        } catch (err) {
            if (err.statusCode === 404) {
                console.log("Item's images not found");
            } else {
                console.error("Error retrieving item's images:", err);
            }
            return null;
        }
    }

    async #addItemImg(itemId, imgArr) {
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
                Bucket: process.env.CYCLIC_BUCKET_NAME,
                Key: key,
                Body: imageData,
            };
            try {
                await this.s3.putObject(params).promise();
            } catch (err) {
                console.error("Error adding item's image:", err);
            }
            // Remove the uploaded image file from the server
            fs.unlinkSync(image.path);
        }
    }

    async #updateUserImg(userEmail, item) {
        const params = {
            Bucket: process.env.CYCLIC_BUCKET_NAME,
            Key: userEmail,
            Body: item,
        };
        try {
            await this.s3.putObject(params).promise();
        } catch (error) {
            console.error("Error updating user's image:", error);
        }
    }

    async addUser(userEmail) {
        try {
            const item = {
                pk: "user",
                sk: userEmail,
                username: "Trojan", //default name for new user
            };
            const client = new AWS.DynamoDB.DocumentClient();

            const params = {
                TableName: process.env.CYCLIC_DB,
                Item: item,
            };
            await client.put(params).promise();
        } catch (error) {
            console.log("Error adding user: ", error);
        }
    }

    async getUserInfo(userEmail) {
        const pk = "user";
        const sk = userEmail;
        const client = new AWS.DynamoDB.DocumentClient();
        const params = {
            TableName: process.env.CYCLIC_DB,
            Key: {
                pk: pk,
                sk: sk,
            },
        };
        const result = await client.get(params).promise();
        const user = result.Item;
        console.log(user); // debug
        const userImg = await this.#getUserImg(userEmail);
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
                TableName: process.env.CYCLIC_DB,
                Key: primaryKey,
                UpdateExpression: updateExpression,
                ExpressionAttributeValues: expressionAttributeValues,
            };
            const client = new AWS.DynamoDB.DocumentClient();
            const result = await client.update(params).promise();
            const updatedUser = result.Attributes;
            console.log(updatedUser); //debug
        }
    }

    async getItemsByUser(userEmail) {
        const pk = "item";
        const sk = userEmail;
        const client = new AWS.DynamoDB.DocumentClient();
        const params = {
            TableName: process.env.CYCLIC_DB,
            KeyConditionExpression: "pk = :pk and begins_with(sk, :startsWith)",
            ExpressionAttributeValues: {
                ":pk": pk,
                ":startsWith": sk,
            },
        };
        const result = await client.query(params).promise();
        const items = result.Items;
        items.forEach(async (item) => {
            var imgs = await this.#getItemsImg(item.sk);
            item.imgs = imgs;
        });
        console.log(items); // debug
        return items;
    }

    async getActiveItems() {
        const pk = "item";
        const params = {
            TableName: process.env.CYCLIC_DB,
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
        const client = new AWS.DynamoDB.DocumentClient();
        const result = await client.query(params).promise();

        const items = result.Items;
        items.forEach(async (item) => {
            var imgs = await this.#getItemsImg(item.sk);
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
        itemImgs = null
    ) {
        const itemId = userEmail + "-" + itemListedTime;
        const item = {
            pk: "item",
            sk: itemId,
            title: itemTitle,
            description: itemDescription,
            price: itemPrice,
            active: true,
            buyers: [],
        };
        const client = new AWS.DynamoDB.DocumentClient();

        const params = {
            TableName: process.env.CYCLIC_DB,
            Item: item,
        };
        await client.put(params).promise();

        // add item images to s3
        if (itemImgs) {
            this.#addItemImg(itemId, itemImgs);
        }
    }

    async updateItem(itemId, itemTitle, itemDescription, itemPrice, active) {
        const primaryKey = {
            pk: "item",
            sk: itemId,
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
            TableName: process.env.CYCLIC_DB,
            Key: primaryKey,
            UpdateExpression: updateExpression,
            ConditionExpression: "begins_with(sk, :startsWith)",
            ExpressionAttributeValues: {
                ":startsWith": itemId,
                ...expressionAttributeValues,
            },
        };
        const client = new AWS.DynamoDB.DocumentClient();
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
            TableName: process.env.CYCLIC_DB,
            Key: primaryKey,
            UpdateExpression:
                "SET buyers = list_append(if_not_exists(buyers, :emptyList), :listValue)",
            ExpressionAttributeValues: {
                ":emptyList": [],
                ":listValue": [userEmail],
            },
        };
        const client = new AWS.DynamoDB.DocumentClient();
        const result = await client.update(params).promise();
        const updatedItem = result.Attributes;
        console.log(updatedItem); //debug
    }
}
module.exports = Database;
