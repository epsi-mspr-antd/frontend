import { CreatePlant } from "../../../Interface/Plants/PlantsList.interface";
import { AuthContext } from "../../../Interface/User/user.interface";
import { getFromLocalStorage } from "../../localStorage/localStorage.service";
import { url } from "../url";

// Get All Plants
export const getAllPlant = async () => {
  const storedContext: AuthContext = getFromLocalStorage("authContext");
  const accessToken = storedContext !== null ? storedContext.accessToken : "";
  const urlGetAllPlant = `${url}/plants`;

  try {
    const response = await fetch(urlGetAllPlant, {
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

// Get User Plants
export const getUserPlant = async () => {
  const storedContext: AuthContext = getFromLocalStorage("authContext");
  const userID = storedContext !== null ? storedContext.userID : "";
  const accessToken = storedContext !== null ? storedContext.accessToken : "";
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

// Get Plant by Id
export const getPlantById = async (plantId: number) => {
  const storedContext: AuthContext = getFromLocalStorage("authContext");
  const accessToken = storedContext !== null ? storedContext.accessToken : "";
  const urlGetUserPlant = `${url}/plants/${plantId}`;

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
  const storedContext: AuthContext = getFromLocalStorage("authContext");
  const accessToken = storedContext !== null ? storedContext.accessToken : "";
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
  const storedContext: AuthContext = getFromLocalStorage("authContext");
  const accessToken = storedContext !== null ? storedContext.accessToken : "";
  const urlCreatePlant = `${url}/plants`;

  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("speciesId", String(data.speciesId));
  formData.append("statusId", String(data.statusId));
  formData.append("addressId", String(data.addressId));

  // Ajout de l'image seulement si elle est présente
  if (data.pic) {
    formData.append("pic", data.pic);
  }

  try {
    const response = await fetch(urlCreatePlant, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
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
  const storedContext: AuthContext = getFromLocalStorage("authContext");
  const accessToken = storedContext !== null ? storedContext.accessToken : "";
  const urlEditPlant = `${url}/plants/${idPlant}`;

  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("speciesId", String(data.speciesId));
  formData.append("statusId", String(data.statusId));
  formData.append("addressId", String(data.addressId));

  // Ajout de l'image seulement si elle est présente
  // if (data.pic) {
  //   formData.append("pic", data.pic);
  // }
  // console.log(formData);

  try {
    const response = await fetch(urlEditPlant, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Erreur lors de l'appel API:", error);
    throw error;
  }
};
