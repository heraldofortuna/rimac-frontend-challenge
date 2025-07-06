export type Plans = Array<Plan>;

export type Plan = {
  id: string;
  icon: string;
  discountPrice: number;
  name: string;
  price: number;
  description: string[];
  age: number;
};

export type PlansResponse = {
  list: PlanResponse[];
};

export type PlanResponse = {
  name: string;
  price: number;
  description: string[];
  age: number;
};
