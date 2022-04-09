/**
 * Material UI theme
 * See for details: https://material-ui.com/customization/default-theme/?expand-path=$.palette
 * Martial Color tool: https://material.io/resources/color
 */

import { createTheme, ThemeProvider, StyledEngineProvider, CssBaseline, ThemeOptions } from '@mui/material';
import React, { useMemo } from 'react';
import { useAppStore } from './store/appStore';


/**
 * Material UI theme "front" colors, "back" colors are different for Light and Dark modes
 */
const FRONT_COLORS = {
    primary: {
        main: '#81c784', // Green 300
        contrastText: '#000000',
    },
    secondary: {
        main: '#ffb74d', // Orange 300
        contrastText: '#000',
    },
    info: {
        main: '#0277bd', // Light Blue 800
        contrastText: '#FFFFFF',
    },
    success: {
        main: '#2e7d32', // Green 800
        contrastText: '#FFFFFF',
    },
    warning: {
        main: '#f9a825', // Yellow 800
        // contrastText: '#000000',
        contrastText: '#FFFFFF',
    },
    error: {
        main: '#c62828', // Red 800
        contrastText: '#FFFFFF',
    },
};

/**
 * Material UI theme config for "Light Mode"
 */
const LIGHT_THEME: ThemeOptions = {
    palette: {
        mode: 'light',
        background: {
            paper: '#f5f5f5', // Gray 100 - Background of "Paper" based component
            default: '#FFFFFF',
        },
        ...FRONT_COLORS,
    },
};

/**
 * Material UI theme config for "Dark Mode"
 */
const DARK_THEME: ThemeOptions = {
    palette: {
        mode: 'dark',
        background: {
            paper: '#424242', // Gray 800 - Background of "Paper" based component
            default: '#303030',
        },
        ...FRONT_COLORS,
    },
};

/**
 * Material UI Provider with Light and Dark themes depending on global "state.darkMode"
 */
export const AppThemeProvider = ({ children }: React.PropsWithChildren<{}>) => {
    const [state]: any = useAppStore();
    const theme = useMemo(() => (state.darkMode ? createTheme(DARK_THEME) : createTheme(LIGHT_THEME)), [state.darkMode]);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <CssBaseline /* Material UI Styles */ />
                {children}
            </ThemeProvider>
        </StyledEngineProvider>
    );
};
