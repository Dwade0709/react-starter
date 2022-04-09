import React, { createContext, useReducer, useContext } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { localStorageGet } from '../utils/localStorage';
import AppReducer from './appReducer';
import IAppStore from '@typings/base/IAppState';

const initialAppState: IAppStore = {
    darkMode: false, // Overridden by useMediaQuery('(prefers-color-scheme: dark)') in AppStore
    error: '',
    isAuthenticated: false,
    currentUser: undefined,
};

/**
 * Instance of React Context for global AppStore
 *
 * import {AppContext} from './store'
 * ...
 * const [state, dispatch] = useContext(AppContext);
 *
 * OR
 *
 * import {useAppStore} from './store'
 * ...
 * const [state, dispatch] = useAppStore();
 *
 */
export const AppContext = createContext(initialAppState);

/**
 * Main global Store as HOC with React Context API
 *
 * import AppStore from './store'
 * ...
 * <AppStore>
 *  <App/>
 * </AppStore>
 */
export const AppStore = ({ children }: React.PropsWithChildren<{}>) => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const previousDarkMode = Boolean(localStorageGet('darkMode'));

    const initialState = {
        ...initialAppState,
        darkMode: previousDarkMode || prefersDarkMode,
    };

    const [state, _] = useReducer(AppReducer, initialState);
    return (
        <AppContext.Provider value={state} >
            {children}
        </AppContext.Provider>
    );
};

/**
 * Hook to use the AppStore in functional components
 */
export const useAppStore = () => useContext(AppContext);

/**
 * HOC to inject the ApStore to functional or class component
 */
export const withAppStore = (Component: any) => (props: any) => {
    return (
        <Component {...props} store={useAppStore()} />
    );
};
