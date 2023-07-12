const Database = require("../middleware/database");
const db = new Database();
require("dotenv").config();

async function getProfile(req, res) {
    var user = await db.getUserInfo(req.query.userEmail);
    if (!user) {
        await db.addUser(req.query.userEmail);
        user = await db.getUserInfo(req.query.userEmail);
        user.listedItems = [];
    } else {
        // get listed items
        var listedItems = await db.getItemsByUser(req.query.userEmail);
        user.listedItems = listedItems;
        // get ave rating number
        var ratings = await db.getRatingsBySeller(req.query.userEmail);
        var totalResponsiveness = 0;
        var totalTrustworthiness = 0;
        var totalTimeliness = 0;
        var num = 0;
        ratings.forEach((rating) => {
            totalResponsiveness += rating.responsiveness;
            totalTrustworthiness += rating.trustworthiness;
            totalTimeliness += rating.timeliness;

            ++num;
        });
        if (num !== 0) {
            totalResponsiveness = totalResponsiveness / num;
            totalTrustworthiness = totalTrustworthiness / num;
            totalTimeliness = totalTimeliness / num;
        }
        user.responsiveness = totalResponsiveness;
        user.trustworthiness = totalTrustworthiness;
        user.timeliness = totalTimeliness;
        // get chats
        const chats = await db.getChatsByUser(req.query.userEmail);
        user.chat = chats;
    }
    res.json(user);
}
async function updateProfile(req, res) {
    const data = req.body;
    await db.updateUserInfo(req.query.userEmail, data.userImg, data.userName);
}

async function rateSeller(req, res) {
    const data = req.body;
    await db.addRating(
        req.query.userEmail,
        data.sellerEmail,
        Date.now(),
        responsiveness,
        trustworthiness,
        timeliness
    );
}
async function addChat(req, res) {
    const data = req.body;
    await db.addChat(
        req.query.userEmail,
        data.receiverEmail,
        Date.now(),
        data.message
    );
}

async function getSeller(req, res) {
    var user = await db.getUserInfo(req.query.sellerEmail);
    if (!user) {
        res.json(null);
    } else {
        // get ave rating number
        var ratings = await db.getRatingsBySeller(req.query.sellerEmail);
        var totalResponsiveness = 0;
        var totalTrustworthiness = 0;
        var totalTimeliness = 0;
        var num = 0;
        ratings.forEach((rating) => {
            totalResponsiveness += rating.responsiveness;
            totalTrustworthiness += rating.trustworthiness;
            totalTimeliness += rating.timeliness;

            ++num;
        });
        if (num !== 0) {
            totalResponsiveness = totalResponsiveness / num;
            totalTrustworthiness = totalTrustworthiness / num;
            totalTimeliness = totalTimeliness / num;
        }
        user.responsiveness = totalResponsiveness;
        user.trustworthiness = totalTrustworthiness;
        user.timeliness = totalTimeliness;
    }
    res.json(user);
}

module.exports = { getProfile, updateProfile, rateSeller, addChat, getSeller };
