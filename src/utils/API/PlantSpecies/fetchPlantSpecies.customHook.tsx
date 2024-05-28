import { useState, useEffect } from 'react';
import { getAllSpecies } from './PlantSpecies.service';
import { PlantSpecies } from '../../../Interface/PlantSpecies/PlantSpecies.interface';

export const fecthAllPlantSpecies = (accessToken: string) => {
  const [species, setSpecies] = useState<PlantSpecies[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await getAllSpecies(accessToken);
        setSpecies(data.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, [accessToken]);

  return { species, loading };
};