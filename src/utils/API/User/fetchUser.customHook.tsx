import { useState, useEffect } from 'react';
import { AuthContext, User } from '../../../Interface/User/user.interface';
import { getAllUsers, getUserByID } from './user.service';
import { getFromLocalStorage } from '../../localStorage/localStorage.service';

const storedContext: AuthContext = getFromLocalStorage('authContext');
const accessToken = storedContext.accessToken;

export const fectAllUser = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await getAllUsers();
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

export const fecthUserById = () => {
    const [user, setUser] = useState<User>();
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          setLoading(true);
          const data = await getUserByID();
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
