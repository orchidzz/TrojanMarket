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
    const [imgs, setImgs] = useState([]);
    const [description, setDescription] = useState("");
    const [slideIdx, setSlideIdx] = useState(0);
    const dispatch = useDispatch();
    async function handleSubmit() {
        function getBase64(imgs) {
            return new Promise((resolve, reject) => {
                var base64Imgs = [];
                var promises = [];
                for (let img of imgs) {
                    var promise = new Promise((resolve, reject) => {
                        var reader = new FileReader();
                        reader.readAsDataURL(img);
                        reader.onloadend = () => {
                            base64Imgs.push(reader.result);
                            resolve();
                        };
                        reader.onerror = function (error) {
                            reject(error);
                        };
                    });
                    promises.push(promise);
                }
                Promise.all(promises).then(() => {
                    resolve(base64Imgs);
                });
            });
        }

        getBase64(imgs).then((resolvedImgs) => {
            var item = {
                itemTitle: title,
                itemPrice: price,
                itemDescription: description,
                itemImgs: resolvedImgs,
                itemListedTime: Date.now(), // get current time in ms
                userEmail: userEmail,
            };

            console.log(item);
            dispatch(sellAction(item));
        });
    }
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
                                        type="file"
                                        onChange={(event) =>
                                            setImgs([
                                                ...imgs,
                                                event.target.files[0],
                                            ])
                                        }
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
                                            setImgs([
                                                ...imgs,
                                                event.target.files[0],
                                            ])
                                        }
                                    />
                                    <PhotoCamera />
                                </IconButton>
                            </Stack>
                        }
                        label="Photos"
                        labelPlacement="start"
                    />
                    <div>
                        {imgs.length > 0 && (
                            <>
                                <img
                                    key={slideIdx}
                                    src={URL.createObjectURL(imgs[slideIdx])}
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
                                                slideIdx !== 0
                                                    ? slideIdx - 1
                                                    : 0
                                            )
                                        }
                                        disabled={slideIdx === 0}
                                    >
                                        Previous
                                    </button>
                                    <button
                                        onClick={() =>
                                            setSlideIdx(
                                                slideIdx !== imgs.length - 1
                                                    ? slideIdx + 1
                                                    : imgs.length - 1
                                            )
                                        }
                                        disabled={slideIdx === imgs.length - 1}
                                    >
                                        Next
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                    <CustomButton text="Submit" onClick={handleSubmit} />
                </FormGroup>
            </Box>
        </ThemeProvider>
    );
}
const mapStateToProps = (state) => {
    return { userEmail: state.userReducer.userEmail };
};

export default connect(mapStateToProps)(NewItemForm);
