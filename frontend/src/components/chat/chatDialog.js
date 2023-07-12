import { React, useState } from "react";
import {
    Dialog,
    Backdrop,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    DialogContentText,
    TextField,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { messageAction } from "../../actions/userActions";

export default function ChatDialog(props) {
    const [open, setOpen] = useState(true);
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();

    const handleClose = () => {
        setOpen(false);
        if (message.length !== 0) {
            //send message
            dispatch(messageAction(props.user, message));
        }
    };
    return (
        <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Chat with {props.user}!</DialogTitle>
                <DialogContent sx={{ justifyContent: "center" }}>
                    <TextField
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose}>Send</Button>
                </DialogActions>
            </Dialog>
        </Backdrop>
    );
}
