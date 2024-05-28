import { CreateAdress } from "../../../Interface/Properties/PropertiesList.interface";
import { url } from "../url";

export const createAdress = async (accessToken: string, data: CreateAdress) => {
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


export const editAdress = async (accessToken: string,  data: CreateAdress, idAdress: number) => {
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

export const deleteUserAdressById = async (idAdress: number, accessToken: string) => {
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