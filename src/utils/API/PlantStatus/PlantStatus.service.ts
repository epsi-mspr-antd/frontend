import { AuthContext } from "../../../Interface/User/user.interface";
import { getFromLocalStorage } from "../../localStorage/localStorage.service";
import { url } from "../url";

const storedContext: AuthContext = getFromLocalStorage('authContext');
const accessToken = storedContext.accessToken;

export const getAllStatus = async () => {
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