import { AuthContext } from "../../../Interface/User/user.interface";
import { getFromLocalStorage } from "../../localStorage/localStorage.service";
import { url } from "../url";

// Get all users guarding a plant
export const getUsersGuardingPlant = async (plantId: number) => {
  const storedContext: AuthContext = getFromLocalStorage("authContext");
  const accessToken = storedContext !== null ? storedContext.accessToken : "";
  const urlGetUsersGuardingPlant = `${url}/plants/guard/${plantId}`;

  try {
    const response = await fetch(urlGetUsersGuardingPlant, {
      method: "GET",
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

export const guardPlant = async (plantId: number) => {
  const storedContext: AuthContext = getFromLocalStorage("authContext");
  const accessToken = storedContext !== null ? storedContext.accessToken : "";
  const urlGuardingPlant = `${url}/plants/guard/${plantId}`;

  try {
    const response = await fetch(urlGuardingPlant, {
      method: "PATCH",
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
    });

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Erreur lors de l'appel API:", error);
    throw error;
  }
};

export const unguardPlant = async (plantId: number) => {
  const storedContext: AuthContext = getFromLocalStorage("authContext");
  const accessToken = storedContext !== null ? storedContext.accessToken : "";
  const urlUnguardingPlant = `${url}/plants/unguard/${plantId}`;

  try {
    const response = await fetch(urlUnguardingPlant, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
    });

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Erreur lors de l'appel API:", error);
    throw error;
  }
};