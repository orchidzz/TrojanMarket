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
        // Create a S3 instance
        this.s3 = new AWS.S3();
    }
    async #getUserImg(userEmail) {
        try {
            const params = {
                Bucket: process.env.CYCLIC_BUCKET_NAME,
                Key: userEmail,
                Expires: 3600, //expires in 1 hour
            };
            var data = this.s3.getSignedUrl("getObject", params);

            return data;
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
                Expires: 3600, //expires in 1 hour
            };
            var res = [];
            const data = await this.s3.listObjectsV2(params);
            data.Contents.map((img) => {
                const urlParams = {
                    Bucket: process.env.CYCLIC_BUCKET_NAME,
                    Key: img.Key,
                    Expires: 3600, //expires in 1 hour
                };
                var url = this.s3.getSignedUrl("getObject", urlParams);
                res.push(url);
            });
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
            const item = imgArr[i];
            // Create a unique key for each image
            const key = `${itemId}/${i + 1}`;
            const data = Buffer.from(item.split(",")[1], "base64");
            const type = item.split(";")[0].split("/")[1];
            const params = {
                Bucket: process.env.CYCLIC_BUCKET_NAME,
                Key: key,
                Body: data,
                ContentEncoding: "base64",
                ContentType: `image/${type}`,
            };
            try {
                await this.s3.putObject(params).promise();
            } catch (err) {
                console.error("Error adding item's image:", err);
            }
        }
    }

    async #updateUserImg(userEmail, item) {
        // format of item: data:image/type;base64,encoding
        const data = Buffer.from(item.split(",")[1], "base64");
        const type = item.split(";")[0].split("/")[1];
        const params = {
            Bucket: process.env.CYCLIC_BUCKET_NAME,
            Key: userEmail,
            Body: data,
            ContentEncoding: "base64",
            ContentType: `image/${type}`,
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
            KeyConditionExpression: "pk = :pk and sk = :sk",
            ExpressionAttributeValues: {
                ":pk": pk,
                ":sk": sk,
            },
        };
        const result = await client.query(params).promise();
        var user = result.Items[0];
        if (user) {
            const userImg = await this.#getUserImg(userEmail);
            user.img = userImg;
        }
        return user;
    }

    async updateUserInfo(userEmail, userImg = null, userName = null) {
        if (userImg) {
            // update s3
            this.#updateUserImg(userEmail, userImg);
        }
        if (!userName) {
            return;
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
    }

    async addRating(
        raterEmail,
        sellerEmail,
        datetime,
        responsiveness,
        trustworthiness,
        timeliness
    ) {
        const sk = sellerEmail + "-" + raterEmail + "-" + datetime;
        const item = {
            pk: "rating",
            sk: sk,
            rater: raterEmail,
            responsiveness: responsiveness,
            trustworthiness: trustworthiness,
            timeliness: timeliness,
        };
        const client = new AWS.DynamoDB.DocumentClient();

        const params = {
            TableName: process.env.CYCLIC_DB,
            Item: item,
        };
        await client.put(params).promise();
    }

    async getRatingsBySeller(sellerEmail) {
        const pk = "rating";
        const sk = sellerEmail;
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
        var items = result.Items;
        if (!items) {
            items = [];
        }
        return items;
    }

    async addChat(senderEmail, receiverEmail, datetime, message) {
        const sk = receiverEmail + "-" + senderEmail + "-" + datetime;
        const item = {
            pk: "chat",
            sk: sk,
            sender: senderEmail,
            receiver: receiverEmail,
            datetime: datetime,
            message: message,
        };
        const client = new AWS.DynamoDB.DocumentClient();

        const params = {
            TableName: process.env.CYCLIC_DB,
            Item: item,
        };
        await client.put(params).promise();
    }

    async getChatsByUser(userEmail) {
        const pk = "chat";
        const sk = userEmail;
        const client = new AWS.DynamoDB.DocumentClient();
        const params1 = {
            TableName: process.env.CYCLIC_DB,
            KeyConditionExpression: "pk = :pk and begins_with(sk, :startsWith)",
            ExpressionAttributeValues: {
                ":pk": pk,
                ":startsWith": sk,
            },
            ScanIndexForward: true,
        };
        const params2 = {
            TableName: process.env.CYCLIC_DB,
            KeyConditionExpression: "#pk = :pk",
            FilterExpression: "attribute_exists(sender) AND sender = :sender",
            ExpressionAttributeNames: {
                "#pk": "pk",
            },
            ExpressionAttributeValues: {
                ":pk": pk,
                ":sender": sk,
            },
            ScanIndexForward: true,
        };
        const received = await client.query(params1).promise();
        const sent = await client.query(params2).promise();
        var receivedMessages = received.Items;
        var sentMessages = sent.Items;
        if (!receivedMessages) {
            receivedMessages = [];
        }
        if (!sentMessages) {
            sentMessages = [];
        }
        // merge
        //[receiver1: [{sender, receiver, datetime, message}, ...], receiver2: []]
        const res = {};
        let pt1 = 0;
        let pt2 = 0;
        while (pt1 < receivedMessages.length && pt2 < sentMessages.length) {
            let receivedMsg = receivedMessages[pt1];
            let sentMsg = sentMessages[pt2];
            let receivedSender = receivedMsg.sender;
            let sentReceiver = sentMsg.receiver;
            if (receivedSender == sentReceiver) {
                // if key doesn't exist, make one with value as empty array
                if (res[receivedSender] === undefined) {
                    res[receivedSender] = [];
                }
                if (receivedMsg.datetime > sentMsg.datetime) {
                    res[receivedSender].push(sentMsg);
                    ++pt2;
                } else {
                    res[receivedSender].push(receivedMsg);
                    ++pt1;
                }
            } else {
                // deal with received message
                if (res[receivedSender] === undefined) {
                    res[receivedSender] = [receivedMsg];
                } else {
                    res[receivedSender].push(receivedMsg);
                }
                // deal with sent message
                if (res[sentReceiver] === undefined) {
                    res[sentReceiver] = [sentMsg];
                } else {
                    res[sentReceiver].push(sentMsg);
                }
                ++pt1;
                ++pt2;
            }
        }
        while (pt1 < receivedMessages.length) {
            let receivedMsg = receivedMessages[pt1];
            let receivedSender = receivedMsg.sender;
            if (res[receivedSender] === undefined) {
                res[receivedSender] = [receivedMsg];
            } else {
                res[receivedSender].push(receivedMsg);
            }
            ++pt1;
        }
        while (pt2 < sentMessages.length) {
            let sentMsg = sentMessages[pt2];
            let sentReceiver = sentMsg.receiver;
            if (res[sentReceiver] === undefined) {
                res[sentReceiver] = [sentMsg];
            } else {
                res[sentReceiver].push(sentMsg);
            }
            ++pt2;
        }
        return res;
    }
}
module.exports = Database;
