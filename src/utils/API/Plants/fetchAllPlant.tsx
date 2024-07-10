import { useState, useEffect } from 'react';
import { getAllPlant } from './APIPlants.service';
import { Plant } from '../../../Interface/Plants/PlantsList.interface';
import { getFromLocalStorage } from '../../localStorage/localStorage.service';

export const useAllPlants = () => {
  const [allPlants, setAllPlants] = useState<Plant[]>([]);
  const [loadingAllPlant, setLoading] = useState(true);
  const storedContext = getFromLocalStorage('authContext');
  const accessToken = storedContext !== null ? storedContext.accessToken : '';

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        setLoading(true);
        const data = await getAllPlant();
        setAllPlants(data.data); // Assumes the data is in data.data based on your earlier structure
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPlants();
  }, [accessToken]); // Depend on accessToken to refetch if it changes

  return { allPlants, loadingAllPlant };
};
