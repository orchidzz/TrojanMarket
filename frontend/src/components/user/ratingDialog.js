import Rating from "./rating";
import { React, useState } from "react";
import {
    Dialog,
    Backdrop,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    DialogContentText,
} from "@mui/material";

export default function RatingDialog(props) {
    const [open, setOpen] = useState(true);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    Rate your transaction with seller {props.seller}!
                </DialogTitle>
                <DialogContent sx={{ justifyContent: "center" }}>
                    <DialogContentText>
                        To best help your seller and other buyers, don't skip
                        rating your transaction!
                    </DialogContentText>
                    <Rating isDisabled={false} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose}>Submit</Button>
                </DialogActions>
            </Dialog>
        </Backdrop>
    );
}
