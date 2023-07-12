import { React, useState, useEffect } from "react";
import { Paper, Grid, Divider } from "@mui/material";
import UserList from "../chat/userList";
import MessageArea from "../chat/messages";
import { getProfileAction } from "../../actions/userActions";
import { connect, useDispatch } from "react-redux";
import NavBar from "../navbar/navbar";

function ChatPage({ chats }) {
    const [user, setUser] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProfileAction());
    }, []);
    if (!chats) {
        return <NavBar />;
    }

    return (
        <>
            <NavBar />

            <Grid
                container
                component={Paper}
                sx={{
                    height: "90%",
                    marginTop: "8px",
                    "@media (max-width: 500px)": {
                        margin: 0,
                        height: "100%",
                        paddingBottom: "20%",
                    },
                }}
            >
                <Grid item xs={12} sm={3}>
                    <Divider />

                    <Divider />
                    <UserList users={Object.keys(chats)} func={setUser} />
                </Grid>

                <MessageArea messages={chats[user]} receiver={user} />
            </Grid>
        </>
    );
}
const mapStateToProps = (state) => {
    return {
        chats: state.userReducer.chats,
    };
};
export default connect(mapStateToProps)(ChatPage);
