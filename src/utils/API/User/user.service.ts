import { url } from "../url";

export const updateUser = async (accessToken: string, idUser: number, data: unknown) => {
    const urlEditUser = `${url}/users/${idUser}`
    
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

export const getAllUsers = async (accessToken: string) => {
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

export const getUserByID = async (accessToken: string, idUser: number) => {
    const urlGetUserByID = `${url}/users/${idUser}`

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
