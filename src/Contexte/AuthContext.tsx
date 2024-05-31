import React, { createContext, useEffect, useState } from "react";
import { AuthProviderProps } from "../Interface/React/React.interface";
import { getFromLocalStorage } from "../utils/localStorage/localStorage.service";

// TODO: Make it consistent with cookies / cache. Refresh. Cookies favorite

interface AuthContextType {
    userID: number | null ;
    email: string;
    accessToken: string;
    refreshToken: string;
    updateEmail: (email: string) => string;
    updateAccessToken: (accessToken: string) => string;
    updateRefreshToken: (refreshToken: string) => string;
    updateUserID: (userId: number) => number;
}

export const AuthContext = createContext<AuthContextType>({
    userID: null,
    email: '',
    accessToken: '',
    refreshToken: '',
    updateEmail: (email: string) => email,
    updateAccessToken: (accessToken: string) => accessToken,
    updateRefreshToken: (refreshToken: string) => refreshToken,
    updateUserID: (userId: number) => userId,
});


export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [userID, setUserID] = useState(0)
    const [email, setEmail] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [refreshToken, setRefreshToken] = useState('');

    useEffect(() => {
        const storedAuthContext = getFromLocalStorage('authContext');
        if (storedAuthContext) {
            setUserID(storedAuthContext.userID);
            setEmail(storedAuthContext.email);
            setAccessToken(storedAuthContext.accessToken);
            setRefreshToken(storedAuthContext.refreshToken);
        }
    }, []);

    const AuthValue: AuthContextType = {
        userID,
        email,
        accessToken,
        refreshToken,
        updateEmail(email: string) {
            setEmail(email);
            return email;
        },
        updateAccessToken(accessToken: string) {
            setAccessToken(accessToken);
            return accessToken;
        },
        updateRefreshToken(refreshToken: string) {
            setRefreshToken(refreshToken);
            return refreshToken;
        },
        updateUserID(userId: number){
            setUserID(userId)
            return userId
        },
    };

    return (
        <AuthContext.Provider value={AuthValue}>
            {children}
        </AuthContext.Provider>
    );
};

