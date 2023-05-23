//import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material";
import uscTheme from "../styles";

function CustomButton(props) {
    return (
        <ThemeProvider theme={uscTheme}>
            <div>
                <Button variant="contained" sx={{ margin: 1 }}>
                    {props.text}
                </Button>
            </div>
        </ThemeProvider>
    );
}

export default CustomButton;
