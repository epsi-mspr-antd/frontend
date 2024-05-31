import { CreatePlant } from "../../../Interface/Plants/PlantsList.interface";
import { url } from "../url";
const userID = 1;

export const getUserPlant = async (accessToken: string) => {
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

export const deleteUserPlantById = async (
  idPlant: number,
  accessToken: string
) => {
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

export const createPlant = async (accessToken: string, data: CreatePlant) => {
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

export const editPlant = async (
  accessToken: string,
  data: CreatePlant,
  idPlant: number
) => {
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
