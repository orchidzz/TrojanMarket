const Database = require("../middleware/database");
const AWS = require("aws-sdk");
const db = new Database();
require("dotenv").config();

afterAll(async () => {
    // delete all added data
    AWS.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        sessionToken: process.env.AWS_SESSION_TOKEN,
        region: process.env.AWS_REGION,
    });

    const client = new AWS.DynamoDB.DocumentClient();
    // delete items
    const sks = ["trojan4@usc.edu-1", "trojan5@usc.edu-1"];
    const deleteRequests = sks.map((skValue) => ({
        DeleteRequest: {
            Key: {
                pk: "item",
                sk: skValue,
            },
        },
    }));
    const itemParams = {
        RequestItems: {
            [process.env.CYCLIC_DB]: deleteRequests,
        },
    };
    await client.batchWrite(itemParams).promise();

    // delete user
    const userParams = {
        TableName: process.env.CYCLIC_DB,
        Key: {
            pk: "user",
            sk: "trojan4@usc.edu",
        },
    };
    await client.delete(userParams).promise();
}, 50000);

beforeAll(async () => {
    /* set up by adding data to be queried */
    // add 2 users
    await db.addUser("trojan4@usc.edu");

    // add 2 items
    await db.addItem("trojan4@usc.edu", "1", "trojan4", "trojan's item", 0);
    await db.addItem("trojan5@usc.edu", "1", "trojan5", "trojan's item", 0);
}, 50000);

test("update user's info", async () => {
    await db.updateUserInfo("trojan4@usc.edu", null, "Tommy");
    var user = await db.getUserInfo("trojan4@usc.edu");
    expect(user.username).toBe("Tommy");
}, 50000);

test("update item", async () => {
    await db.updateItem(
        "trojan4@usc.edu-1",
        "trojan4",
        "trojan's item",
        5,
        true
    );
    var items = await db.getItemsByUser("trojan4@usc.edu");
    var item = items[0];
    expect(item.price).toEqual(5);
}, 50000);

test("buy item", async () => {
    await db.buyItem("trojan4@usc.edu", "trojan5@usc.edu-1");
    var items = await db.getItemsByUser("trojan5@usc.edu");
    var item = items[0];
    expect(item.buyers.length).toEqual(1);
    expect(item.buyers[0]).toBe("trojan4@usc.edu");
}, 50000);
