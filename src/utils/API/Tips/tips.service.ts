import { CreateTip, UpdateTip } from "../../../Interface/Tip/Tip.interface";
import { AuthContext } from "../../../Interface/User/user.interface";
import { getFromLocalStorage } from "../../localStorage/localStorage.service";
import { url } from "../url";

const storedContext: AuthContext = getFromLocalStorage('authContext');
const accessToken = storedContext.accessToken;

export const createTip = async (data: CreateTip) => {
        const urlCreateTip = `${url}/tips`
    
        try {
            const response = await fetch(urlCreateTip, {
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
    

export const updateTip = async (data: UpdateTip, idTip: number) => {
        const urlEditTip = `${url}/plants/${idTip}`
    
        try {
            const response = await fetch(urlEditTip, {
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

export const deletePlantTipByTipID = async (idTip: number) => {
    const urlDeletePlantTip = `${url}/adresses/${idTip}`

    try {
        const response = await fetch(urlDeletePlantTip, {
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
}

export const getPlantTips = async (plantId: number) => {
    const urlGetTipByPlantID = `${url}/tips/plant/${plantId}`

    try {
        const response = await fetch(urlGetTipByPlantID, {
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