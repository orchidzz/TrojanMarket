const Database = require("../middleware/database");
const AWS = require("aws-sdk");
const db = new Database();
require("dotenv").config();

afterAll(async () => {
    AWS.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        sessionToken: process.env.AWS_SESSION_TOKEN,
        region: process.env.AWS_REGION,
    });

    // Create a DynamoDB DocumentClient instance
    const client = new AWS.DynamoDB.DocumentClient();
    // delete user
    const userParams = {
        TableName: process.env.CYCLIC_DB,
        Key: {
            pk: "user",
            sk: "trojan1@usc.edu",
        },
    };
    await client.delete(userParams).promise();
    // delete item
    const itemParams = {
        TableName: process.env.CYCLIC_DB,
        Key: {
            pk: "item",
            sk: "trojan1@usc.edu-1",
        },
    };
    await client.delete(itemParams).promise();

    // delete chats
    const chat1Params = {
        TableName: process.env.CYCLIC_DB,
        Key: {
            pk: "chat",
            sk: "trojan1@usc.edu-trojan2@usc.edu-12346",
        },
    };
    const chat2Params = {
        TableName: process.env.CYCLIC_DB,
        Key: {
            pk: "chat",
            sk: "trojan2@usc.edu-trojan1@usc.edu-123465",
        },
    };
    await client.delete(chat1Params).promise();
    await client.delete(chat2Params).promise();
}, 50000);

test("add item", async () => {
    await db.addItem("trojan1@usc.edu", "1", "trojan", "trojan's item", 0);
    var items = await db.getItemsByUser("trojan1@usc.edu");
    var item = items[0]; // there is only one item added
    expect(item.pk).toBe("item");
    expect(item.sk).toBe("trojan1@usc.edu-1");
    expect(item.price).toEqual(0);
    expect(item.description).toBe("trojan's item");
    expect(item.title).toBe("trojan");
    expect(item.active).toBeTruthy();
    expect(item.buyers.length).toEqual(0);
    expect(item.imgs).toBeFalsy();
}, 50000);

test("add user", async () => {
    await db.addUser("trojan1@usc.edu");
    var user = await db.getUserInfo("trojan1@usc.edu");
    expect(user.pk).toBe("user");
    expect(user.sk).toBe("trojan1@usc.edu");
    expect(user.img).toBeFalsy();
}, 50000);

test("add chats", async () => {
    await db.addChat("trojan1@usc.edu", "trojan2@usc.edu", 12345, "Hi 2");
    await db.addChat("trojan2@usc.edu", "trojan1@usc.edu", 12346, "Hi 1");
    const chats1 = await db.getChatsByUser("trojan1@usc.edu");
    expect(Object.keys(chats1).length).toEqual(1);
    expect(chats1["trojan2@usc.edu"].length).toEqual(2);
    expect(chats1["trojan2@usc.edu"][0].message).toBe("Hi 2");
    const chats2 = await db.getChatsByUser("trojan2@usc.edu");
    console.log(chats2);
    expect(chats2["trojan1@usc.edu"].length).toEqual(2);
    expect(chats2["trojan1@usc.edu"][0].message).toBe("Hi 2");
}, 50000);
