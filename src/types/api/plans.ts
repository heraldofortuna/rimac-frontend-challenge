export type Plans = Array<Plan>;

export type Plan = {
  id: string;
  name: string;
  price: number;
  description: string[];
  age: number;
};

export type PlansResponse = {
  list: {
    name: string;
    price: number;
    description: string[];
    age: number;
  }[];
}