import { useState, useEffect } from 'react';
import { getAllStatus } from './PlantStatus.service';
import { Condition } from '../../../Interface/PlantStatus/PlantStatus.interface';
import { getFromLocalStorage } from '../../localStorage/localStorage.service';
import { AuthContext } from '../../../Interface/User/user.interface';

const storedContext: AuthContext = getFromLocalStorage('authContext');

const accessToken = storedContext.accessToken;

export const fectAllPlantStatus = () => {
  const [status, setStatus] = useState<Condition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await getAllStatus();
        setStatus(data.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, [accessToken]);

  return { status, loading };
};