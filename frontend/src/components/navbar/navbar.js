import { React, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Home, AccountCircle, Sell, Search } from "@mui/icons-material/";
import SearchBar from "../items/searchBar";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
    const [searchOpen, setSearchOpen] = useState(false);
    const auth = getAuth();
    const navigate = useNavigate();
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (!user) navigate("/");
        });
    });

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
                    component={Link}
                    to="/home"
                    onClick={() => setSearchOpen(false)}
                />
                <BottomNavigationAction
                    label="Search"
                    sx={{ color: "black" }}
                    icon={<Search sx={{ color: "black" }} />}
                    onClick={() => setSearchOpen(!searchOpen)}
                    component={Link}
                    to="/search"
                />
                <Fab
                    color="primary"
                    aria-label="add"
                    component={Link}
                    to="/add"
                    onClick={() => setSearchOpen(false)}
                >
                    <AddIcon />
                </Fab>
                <BottomNavigationAction
                    label="Listed Items"
                    sx={{ color: "black" }}
                    icon={<Sell sx={{ color: "black" }} />}
                    component={Link}
                    to="/sold"
                    onClick={() => setSearchOpen(false)}
                />
                <BottomNavigationAction
                    label="Profile"
                    sx={{ color: "black" }}
                    icon={<AccountCircle sx={{ color: "black" }} />}
                    component={Link}
                    to="/profile"
                    onClick={() => setSearchOpen(false)}
                />
            </BottomNavigation>
        </Box>
    );
}
