import { CreateTip, UpdateTip } from "../../../Interface/Tip/Tip.interface";
import { url } from "../url";

export const createTip = async (accessToken: string, data: CreateTip) => {
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
    

export const updateTip = async (accessToken: string, data: UpdateTip, idTip: number) => {
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

export const deletePlantTipByTipID = async (accessToken: string, idTip: number) => {
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

export const getPlantTips = async (accessToken: string, plantId: number) => {
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