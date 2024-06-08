import { useState, useEffect } from 'react';
import { getUsersGuardingPlant } from './APIPlantGuardians.service';
import { getFromLocalStorage } from '../../localStorage/localStorage.service';

export const useUsersGuardingPlant = (plantId: string) => {
  const [guardians, setGuardians] = useState<any[]>([]);
  const [loadingGuardian, setLoading] = useState(true);
  const storedContext = getFromLocalStorage('authContext');
  const accessToken = storedContext !== null ? storedContext.accessToken : '';

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await getUsersGuardingPlant(plantId);
        setGuardians(data.data); // Assumes the data is in data.data based on your earlier structure
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [plantId, accessToken]); // Depend on plantId and accessToken to refetch if they change

  return { guardians, loadingGuardian };
};