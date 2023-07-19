import { React, useState } from "react";
import { Card, CardContent, CardMedia, Box, Typography } from "@mui/material";
import CustomButton from "../homepage/login/customButton";
import { ThemeProvider } from "@mui/material";
import uscTheme from "../homepage/styles";
import { useNavigate } from "react-router-dom";

export default function ItemCard(props) {
    /* 
    props: {title: "",
            price: "",
            imgs: [],
            description: "",
            sellerRating: "",
            seller: ""
        }
    */
    const [imgs, setImgs] = useState(
        props.imgs !== undefined ? props.imgs : []
    );
    const [slideIdx, setSlideIdx] = useState(0);
    const navigate = useNavigate();
    function handleShowUser() {
        //navigate to new page of user
        navigate(`/user/${props.seller}`);
    }
    return (
        <ThemeProvider theme={uscTheme}>
            <Card
                id={props.itemId}
                className="item"
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    margin: "0",
                    padding: "0",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "right",
                        flexDirection: "column",
                    }}
                >
                    <CardContent sx={{ flex: "1 0 auto", textAlign: "left" }}>
                        <Typography component="div" variant="h5">
                            {props.title}
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            component="div"
                            onClick={handleShowUser}
                        >
                            {props.seller} {props.sellerRating}
                        </Typography>

                        <Typography variant="body2" component="div">
                            {props.description}
                        </Typography>
                    </CardContent>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "right",
                            justifyContent: "right",
                            pl: 1,
                            pb: 1,
                            pr: 1,
                        }}
                    >
                        <Typography variant="body2">{props.price}</Typography>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "right",
                            justifyContent: "right",
                            pl: 1,
                            pb: 1,
                            pr: 1,
                        }}
                    >
                        <CustomButton text="Buy" />
                    </Box>
                </Box>
                {imgs.length > 0 && (
                    <>
                        <img
                            key={slideIdx}
                            src={props.imgs[slideIdx]}
                            alt={slideIdx}
                            style={{
                                width: "auto",
                                height: "13rem",
                                margin: "10px",
                            }}
                        />
                        <div>
                            <button
                                onClick={() =>
                                    setSlideIdx(
                                        slideIdx !== 0 ? slideIdx - 1 : 0
                                    )
                                }
                                disabled={slideIdx === 0}
                            >
                                Previous
                            </button>
                            <button
                                onClick={() =>
                                    setSlideIdx(
                                        slideIdx !== props.imgs.length - 1
                                            ? slideIdx + 1
                                            : props.imgs.length - 1
                                    )
                                }
                                disabled={slideIdx === props.imgs.length - 1}
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
            </Card>
        </ThemeProvider>
    );
}
