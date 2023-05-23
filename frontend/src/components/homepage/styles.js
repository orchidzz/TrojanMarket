import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const uscTheme = createTheme({
    palette: {
        primary: {
            main: "#b71c1c",
            contrastText: "white",
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    // Some CSS
                    fontSize: "1rem",
                    backgroundColor: "rgb(153, 27, 27)",
                    fontFamily: "Lato",
                    color: "rgb(255, 247, 237)",
                },
            },
        },
        MuiIcon: {
            styleOverrides: {
                root: {
                    backgroundColor: "black",
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    color: "black",
                    font: "san-serif",
                    fontSize: "18px",
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: "white",
                    border: "5px solid",
                    borderColor: red[100],
                },
            },
        },
    },
});
export default uscTheme;
