import { React, useState } from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import {
    Box,
    Checkbox,
    FormGroup,
    FormControlLabel,
    FormControl,
    ThemeProvider,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const customTheme = createTheme({
    components: {
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    color: red[800],
                    "&.Mui-checked": {
                        color: red[600],
                    },
                    "&.Mui-disabled": {
                        color: red[800],
                    },
                },
            },
        },
        MuiFormControlLabel: {
            styleOverrides: {
                root: {
                    color: "black",
                },
            },
        },
    },
});

function CustomFormControlLabel(props) {
    // props.isDisabled, props.text, props.rating
    const [checked, setChecked] = useState([
        props.isDisabled ? 1 <= props.rating : false,
        props.isDisabled ? 2 <= props.rating : false,
        props.isDisabled ? 3 <= props.rating : false,
        props.isDisabled ? 4 <= props.rating : false,
        props.isDisabled ? 5 <= props.rating : false,
    ]);

    function rate(id) {
        // then fill until reaching the id
        var index = 0;
        setChecked(
            checked.map(() => {
                if (index <= id) {
                    ++index;
                    return true;
                }
                ++index;
                return false;
            })
        );
    }

    return (
        <ThemeProvider theme={customTheme}>
            <FormControlLabel
                value={props.text}
                control={
                    <FormGroup aria-label="position" row>
                        <Checkbox
                            disabled={props.isDisabled ? true : false}
                            onClick={() => rate(0)}
                            checked={checked[0]}
                            icon={<StarBorderIcon />}
                            checkedIcon={<StarIcon />}
                        />
                        <Checkbox
                            disabled={props.isDisabled ? true : false}
                            onClick={() => rate(1)}
                            checked={checked[1]}
                            icon={<StarBorderIcon />}
                            checkedIcon={<StarIcon />}
                        />
                        <Checkbox
                            disabled={props.isDisabled ? true : false}
                            onClick={() => rate(2)}
                            checked={checked[2]}
                            icon={<StarBorderIcon />}
                            checkedIcon={<StarIcon />}
                        />
                        <Checkbox
                            disabled={props.isDisabled ? true : false}
                            onClick={() => rate(3)}
                            checked={checked[3]}
                            icon={<StarBorderIcon />}
                            checkedIcon={<StarIcon />}
                        />
                        <Checkbox
                            disabled={props.isDisabled ? true : false}
                            onClick={() => rate(4)}
                            checked={checked[4]}
                            icon={<StarBorderIcon />}
                            checkedIcon={<StarIcon />}
                        />
                    </FormGroup>
                }
                label={props.text}
                labelPlacement="top"
            />
        </ThemeProvider>
    );
}

export default function Rating(props) {
    // if it is a form, component acts as a form for user to fill out
    // otherwise, disable checkboxes and only display the ratings
    // props.isDisabled

    return (
        <ThemeProvider theme={customTheme}>
            <Box
                sx={{
                    backgroundColor: "white",
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <FormControl component="fieldset">
                    <FormGroup aria-label="position">
                        <CustomFormControlLabel
                            text="Responsiveness"
                            isDisabled={props.isDisabled}
                            rating={props.responsiveness}
                        />
                        <CustomFormControlLabel
                            text="Trustworthiness"
                            isDisabled={props.isDisabled}
                            rating={props.trustworthiness}
                        />
                        <CustomFormControlLabel
                            text="Timeliness"
                            isDisabled={props.isDisabled}
                            rating={props.timeliness}
                        />
                    </FormGroup>
                </FormControl>
            </Box>
        </ThemeProvider>
    );
}
