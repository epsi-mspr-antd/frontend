import { AuthContext } from "../../../Interface/User/user.interface";
import { getFromLocalStorage } from "../../localStorage/localStorage.service";
import { CreateAdress } from "../../../Interface/Properties/PropertiesList.interface";

import { url } from "../url";

export const createAdress = async (data: CreateAdress) => {
    const storedContext: AuthContext = getFromLocalStorage('authContext');
    const accessToken = storedContext !== null ? storedContext.accessToken : '';
    const urlCreateAdress = `${url}/addresses`

    try {
        const response = await fetch(urlCreateAdress, {
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


export const editAdress = async (data: CreateAdress, idAdress: number) => {
    const storedContext: AuthContext = getFromLocalStorage('authContext');
    const accessToken = storedContext !== null ? storedContext.accessToken : '';
    const urlEditAdress = `${url}/adresses/${idAdress}`

    try {
        const response = await fetch(urlEditAdress, {
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

export const deleteUserAdressById = async (idAdress: number) => {
    const storedContext: AuthContext = getFromLocalStorage('authContext');
    const accessToken = storedContext !== null ? storedContext.accessToken : '';
    const urlDeleteUserAdress = `${url}/adresses/${idAdress}`

    try {
        const response = await fetch(urlDeleteUserAdress, {
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
};

  export const getUserAddress = async (accessToken: string) => {
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
      throw error;
    }
  };