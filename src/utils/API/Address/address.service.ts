import { AuthContext } from "../../../Interface/User/user.interface";
import { getFromLocalStorage } from "../../localStorage/localStorage.service";
import { CreateAdress, Property } from "../../../Interface/Properties/PropertiesList.interface";

import { url } from "../url";
import { ErrorAPI, SuccessResponseWithData } from "../../../Interface/API/APIResponse.interface";

export const createAdress = async (data: CreateAdress) => {
    const storedContext: AuthContext = getFromLocalStorage('authContext');
    const accessToken = storedContext !== null ? storedContext.accessToken : '';
    const urlCreateAdress = `${url}/addresses`

    try {
        await fetch(urlCreateAdress, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

    } catch (error) {
        console.error('Erreur lors de l\'appel API:', error);
        throw error;
    }
};


export const editAdress = async (data: CreateAdress, idAdress: number) => {
    const storedContext: AuthContext = getFromLocalStorage('authContext');
    const accessToken = storedContext !== null ? storedContext.accessToken : '';
    const urlEditAdress = `${url}/addresses/${idAdress}`

    try {
        const response = await fetch(urlEditAdress, {
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

export const deleteUserAdressById = async (idAdress: number) => {
    const storedContext: AuthContext = getFromLocalStorage('authContext');
    const accessToken = storedContext !== null ? storedContext.accessToken : '';
    const urlDeleteUserAdress = `${url}/addresses/${idAdress}`

    try {
        await fetch(urlDeleteUserAdress, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

    } catch (error) {
        console.error('Erreur lors de l\'appel API:', error);
        throw error;
    }
};

  export const getUserAddress = async ():Promise<ErrorAPI | SuccessResponseWithData<Property[]>> => {
    const storedContext: AuthContext = getFromLocalStorage('authContext');
    const accessToken = storedContext !== null ? storedContext.accessToken : '';
    const urlGetUserAddress = `${url}/me/addresses`;
   
    try {
      const response = await fetch(urlGetUserAddress, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      const result = await response.json();
  
      return result;
    } catch (error) {
      console.error("Erreur lors de l'appel API:", error);
        return {success: false, message: 'Erreur lors de l\'appel', error: error}
    }
  };