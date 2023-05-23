import { React, useState } from "react";
import CustomButton from "../homepage/login/customButton";
import {
    Box,
    List,
    ListItemButton,
    ListItemText,
    Typography,
    Card,
    CardMedia,
    CardContent,
    IconButton,
    Checkbox,
    FormGroup,
    FormControlLabel,
} from "@mui/material";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import SendIcon from "@mui/icons-material/Send";
import { red } from "@mui/material/colors";
import { ThemeProvider } from "@mui/material";
import uscTheme from "../homepage/styles";

export function ListedItemCard(props) {
    const [open, setOpen] = useState(false);

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
                    alignItems: "stretch",
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
                        <Typography variant="body2">
                            {props.price} hh
                        </Typography>
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
                        <CustomButton text="Edit Info" />
                        <FormGroup sx={{ pt: "3px" }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        sx={{
                                            color: red[800],
                                            "& .MuiSvgIcon-root": {
                                                fontSize: 35,
                                            },
                                            "&.Mui-checked": {
                                                color: red[600],
                                            },
                                        }}
                                    />
                                }
                                label="Sold"
                            />
                        </FormGroup>
                    </Box>
                </Box>
                <CardMedia
                    component="img"
                    sx={{ width: "100%" }}
                    image="/static/images/cards/live-from-space.jpg"
                    alt="Live from space album cover"
                />
                <Box
                    sx={{
                        bgcolor: red[100],
                        pb: open ? 1 : 0,
                        width: "auto",
                        alignItems: "stretch",
                    }}
                >
                    <List>
                        <ListItemButton
                            alignItems="flex-start"
                            onClick={() => setOpen(!open)}
                            sx={{
                                px: 3,
                                "&:hover, &:focus": {
                                    "& svg": { opacity: open ? 1 : 0 },
                                },
                                width: "auto",
                            }}
                        >
                            <ListItemText primary="Interested Buyers" />
                            <KeyboardArrowDown
                                sx={{
                                    mr: -1,
                                    pt: "2px",
                                    transform: open
                                        ? "rotate(-180deg)"
                                        : "rotate(0)",
                                    transition: "0.2s",
                                }}
                            />
                        </ListItemButton>
                        {open && (
                            <ListItemButton sx={{ width: "100%", pb: 0 }}>
                                <ListItemText
                                    primary="hangtngu@usc.edu"
                                    sx={{ p: 0, minHeight: 32 }}
                                />
                                <IconButton
                                    type="button"
                                    sx={{
                                        p: "5px",
                                        b: "5px",
                                        mb: "5px",
                                        color: "black",
                                    }}
                                >
                                    <SendIcon />
                                </IconButton>
                            </ListItemButton>
                        )}
                    </List>
                </Box>
            </Card>
        </ThemeProvider>
    );
}

// props.buyers.map((buyer) => (
//     <ListItemButton
//         key={buyer.email}
//         sx={{
//             py: 0,
//             minHeight: 32,
//             color: "rgba(255,255,255,.8)",
//         }}
//     >
//         <ListItemText
//             primary={buyer.email}
//             primaryTypographyProps={{
//                 fontSize: 14,
//                 fontWeight: "medium",
//             }}
//         />
//     </ListItemButton>
// ))
