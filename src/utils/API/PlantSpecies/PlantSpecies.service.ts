import { url } from "../url";

export const getAllSpecies = async (accessToken: string) => {
    const urlGetAllPlantSpecies = `${url}/plant-species`

    try {
        const response = await fetch(urlGetAllPlantSpecies, {
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