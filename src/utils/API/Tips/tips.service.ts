import { CreateTip, UpdateTip } from "../../../Interface/Tip/Tip.interface";
import { AuthContext } from "../../../Interface/User/user.interface";
import { getFromLocalStorage } from "../../localStorage/localStorage.service";
import { url } from "../url";

export const createTip = async (data: CreateTip) => {

    const storedContext: AuthContext = getFromLocalStorage('authContext');
    const accessToken = storedContext !== null ? storedContext.accessToken : '';
    const urlCreateTip = `${url}/tips`

    const formData = new FormData();
    formData.append("description", data.description);
    formData.append("plantId", String(data.plantId));

    // Ajout de l'image seulement si elle est présente
    if (data.pic) {
        formData.append("pic", data.pic);
    }

    try {
        const response = await fetch(urlCreateTip, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
            body: formData
        });

        const result = await response.json();

        return result

    } catch (error) {
        console.error('Erreur lors de l\'appel API:', error);
        throw error;
    }
};


export const updateTip = async (data: UpdateTip, idTip: number) => {

    const storedContext: AuthContext = getFromLocalStorage('authContext');
    const accessToken = storedContext !== null ? storedContext.accessToken : '';
    const urlEditTip = `${url}/tips/${idTip}`

    try {
        const response = await fetch(urlEditTip, {
            method: 'PATCH',
            headers: {
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

    const storedContext: AuthContext = getFromLocalStorage('authContext');
    const accessToken = storedContext !== null ? storedContext.accessToken : '';
    const urlDeletePlantTip = `${url}/tips/${idTip}`

    try {
        await fetch(urlDeletePlantTip, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

    } catch (error) {
        console.error('Erreur lors de l\'appel API:', error);
        throw error;
    }
}

export const getPlantTips = async (plantId: number) => {

    const storedContext: AuthContext = getFromLocalStorage('authContext');
    const accessToken = storedContext !== null ? storedContext.accessToken : '';
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