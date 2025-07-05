import type { UserResponse } from '../types/api/user';
import { apiService } from './api.service';

export const UserService = {
  async getUser(): Promise<UserResponse> {
    try {
      return await apiService.get<UserResponse>('/user.json');
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }
};