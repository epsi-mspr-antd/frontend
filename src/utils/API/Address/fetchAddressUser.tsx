import { useState, useEffect } from "react";
import { getUserAddress } from "./address.service";
import { Property } from "../../../Interface/Properties/PropertiesList.interface";

export const useAdresses = (accessToken: string) => {
  const [addresses, setAddresses] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        setLoading(true);
        const data = await getUserAddress(accessToken);
        setAddresses(data.data); // Assumes the data is in data.data based on your earlier structure
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAddresses();
  }, [accessToken]); // Depend on accessToken to refetch if it changes

  return { addresses, loading };
};
