import { React, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    Box,
    FormControlLabel,
    FormLabel,
    FormGroup,
    Grid,
    Avatar,
} from "@mui/material";
import RatingDialog from "../user/ratingDialog";
import Rating from "../user/rating";
import CustomButton from "../homepage/login/customButton";
import { connect, useDispatch } from "react-redux";
import { getSellerAction } from "../../actions/userActions";
import ChatDialog from "../chat/chatDialog";

function SellerPage({ props }) {
    let { sellerEmail } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getSellerAction(sellerEmail));
    }, []);
    if (!props) {
        return <ChatDialog receiver={sellerEmail} />;
    }
    function handleContactBtn() {}
    function handleRateBtn() {
        return <RatingDialog seller={sellerEmail} />;
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
                        <label>
                            <Avatar
                                sx={{
                                    width: 105,
                                    height: 105,
                                    backgroundColor: "rgb(153, 27, 27)",
                                }}
                                src={
                                    props.userImg !== null
                                        ? URL.createObjectURL(props.userImg)
                                        : props.userImg
                                }
                            />
                        </label>

                        <FormGroup
                            sx={{ display: "flex", flexDirection: "row" }}
                        >
                            <FormControlLabel
                                control={
                                    <FormLabel
                                        required
                                        variant="standard"
                                        defaultValue={props.userName}
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
                        </FormGroup>
                    </FormGroup>
                    <CustomButton text="Rate" onClick={handleRateBtn} />
                    <CustomButton text="Contact" onClick={handleContactBtn} />
                </Grid>
            </Grid>
        </Box>
    );
}

const mapStateToProps = (state) => {
    return {
        props: {
            userName: state.sellerReducer.sellerName,
            userEmail: state.sellerReducer.sellerEmail,
            userImg: state.sellerReducer.sellerImg,
            trustworthiness: state.sellerReducer.sellerTrustworthiness,
            timeliness: state.sellerReducer.sellerTimeliness,
            responsiveness: state.sellerReducer.sellerResponsiveness,
        },
    };
};

export default connect(mapStateToProps)(SellerPage);
