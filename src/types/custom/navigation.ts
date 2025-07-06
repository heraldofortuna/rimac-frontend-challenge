import type { User } from "../api/user";

export interface NavigationState {
  userData?: User;
  summaryData?: Summary;
  timestamp: string;
}

export type Summary = {
  name: string;
  lastName: string;
  age: number;
  document: string;
  phone: string;
  plan: {
    id: string;
    icon: string;
    discountPrice: number;
    name: string;
    price: number;
    description: string[];
    age: number;
  }
}