import React from "react";
import { MovingComponent } from "react-moving-text";
import CustomButton from "./login/customButton";

function Homepage() {
    const words = ["Buy", "Sell", "Fight"];

    return (
        <div
            className="homepage"
            sx={{ display: "flex", flexDirection: "column" }}
        >
            <h1 style={{ fontSize: "60px" }}>
                <MovingComponent type="typewriter" dataText={words} />
                On
            </h1>
            <h2 style={{ marginTop: "0", fontFamily: "DM Sans" }}>
                A place to buy and sell stuff with fellow Trojans
            </h2>
            <CustomButton className="login-btn" text="Try it out!" />
        </div>
    );
}

export default Homepage;
