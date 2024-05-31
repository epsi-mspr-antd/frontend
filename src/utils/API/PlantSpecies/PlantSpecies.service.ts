import { AuthContext } from "../../../Interface/User/user.interface";
import { getFromLocalStorage } from "../../localStorage/localStorage.service";
import { url } from "../url";

const storedContext: AuthContext = getFromLocalStorage('authContext');
const accessToken = storedContext.accessToken;

export const getAllSpecies = async () => {
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