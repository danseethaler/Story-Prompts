import {createContext, useContext} from 'react';
import {AppContextType} from 'wTypes';

export const AppContext = createContext<AppContextType>(null as any);

const useAppContext = () => useContext(AppContext);

export default useAppContext;
