import { useState } from 'react';
import { UserService } from '../services/user.service';
import type { User } from '../types/api/user';
import { calculateAge } from '../utils/calculateAge';

const useLazyUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const data = await UserService.getUser();
      const userData = { 
        name: data.name,
        lastName: data.lastName,
        age: calculateAge(data.birthDay)
      };
      setUser(userData);
      return userData;
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { fetchUser, user, loading, error };
};

export default useLazyUser;