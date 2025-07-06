import type { PlansResponse } from "../types/api/plans";
import { apiService } from "./api.service";

export const PlansService = {
  async getPlans(): Promise<PlansResponse> {
    try {
      return await apiService.get<PlansResponse>("/plans.json");
    } catch (error) {
      console.error("Error fetching plans:", error);
      throw error;
    }
  },
};
