import { useState, useEffect } from 'react';
import { User } from '../../../Interface/User/user.interface';
import { getAllUsers, getUserByID } from './user.service';

export const fectAllUser = (accessToken: string) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await getAllUsers(accessToken);
        setUsers(data.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, [accessToken]);

  return { users, loading };
};

export const fecthUserById = (accessToken: string, idUser: number) => {
    const [user, setUser] = useState<User>();
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          setLoading(true);
          const data = await getUserByID(accessToken, idUser);
          setUser(data.data);
          setLoading(false);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchUsers();
    }, [accessToken]);
  
    return { user, loading };
  };
