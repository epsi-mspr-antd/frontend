import { CreateAdress } from "../../../Interface/Properties/PropertiesList.interface";
import { AuthContext } from "../../../Interface/User/user.interface";
import { getFromLocalStorage } from "../../localStorage/localStorage.service";
import { url } from "../url";

<<<<<<< HEAD
export const createAdress = async (data: CreateAdress) => {
    const storedContext: AuthContext = getFromLocalStorage('authContext');
    const accessToken = storedContext !== null ? storedContext.accessToken : '';
=======
const storedContext: AuthContext = getFromLocalStorage('authContext');
const accessToken = storedContext.accessToken;


export const createAdress = async (data: CreateAdress) => {
>>>>>>> main
    const urlCreateAdress = `${url}/addresses`

    try {
        const response = await fetch(urlCreateAdress, {
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


export const editAdress = async (data: CreateAdress, idAdress: number) => {
<<<<<<< HEAD
    const storedContext: AuthContext = getFromLocalStorage('authContext');
    const accessToken = storedContext !== null ? storedContext.accessToken : '';
=======
>>>>>>> main
    const urlEditAdress = `${url}/adresses/${idAdress}`

    try {
        const response = await fetch(urlEditAdress, {
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

export const deleteUserAdressById = async (idAdress: number) => {
    const storedContext: AuthContext = getFromLocalStorage('authContext');
    const accessToken = storedContext !== null ? storedContext.accessToken : '';
    const urlDeleteUserAdress = `${url}/adresses/${idAdress}`

    try {
        const response = await fetch(urlDeleteUserAdress, {
            headers: {
                'method': 'DELETE',
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