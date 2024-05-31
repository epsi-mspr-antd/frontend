import { AuthContext } from "../../../Interface/User/user.interface";
import { getFromLocalStorage } from "../../localStorage/localStorage.service";
import { url } from "../url";

const storedContext: AuthContext = getFromLocalStorage('authContext');
const userID = storedContext !== null ? storedContext.userID : '';
const accessToken = storedContext !== null ?  storedContext.accessToken : '';

export const updateUser = async (data: unknown) => {
    const urlEditUser = `${url}/users/${userID}`
    
    try {
        const response = await fetch(urlEditUser, {
            headers: {
                'method': 'POST',
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        return result

    } catch (error) {
        console.error('Erreur lors de l\'appel API:', error);
        throw error;
    }
};

export const getAllUsers = async () => {
    const urlGetAllUsers = `${url}/users`

    try {
        const response = await fetch(urlGetAllUsers, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        const result = await response.json();

        return result

    } catch (error) {
        console.error('Erreur lors de l\'appel API:', error);
        throw error;
    }
};

export const getUserByID = async () => {
    const urlGetUserByID = `${url}/users/${userID}`

    try {
        const response = await fetch(urlGetUserByID, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        const result = await response.json();

        return result

    } catch (error) {
        console.error('Erreur lors de l\'appel API:', error);
        throw error;
    }
};
