import React from "react";
import { Grid, Box } from "@mui/material";
import ItemCard from "./itemCard";

export default function ItemGrid(props) {
    /* 
    props: {data: list of items info} = {data: [{title: 1, etc}, {title; 2, etc}]}
    */
    // dynamically create items within the grid
    if (props.items == null) {
        return;
    }
    return (
        <Box sx={{ width: "100%" }}>
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
                {props.items.map((item) => {
                    return (
                        <Grid item xs={12} sm={6}>
                            {item}
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
}
