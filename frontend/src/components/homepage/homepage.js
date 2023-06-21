import { React, useEffect } from "react";
import { MovingComponent } from "react-moving-text";
import CustomButton from "./login/customButton";
import { useGoogleLogin } from "./../../constants/auth";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Homepage() {
    const words = ["Buy", "Sell", "Fight"];
    const auth = getAuth();
    const navigate = useNavigate();
    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                if (user.email.includes("@usc.edu")) {
                    navigate("/home");
                } else {
                    await auth.currentUser.delete();
                    await auth.signOut();
                }
            }
        });
    });

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
            <CustomButton
                className="login-btn"
                text="Try it out!"
                onClick={useGoogleLogin}
            />
        </div>
    );
}

export default Homepage;
