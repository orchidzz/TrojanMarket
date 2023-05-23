import React from "react";
import Paper from "@mui/material/Paper";
import { TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar() {
    return (
        <Paper
            component="form"
            sx={{
                p: "5px 10px 5px 10px",
                marginBottom: "1px",
                display: "sticky",
                alignItems: "center",
                width: "-webkit-fill-available",
            }}
        >
            <TextField
                id="standard-basic"
                label="Search for item"
                variant="standard"
                InputProps={{
                    endAdornment: (
                        <IconButton
                            type="button"
                            sx={{ p: "5px" }}
                            aria-label="search"
                        >
                            <SearchIcon sx={{ color: "black" }} />
                        </IconButton>
                    ),
                }}
                sx={{
                    width: "inherit",
                }}
            />
        </Paper>
    );
}
