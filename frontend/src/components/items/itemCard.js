import React from "react";
import { Card, CardContent, CardMedia, Box, Typography } from "@mui/material";
import CustomButton from "../homepage/login/customButton";
import { ThemeProvider } from "@mui/material";
import uscTheme from "../homepage/styles";

export default function ItemCard(props) {
    /* 
    props: {title: "",
            price: "",
            images: [],
            description: "",
            sellerRating: "",
            seller: ""
        }
    */
    return (
        <ThemeProvider theme={uscTheme}>
            <Card
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
                        <Typography variant="subtitle1" component="div">
                            {props.seller} {props.sellerRating}
                        </Typography>

                        <Typography variant="body2" component="div">
                            {props.description} Lizards are a widespread group
                            of squamate reptiles, with over 6,000 species,
                            ranging across all continents except Antarctica
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
                        <CustomButton text="Message Seller" />
                    </Box>
                </Box>
                <CardMedia
                    component="img"
                    sx={{ width: "100%" }}
                    image="/static/images/cards/live-from-space.jpg"
                    alt="Live from space album cover"
                />
            </Card>
        </ThemeProvider>
    );
}
