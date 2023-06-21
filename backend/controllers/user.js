const Database = require("../middleware/database");
const db = new Database();
require("dotenv").config();

async function getProfile(req, res) {
    var user = await db.getUserInfo(req.userEmail);
    if (!user) {
        db.addUser(req.userEmail);
        user = await db.getUserInfo(req.userEmail);
        user.listedItems = null;
    } else {
        var listedItems = await db.getItemsByUser(req.userEmail);
        user.listedItems = listedItems;
    }
    res.json(user);
}
async function updateProfile(req, res) {
    const data = req.body;
    await db.updateUserInfo(data.userEmail, data.userImg, data.userName);
}

module.exports = { getProfile, updateProfile };
