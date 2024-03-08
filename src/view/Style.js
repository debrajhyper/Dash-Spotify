import { createTheme, responsiveFontSizes, colors } from "@mui/material";

let theme = createTheme({
    palette: {
        mode: 'dark',
        secondary: {
            main: colors.green['A700'],
        },
        background: {
            default: colors.grey[900]
        }
    },
});

theme = responsiveFontSizes(theme);
export { theme };