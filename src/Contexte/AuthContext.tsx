import { createContext, useState } from "react";

// TODO: Make it consistent with cookies / cache. Refresh. Cookies favorite

export const AuthContext = createContext({
    email: '',
        accessToken: '',
        refreshToken: '',
        updateEmail(email: string) {
        },
        updateAccessToken(accessToken: string) {
        },
        updateRefreshToken(refreshToken: string) {
        }
})


export const AuthProvider = ({ children }) => {
    const [email, setEmail] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [refreshToken, setRefreshToken] = useState('');

    const updateEmail = (email: string) => {
        setEmail(email)
    };

    const updateAccessToken = (accessToken: string) => {
        setAccessToken(accessToken)
    };

    const updateRefreshToken = (refreshToken: string) => {
        setRefreshToken(refreshToken)
    };

    const AuthValue = {
        email: email,
        accessToken: accessToken,
        refreshToken: refreshToken,
        updateEmail(email: string) {
            setEmail(email)
        },
        updateAccessToken(accessToken: string) {
            setAccessToken(accessToken)
        },
        updateRefreshToken(refreshToken: string) {
            setRefreshToken(refreshToken)
        }
    }

    return (
        <>
            <AuthContext.Provider value={AuthValue}>
                {children}
            </AuthContext.Provider>
        </>
    )
}
