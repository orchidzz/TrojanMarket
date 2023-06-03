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
    const sks = ["trojan2@usc.edu-1", "trojan3@usc.edu"];
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
}, 50000);

beforeAll(async () => {
    /* set up by adding data to be queried */
    // add 2 items
    await db.addItem("trojan2@usc.edu", "1", "trojan2", "trojan's item", 0);
    await db.addItem("trojan3@usc.edu", "1", "trojan3", "trojan's item", 0);
}, 50000);

test("get active items", async () => {
    var items = await db.getActiveItems();
    expect(items.length).not.toEqual(0);
});
