import type { User } from "../api/user";

export interface NavigationState {
  userData: User;
  timestamp: string;
}