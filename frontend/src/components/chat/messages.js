import { React, useState } from "react";
import {
    Grid,
    TextField,
    List,
    ListItemText,
    Fab,
    Divider,
    ListItem,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { messageAction } from "../../actions/userActions";
import { useDispatch } from "react-redux";

export default function MessageArea(props) {
    // props.messages = list of message objects
    //[{receiver:, sender:, text:, datetime:}]
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    function SendNewMessage() {
        const receiver = props.receiver;
        // const sender = useSelector((store) => store.userReducer.userEmail);
        const sender = "";
        // if message is empty, do not send
        if (message.length === 0) {
            return;
        }
        dispatch(messageAction(sender, receiver, message));
    }

    return (
        <Grid item xs={0} sm={9} sx={{ alignContent: "end", display: "grid" }}>
            <List>
                {props.messages.map((message) => {
                    if (message.sender !== props.receiver) {
                        return (
                            <ListItem key={message.datetime}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <ListItemText
                                            align="right"
                                            primary={message.message}
                                        ></ListItemText>
                                    </Grid>
                                </Grid>
                            </ListItem>
                        );
                    } else {
                        return (
                            <ListItem key={message.datetime}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <ListItemText
                                            align="left"
                                            primary={message.message}
                                        ></ListItemText>
                                    </Grid>
                                </Grid>
                            </ListItem>
                        );
                    }
                })}
            </List>
            <Divider />
            <Grid container style={{ padding: "20px" }}>
                <Grid item xs={11}>
                    <TextField
                        id="outlined-basic-email"
                        fullWidth
                        onChange={(event) => setMessage(event.target.value)}
                    />
                </Grid>
                <Grid xs={1} align="right">
                    <Fab
                        color="primary"
                        aria-label="add"
                        onClick={SendNewMessage}
                    >
                        <SendIcon />
                    </Fab>
                </Grid>
            </Grid>
        </Grid>
    );
}
