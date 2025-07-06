export interface User {
  name: string;
  lastName: string;
  age: number;
  document: string;
  phone: string;
}

export type UserResponse = {
  name: string;
  lastName: string;
  birthDay: string;
};
