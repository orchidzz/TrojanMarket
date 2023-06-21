import { React, useEffect, useState } from "react";
import {
    Box,
    FormControlLabel,
    TextField,
    FormGroup,
    Grid,
    Avatar,
} from "@mui/material";
import Rating from "./rating";
import CustomButton from "../homepage/login/customButton";
import { useSignOut } from "../../constants/auth";
import { connect, useDispatch } from "react-redux";
import {
    getProfileAction,
    updateProfileAction,
} from "../../actions/userActions";

function SettingsPage({ props }) {
    const [userName, setUserName] = useState(props.userName);
    const [userImg, setUserImg] = useState(""); // need work on uploading img to avatar
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProfileAction(props.userEmail));
    });
    if (!props) {
        return;
    }
    function handleUpdateBtn() {
        var user = {
            userName: userName,
            userImg: userImg,
            userEmail: props.userEmail,
        };
        dispatch(updateProfileAction(user));
    }
    return (
        <Box
            sx={{
                width: "inherit",
                display: "flex",
                flex: "column",
            }}
        >
            <Grid
                container
                className="big-grid"
                rowSpacing={4}
                columnSpacing={5}
                sx={{
                    maxHeight: "97vh",
                    overflowY: "auto",
                }}
            >
                <Grid item xs={12} sm={6}>
                    <Rating
                        isDisabled={true}
                        responsiveness={props.responsiveness}
                        trustworthiness={props.trustworthiness}
                        timeliness={props.timeliness}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup
                        sx={{
                            width: "inherit",
                            alignItems: "center",
                            backgroundColor: "white",
                            pt: "15px",
                            pb: "15px",
                        }}
                    >
                        <Avatar
                            sx={{
                                width: 105,
                                height: 105,
                                backgroundColor: "rgb(153, 27, 27)",
                            }}
                            //need fixing
                        >
                            HN
                        </Avatar>
                        <FormGroup
                            sx={{ display: "flex", flexDirection: "row" }}
                        >
                            <FormControlLabel
                                control={
                                    <TextField
                                        required
                                        variant="standard"
                                        defaultValue={props.userName}
                                        sx={{
                                            color: "black",
                                            pl: "10px",
                                            width: 150,
                                        }}
                                        onChange={(event) =>
                                            setUserName(event.target.value)
                                        }
                                    />
                                }
                                sx={{
                                    color: "black",
                                    pb: "15px",
                                    pt: "15px",
                                    mr: "5px",
                                }}
                                label="Name"
                                labelPlacement="start"
                            />
                            <CustomButton
                                text="Update"
                                onClick={handleUpdateBtn}
                            />
                        </FormGroup>
                    </FormGroup>
                    <CustomButton text="Sign out" onClick={useSignOut} />
                </Grid>
            </Grid>
        </Box>
    );
}

const mapStateToProps = (state) => {
    return {
        props: {
            userName: state.userReducer.userName,
            userEmail: state.userReducer.userEmail,
            userImg: state.userReducer.userImg,
        },
    };
};

export default connect(mapStateToProps)(SettingsPage);
