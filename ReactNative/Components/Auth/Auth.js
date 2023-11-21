import { createContext, useContext, useState } from "react";
import { useFonts } from 'expo-font';

const AuthContext = createContext();
const useAuth = () => {
    return useContext(AuthContext)
}
const Auth = ({ children }) => {

    const logout = () => {
        seTUser(null)

    }
    return (
        <AuthContext.Provider value={{ logout }}>
            {children}
        </AuthContext.Provider>

    )
}

export { useAuth, AuthContext, Auth }