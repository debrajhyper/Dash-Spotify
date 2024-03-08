import { theme } from './Style';
import { ThemeProvider, CssBaseline } from '@mui/material';

export function Layout({ children }) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};
