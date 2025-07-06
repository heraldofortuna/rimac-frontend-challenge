import { useState, useEffect } from "react";
import type { PlanResponse, Plans } from "../types/api/plans";
import { PlansService } from "../services/plans.service";
import HomeIcon from "@assets/home.svg";
import HospitalIcon from "@assets/hospital.svg";

export const usePlans = () => {
  const [plans, setPlans] = useState<Plans | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
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
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  return { plans, loading, error };
};