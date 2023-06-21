import { React, useState } from "react";
import {
    Box,
    TextField,
    FormGroup,
    FormControlLabel,
    Button,
    Stack,
    IconButton,
} from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import CustomButton from "../homepage/login/customButton";
import { connect, useDispatch } from "react-redux";
import { sellAction } from "../../actions/itemActions";

const customTheme = createTheme({
    components: {
        MuiFormControlLabel: {
            styleOverrides: {
                root: {
                    marginLeft: 0,
                    marginRight: 0,
                    marginTop: "10px",
                    backgroundColor: "white",
                    borderRadius: "10px",
                    color: "black",
                    width: "inherit",
                    paddingLeft: "10px",
                    justifyContent: "flex-end",
                    paddingTop: "2px",
                    paddingBottom: "2px",
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    marginLeft: "15px",
                    backgroundColor: "white",
                    borderColor: "white",
                    overflow: "scroll",
                    borderRadius: "10px",
                    width: "inherit",
                },
            },
        },
    },
});

function NewItemForm({ userEmail }) {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [imgs, setImgs] = useState(null);
    const [description, setDescription] = useState("");
    const dispatch = useDispatch();
    function handleSubmit() {
        var item = {
            itemTitle: title,
            itemPrice: price,
            itemDescription: description,
            itemImgs: imgs,
            itemListedTime: Date.now(), // get current time in ms
            userEmail: userEmail,
        };
        dispatch(sellAction(item));
    }
    // need to preview images if possible
    return (
        <ThemeProvider theme={customTheme}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    mt: "15px",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <FormGroup
                    sx={{
                        width: "90%",
                        alignItems: "center",
                    }}
                >
                    <FormControlLabel
                        control={<TextField required variant="standard" />}
                        onChange={(event) => setTitle(event.target.value)}
                        label="Title"
                        labelPlacement="start"
                    />

                    <FormControlLabel
                        control={
                            <TextField
                                variant="standard"
                                multiline
                                rows={5}
                                sx={{ marginLeft: 0, width: "100%" }}
                            />
                        }
                        label="Description"
                        onChange={(event) => setDescription(event.target.value)}
                        labelPlacement="top"
                        sx={{
                            alignItems: "flex-start",
                        }}
                    />
                    <FormControlLabel
                        control={<TextField required variant="standard" />}
                        label="Price"
                        onChange={(event) => setPrice(event.target.value)}
                        labelPlacement="start"
                    />
                    <FormControlLabel
                        control={
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={2}
                            >
                                <Button
                                    component="label"
                                    sx={{
                                        marginLeft: "20px",
                                        backgroundColor: "rgb(153, 27, 27)",
                                        color: "white",
                                        "&:hover": {
                                            background: "rgb(153, 27, 27)",
                                        },
                                    }}
                                >
                                    Upload
                                    <input
                                        hidden
                                        accept="image/*"
                                        multiple
                                        type="file"
                                    />
                                </Button>
                                <IconButton
                                    color="primary"
                                    aria-label="upload picture"
                                    component="label"
                                    sx={{
                                        color: "rgb(153, 27, 27)",
                                    }}
                                >
                                    <input
                                        hidden
                                        accept="image/*"
                                        type="file"
                                        onChange={(event) =>
                                            setImgs(event.target.value)
                                        }
                                    />
                                    <PhotoCamera />
                                </IconButton>
                            </Stack>
                        }
                        label="Photos"
                        labelPlacement="start"
                    />
                    <CustomButton text="Submit" onClick={handleSubmit} />
                </FormGroup>
            </Box>
        </ThemeProvider>
    );
}
const mapStateToProps = (state) => {
    return { userEmail: state.userEmail };
};

export default connect(mapStateToProps)(NewItemForm);
