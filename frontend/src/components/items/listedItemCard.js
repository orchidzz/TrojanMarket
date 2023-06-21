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
    TextField,
} from "@mui/material";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import SendIcon from "@mui/icons-material/Send";
import { red } from "@mui/material/colors";
import { ThemeProvider } from "@mui/material";
import uscTheme from "../homepage/styles";
import { useDispatch } from "react-redux";
import { updateItemAction } from "../../actions/itemActions";

export default function ListedItemCard(props) {
    const [open, setOpen] = useState(false);
    const [itemId] = useState(props.itemId);
    const [description, setDescription] = useState(props.description);
    const [title, setTitle] = useState(props.title);
    const [price, setPrice] = useState(props.price);
    const [active, setActive] = useState(props.active);
    const [edit, setEdit] = useState(false);
    const dispatch = useDispatch();
    function handleEdit() {
        const item = {
            itemId: itemId,
            itemTitle: title,
            itemDescription: description,
            itemPrice: price,
            itemActive: active,
        };
        dispatch(updateItemAction(item));
        setEdit(false);
    }

    return (
        <ThemeProvider theme={uscTheme}>
            <Card
                className="item"
                sx={{
                    display: "flex",
                    justifyContent: "left",
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
                    {edit ? (
                        <FormGroup
                            sx={{
                                flex: "1 0 auto",
                                textAlign: "left",
                                width: "90%",
                                pt: "3px",
                            }}
                        >
                            <FormControlLabel
                                control={
                                    <TextField
                                        variant="standard"
                                        defaultValue={title}
                                        sx={{ marginLeft: "5px" }}
                                    />
                                }
                                onChange={(event) =>
                                    setTitle(event.target.value)
                                }
                                label="Title"
                                labelPlacement="start"
                                sx={{ justifyContent: "flex-end" }}
                            />

                            <FormControlLabel
                                control={
                                    <TextField
                                        defaultValue={description}
                                        variant="standard"
                                        multiline
                                        rows={5}
                                        sx={{
                                            marginLeft: 0,
                                            width: "100%",
                                        }}
                                    />
                                }
                                label="Description"
                                onChange={(event) =>
                                    setDescription(event.target.value)
                                }
                                labelPlacement="top"
                                sx={{
                                    alignItems: "flex-start",
                                }}
                            />
                            <FormControlLabel
                                control={
                                    <TextField
                                        variant="standard"
                                        defaultValue={price}
                                        sx={{ marginLeft: "5px" }}
                                    />
                                }
                                sx={{
                                    justifyContent: "flex-end",
                                }}
                                label="Price"
                                onChange={(event) =>
                                    setPrice(event.target.value)
                                }
                                labelPlacement="start"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        sx={{
                                            marginLeft: "1em",
                                            color: red[800],
                                            "& .MuiSvgIcon-root": {
                                                fontSize: 35,
                                            },
                                            "&.Mui-checked": {
                                                color: red[600],
                                            },
                                        }}
                                        checked={active}
                                        onChange={() => setActive(!active)}
                                    />
                                }
                                label="Sold out"
                            />
                        </FormGroup>
                    ) : (
                        <>
                            <CardContent
                                sx={{ flex: "1 0 auto", textAlign: "left" }}
                            >
                                <Typography component="div" variant="h5">
                                    {props.title}
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
                                <Typography variant="body2">
                                    {props.price}
                                </Typography>
                            </Box>
                        </>
                    )}

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
                        {edit ? (
                            <FormGroup
                                sx={{
                                    pt: "3px",
                                    display: "flex",
                                    flexDirection: "row",
                                }}
                            >
                                <CustomButton
                                    text="Cancel"
                                    onClick={() => setEdit(false)}
                                />
                                <CustomButton
                                    text="Save"
                                    onClick={handleEdit}
                                />
                            </FormGroup>
                        ) : (
                            <CustomButton
                                text="Edit"
                                onClick={() => setEdit(true)}
                            />
                        )}
                    </Box>
                </Box>
                <CardMedia
                    component="img"
                    sx={{ width: "100%" }}
                    image=""
                    alt=""
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
