const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config(); // Load environment variables from .env file

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT; // Loaded from .env file

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(cors()); // Enable CORS
    }

    // Bind controllers to routes
    routes() {
        // this.app.use(this.paths.login, require("../routes/login"));

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
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Server running on port: ", this.port);
        });
    }
}

module.exports = Server;
