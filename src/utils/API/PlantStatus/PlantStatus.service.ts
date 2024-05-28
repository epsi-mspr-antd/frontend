import { url } from "../url";

export const getAllStatus = async (accessToken: string) => {
    const urlGetAllPlantStatus = `${url}/plant-status`

    try {
        const response = await fetch(urlGetAllPlantStatus, {
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