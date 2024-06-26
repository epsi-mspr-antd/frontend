import { AuthUser } from "../../../Interface/User/user.interface";
import { url } from "../url";
import { getFromLocalStorage } from "../../localStorage/localStorage.service";

export const signUp = async (data: AuthUser) => {
    const urlRegister = url + '/auth/signup';

    try {
        const response = await fetch(urlRegister, {
            method: 'POST',
            headers: {
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


export const signIn = async (data: AuthUser) => {
    const urlRegister = url + '/auth/signin';

    try {
        const response = await fetch(urlRegister, {
            method: 'POST',
            headers: {
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

export const logOut = async () => {

    const storedContext = getFromLocalStorage('authContext');
    const accessToken = storedContext !== null ? storedContext.accessToken : '';
    const urlRegister = url + '/auth/logout';
    try {
        const response = await fetch(urlRegister, {
            method: 'POST',
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
}