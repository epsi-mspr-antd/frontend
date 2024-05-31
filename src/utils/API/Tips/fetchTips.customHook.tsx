import { useState, useEffect } from 'react';
import { getPlantTips } from './tips.service';
import { Tip } from '../../../Interface/Tip/Tip.interface';
import { AuthContext } from '../../../Interface/User/user.interface';
import { getFromLocalStorage } from '../../localStorage/localStorage.service';


export const fecthTipsByPlantId = (idPlant: number) => {
  const storedContext: AuthContext = getFromLocalStorage('authContext');
  const accessToken = storedContext !== null ? storedContext.accessToken : '';
  const [tips, setTips] = useState<Tip[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await getPlantTips(idPlant);
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
