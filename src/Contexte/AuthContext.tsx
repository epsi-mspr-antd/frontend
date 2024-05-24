import React, { createContext, useState } from "react";
import { AuthProviderProps } from "../Interface/React/React.interface";

// TODO: Make it consistent with cookies / cache. Refresh. Cookies favorite

interface AuthContextType {
    email: string;
    accessToken: string;
    refreshToken: string;
    updateEmail: (email: string) => string;
    updateAccessToken: (accessToken: string) => string;
    updateRefreshToken: (refreshToken: string) => string;
}

export const AuthContext = createContext<AuthContextType>({
    email: '',
    accessToken: '',
    refreshToken: '',
    updateEmail: (email: string) => email,
    updateAccessToken: (accessToken: string) => accessToken,
    updateRefreshToken: (refreshToken: string) => refreshToken,
});


export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [email, setEmail] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [refreshToken, setRefreshToken] = useState('');

    const AuthValue: AuthContextType = {
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
    };

    return (
        <AuthContext.Provider value={AuthValue}>
            {children}
        </AuthContext.Provider>
    );
};
