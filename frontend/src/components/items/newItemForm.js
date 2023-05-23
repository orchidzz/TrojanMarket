import { React } from "react";
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

export default function NewItemForm() {
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
                        label="Title"
                        labelPlacement="start"
                    />

                    <FormControlLabel
                        control={
                            <TextField
                                required
                                variant="standard"
                                multiline
                                rows={5}
                                sx={{ marginLeft: 0, width: "100%" }}
                            />
                        }
                        label="Description"
                        labelPlacement="top"
                        sx={{
                            alignItems: "flex-start",
                        }}
                    />
                    <FormControlLabel
                        control={<TextField required variant="standard" />}
                        label="Price"
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
                                    />
                                    <PhotoCamera />
                                </IconButton>
                            </Stack>
                        }
                        label="Photos"
                        labelPlacement="start"
                    />
                    <CustomButton text="Submit" />
                </FormGroup>
            </Box>
        </ThemeProvider>
    );
}
