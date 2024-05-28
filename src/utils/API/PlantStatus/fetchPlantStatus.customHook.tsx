import { useState, useEffect } from 'react';
import { getAllStatus } from './PlantStatus.service';
import { Condition } from '../../../Interface/PlantStatus/PlantStatus.interface';

export const fectAllPlantStatus = (accessToken: string) => {
  const [status, setStatus] = useState<Condition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await getAllStatus(accessToken);
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