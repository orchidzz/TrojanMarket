import { React, useEffect } from "react";
import { MovingComponent } from "react-moving-text";
import CustomButton from "./login/customButton";
import { googleLogin } from "./../../constants/auth";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAction, signoutAction } from "../../actions/userActions";

function Homepage() {
    const words = ["Buy", "Sell", "Fight"];
    const auth = getAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                if (user.email.includes("@usc.edu")) {
                    dispatch(
                        loginAction(
                            await auth.currentUser.getIdToken(),
                            user.email
                        )
                    );
                    navigate("/home");
                } else {
                    dispatch(signoutAction());
                    await auth.currentUser.delete();
                    await auth.signOut();
                }
            }
        });
    }, []);

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
                onClick={async () => {
                    await googleLogin();
                }}
            />
        </div>
    );
}

export default Homepage;
