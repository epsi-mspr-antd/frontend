import { CreatePlant } from "../../../Interface/Plants/PlantsList.interface";
import { AuthContext } from "../../../Interface/User/user.interface";
import { getFromLocalStorage } from "../../localStorage/localStorage.service";
import { url } from "../url";



// Get User Plants
export const getUserPlant = async () => {
  const storedContext: AuthContext = getFromLocalStorage('authContext');
  const userID = storedContext !== null ? storedContext.userID : '';
  const accessToken = storedContext !== null ? storedContext.accessToken : '';
  const urlGetUserPlant = `${url}/plants/user/${userID}`;

  try {
    const response = await fetch(urlGetUserPlant, {
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

// Delete User Plant by ID
export const deleteUserPlantById = async (idPlant: number) => {
  const storedContext: AuthContext = getFromLocalStorage('authContext');
  const accessToken = storedContext !== null ? storedContext.accessToken : '';
  const urlDeleteUserPlant = `${url}/plants/${idPlant}`;

  try {
    const response = await fetch(urlDeleteUserPlant, {
      method: "DELETE",
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

// Create Plant 
export const createPlant = async (data: CreatePlant) => {
  const storedContext: AuthContext = getFromLocalStorage('authContext');
  const accessToken = storedContext !== null ? storedContext.accessToken : '';
  const urlCreatePlant = `${url}/plants`;

  try {
    const response = await fetch(urlCreatePlant, {
      headers: {
        method: "POST",
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Erreur lors de l'appel API:", error);
    throw error;
  }
};

// Edit Plant
export const editPlant = async (data: CreatePlant, idPlant: number) => {
  const storedContext: AuthContext = getFromLocalStorage('authContext');
  const accessToken = storedContext !== null ? storedContext.accessToken : '';
  const urlEditPlant = `${url}/plants/${idPlant}`;

  try {
    const response = await fetch(urlEditPlant, {
      headers: {
        method: "POST",
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Erreur lors de l'appel API:", error);
    throw error;
  }
};
