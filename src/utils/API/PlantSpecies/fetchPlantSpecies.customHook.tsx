import { useState, useEffect } from 'react';
import { getAllSpecies } from './PlantSpecies.service';
import { PlantSpecies } from '../../../Interface/PlantSpecies/PlantSpecies.interface';
import { AuthContext } from '../../../Interface/User/user.interface';
import { getFromLocalStorage } from '../../localStorage/localStorage.service';


export const fecthAllPlantSpecies = () => {
  const [species, setSpecies] = useState<PlantSpecies[]>([]);
  const [loading, setLoading] = useState(true);
  const storedContext: AuthContext = getFromLocalStorage('authContext');
  const accessToken = storedContext !== null ? storedContext.accessToken : '';

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await getAllSpecies();
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