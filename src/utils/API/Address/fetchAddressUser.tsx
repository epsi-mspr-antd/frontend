import { useState, useEffect, useCallback } from "react";
import { getUserAddress } from "./address.service";
import { Property } from "../../../Interface/Properties/PropertiesList.interface";
import { AuthContext } from "../../../Interface/User/user.interface";
import { getFromLocalStorage } from "../../localStorage/localStorage.service";

export const useAdresses = () => {
  const [addresses, setAddresses] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const storedContext: AuthContext = getFromLocalStorage('authContext');
  const accessToken = storedContext !== null ? storedContext.accessToken : '';

  const fetchAddresses = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getUserAddress();
      data.success ?  setAddresses(data.data) : setAddresses([]), setError(true); // Assumes the data is in data.data based on your earlier structure
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }, [accessToken]);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  return { addresses, loading, refetch: fetchAddresses, error };
};
