import { useState, useCallback } from "react";
import type { PlanResponse, Plans } from "../types/api/plans";
import { PlansService } from "../services/plans.service";
import HomeIcon from "@assets/home.svg";
import HospitalIcon from "@assets/hospital.svg";

export const useLazyPlans = () => {
  const [plans, setPlans] = useState<Plans | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchPlans = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const plansData = await PlansService.getPlans();
      const plansList = plansData.list.map(
        (plan: PlanResponse, idx: number) => ({
          id: String(idx),
          icon: plan.name.includes("Clínica") ? HospitalIcon : HomeIcon,
          discountPrice: 0.95 * plan.price,
          ...plan,
        }),
      );
      setPlans(plansList);
      return plansList;
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { fetchPlans, plans, loading, error };
};
