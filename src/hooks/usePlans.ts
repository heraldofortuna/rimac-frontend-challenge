import { useEffect, useState } from "react";
import type { Plans } from "../types/api/plans";
import { PlansService } from "../services/plans.service";

export const usePlans = () => {
  const [plans, setPlans] = useState<Plans | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const plansData = await PlansService.getPlans();
        const plansList = plansData.list.map((plan: any, idx: number) => ({ id: String(idx), ...plan }));
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
