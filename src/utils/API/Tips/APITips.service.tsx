import { AuthContext } from "../../../Interface/User/user.interface";
import { getFromLocalStorage } from "../../localStorage/localStorage.service";
import { url } from "../url";

// Get Plant by Id
export const getTipById = async (tipId: number) => {
  const storedContext: AuthContext = getFromLocalStorage("authContext");
  const accessToken = storedContext !== null ? storedContext.accessToken : "";
  const urlGetUserPlant = `${url}/tips/${tipId}`;

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
