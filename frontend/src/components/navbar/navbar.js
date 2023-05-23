import { React, useState } from "react";
import Box from "@mui/material/Box";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Home, AccountCircle, Sell, Search } from "@mui/icons-material/";
import SearchBar from "../items/searchBar";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

export default function NavBar() {
    const [searchOpen, setSearchOpen] = useState(false);
    return (
        <Box
            className="nav-bar"
            sx={{
                position: "fixed",
                bottom: "0",
                left: "10%",
                alignItems: "center",
                right: "10%",
                "@media (max-width: 500px)": {
                    left: "0",
                    right: "0",
                },
            }}
        >
            {searchOpen && <SearchBar />}
            <BottomNavigation
                showLabels
                sx={{
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                    width: "inherit",
                    margin: "auto",
                }}
            >
                <BottomNavigationAction
                    label="Home"
                    sx={{ color: "black" }}
                    icon={<Home sx={{ color: "black" }} />}
                />
                <BottomNavigationAction
                    label="Search"
                    sx={{ color: "black" }}
                    icon={<Search sx={{ color: "black" }} />}
                    onClick={() => setSearchOpen(!searchOpen)}
                />
                <Fab color="primary" aria-label="add">
                    <AddIcon />
                </Fab>
                <BottomNavigationAction
                    label="Listed Items"
                    sx={{ color: "black" }}
                    icon={<Sell sx={{ color: "black" }} />}
                />
                <BottomNavigationAction
                    label="Profile"
                    sx={{ color: "black" }}
                    icon={<AccountCircle sx={{ color: "black" }} />}
                />
            </BottomNavigation>
        </Box>
    );
}
