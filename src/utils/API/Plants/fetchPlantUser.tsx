import { useState, useEffect } from 'react';
import { getUserPlant } from './APIPlants.service';
import { Plant } from '../../../Interface/Plants/PlantsList.interface';
import { getFromLocalStorage } from '../../localStorage/localStorage.service';

const storedContext = getFromLocalStorage('authContext');
const accessToken = storedContext.access_token;

export const usePlants = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        setLoading(true);
        const data = await getUserPlant();
        setPlants(data.data); // Assumes the data is in data.data based on your earlier structure
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPlants();
  }, [accessToken]); // Depend on accessToken to refetch if it changes

  return { plants, loading };
};
