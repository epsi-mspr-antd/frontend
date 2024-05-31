import { AuthContext } from "../../../Interface/User/user.interface";
import { getFromLocalStorage } from "../../localStorage/localStorage.service";
import { url } from "../url";


export const getAllSpecies = async () => {
    const storedContext: AuthContext = getFromLocalStorage('authContext');
    const accessToken = storedContext !== null ? storedContext.accessToken : '';
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