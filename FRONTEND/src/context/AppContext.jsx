import { createContext, useContext, useState } from "react";

// Create context
export const AppContext = createContext();

// Context provider component
export const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const value = { user, setUser };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook to use the context
export const useAppContext = () => {
    return useContext(AppContext);
};
