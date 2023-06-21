const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
import { getProfile, updateProfile } from "../controllers/user";
import {
    buyItem,
    sellItem,
    updateItem,
    getActiveItems,
} from "../controllers/items";
import verify from "../middleware/verify";
import authorize from "../middleware/auth";
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT; // Loaded from .env file

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(cors()); // Enable CORS
        this.app.use(express.json());
    }

    // Bind controllers to routes
    routes() {
        // connect to react client
        this.app.use(
            express.static(path.join(__dirname, "../../frontend", "build"))
        );
        this.app.get(
            ["/", "/home", "/profile", "/add", "/sold", "/search"],
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
        // post routes
        this.app.post("/api/updateUser", verify, updateProfile(req, res));
        this.app.post("/api/buy", verify, buyItem(req, res));
        this.app.post("/api/sell", verify, sellItem(req, res));
        this.app.post("/api/updateItem", verify, updateItem(req, res));

        // get routes
        this.app.get("/api/profile", verify, getProfile(req, res));
        this.app.get("/api/items", verify, getActiveItems(req, res));
        this.app.get("/api/auth", async (req, res) => {
            const token = await authorize(req.token);
            res.json(token);
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Server running on port: ", this.port);
        });
    }
}

module.exports = Server;
