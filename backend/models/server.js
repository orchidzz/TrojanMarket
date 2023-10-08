const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const user = require("../controllers/user");
const items = require("../controllers/items");
const verify = require("../middleware/verify");
const { cert } = require("firebase-admin/app");
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT; // Loaded from .env file

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(cors()); // Enable CORS
        this.app.use(express.json({ limit: "50mb" }));
        // const serviceAccount = require("./../trojanmarket-firebase.json");
        // use this concatenation for cyclic deployment --> env var max char = 255
        const FIREBASE_PRIVATE_KEY =
            process.env.FIREBASE_PRIVATE_KEY1 +
            process.env.FIREBASE_PRIVATE_KEY2 +
            process.env.FIREBASE_PRIVATE_KEY3 +
            process.env.FIREBASE_PRIVATE_KEY4 +
            process.env.FIREBASE_PRIVATE_KEY5 +
            process.env.FIREBASE_PRIVATE_KEY6 +
            process.env.FIREBASE_PRIVATE_KEY7;
        // const FIREBASE_PRIVATE_KEY = process.env.FIREBASE_PRIVATE_KEY;
        console.log(FIREBASE_PRIVATE_KEY);
        admin.initializeApp({
            credential: admin.credential.cert({
                type: "service_account",
                project_id: process.env.FIREBASE_PROJECT_ID,
                private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
                private_key: FIREBASE_PRIVATE_KEY,
                client_email: process.env.FIREBASE_CLIENT_EMAIL,
                client_id: process.env.FIREBASE_CLIENT_ID,
                auth_uri: "https://accounts.google.com/o/oauth2/auth",
                token_uri: "https://oauth2.googleapis.com/token",
                auth_provider_x509_cert_url:
                    "https://www.googleapis.com/oauth2/v1/certs",
                client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
                universe_domain: "googleapis.com",
            }),
        });
    }

    // Bind controllers to routes
    routes() {
        // connect to react client
        this.app.use(
            express.static(path.join(__dirname, "../../frontend", "build"))
        );
        this.app.get(
            ["/", "/home", "/profile", "/add", "/sold", "/chat"],
            (req, res) => {
                res.sendFile(
                    path.join(
                        __dirname,
                        "../../frontend",
                        "build",
                        "index.html"
                    )
                );
            }
        );
        // middleware for verifying authorization
        this.app.use(verify);
        // post routes
        this.app.post("/api/updateUser", user.updateProfile);
        this.app.post("/api/buy", items.buyItem);
        this.app.post("/api/sell", items.sellItem);
        this.app.post("/api/updateItem", items.updateItem);
        this.app.post("/api/rate", user.rateSeller);
        this.app.post("/api/message", user.addChat);

        // get routes
        this.app.get("/api/profile", user.getProfile);
        this.app.get("/api/items", items.getActiveItems);
        this.app.get("api/seller", user.getSeller);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Server running on port: ", this.port);
        });
    }
}

module.exports = Server;
