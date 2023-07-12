const Database = require("../middleware/database");
const db = new Database();
require("dotenv").config();

async function buyItem(req, res) {
    await db.buyItem(req.query.userEmail, req.query.itemId);
}
async function sellItem(req, res) {
    const data = req.body;
    await db.addItem(
        data.userEmail,
        data.itemListedTime,
        data.itemTitle,
        data.itemDescription,
        data.itemPrice,
        data.itemImgs
    );
}
async function updateItem(req, res) {
    const data = req.body;
    await db.updateItem(
        data.itemId,
        data.itemTitle,
        data.itemDescription,
        data.itemPrice,
        data.itemActive
    );
}
async function getActiveItems(req, res) {
    var items = await db.getActiveItems();
    res.json(items);
}

module.exports = { buyItem, sellItem, updateItem, getActiveItems };
