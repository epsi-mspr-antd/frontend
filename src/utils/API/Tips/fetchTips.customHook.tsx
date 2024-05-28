import { useState, useEffect } from 'react';
import { getPlantTips } from './tips.service';
import { Tip } from '../../../Interface/Tip/Tip.interface';

export const fecthTipsByPlantId = (accessToken: string, idPlant: number) => {
    const [tips, setTips] = useState<Tip[]>();
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          setLoading(true);
          const data = await getPlantTips(accessToken, idPlant);
          setTips(data.data);
          setLoading(false);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchUsers();
    }, [accessToken]);
  
    return { tips, loading };
  };