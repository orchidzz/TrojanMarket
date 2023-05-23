import React from "react";
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

export default function SettingsPage(props) {
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
                            src={props.userImg}
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
                                        defaultValue={props.name}
                                        sx={{
                                            color: "black",
                                            pl: "10px",
                                            width: 150,
                                        }}
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
                            <CustomButton text="Update" />
                        </FormGroup>
                    </FormGroup>
                </Grid>
            </Grid>
        </Box>
    );
}
