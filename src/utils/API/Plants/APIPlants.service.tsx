import { url } from "../url";
const userID = 1

export const getUserPlant = async (accessToken: string) => {
    const urlGetUserPlant = `${url}/plants/user/${userID}`

    try {
        const response = await fetch(urlGetUserPlant, {
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