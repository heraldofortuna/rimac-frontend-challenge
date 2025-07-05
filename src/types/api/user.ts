export interface User {
  name: string;
  lastName: string;
  age: number;
}

export type UserResponse = {
  name: string;
  lastName: string;
  birthDay: string;
};