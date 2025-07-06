import BackArrowBlueIcon from "@assets/back-arrow-blue.svg";
import BackArrowGrayIcon from "@assets/back-arrow-gray.svg";
import PersonalOptionIcon from "@assets/personal-option.svg";
import OtherPersonOptionIcon from "@assets/other-person-option.svg";
import styles from "./Pricing.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { NavigationState } from "../../types/custom/navigation";
import type { User } from "../../types/api/user";
import { useLazyPlans } from "../../hooks/useLazyPlans";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Selector from "../../components/Selector";
import type { Plan, Plans } from "../../types/api/plans";

const Pricing: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { fetchPlans } = useLazyPlans();
  const [userData, setUserData] = useState<User | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedPlans, setSelectedPlans] = useState<Plans | null>(null);
  const [isForSomeone, setIsForSomeone] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const options = [
    {
      id: "for-me",
      title: "Para mí",
      description:
        "Cotiza tu seguro de salud y agrega familiares si así lo deseas.",
      icon: PersonalOptionIcon,
    },
    {
      id: "for-someone",
      title: "Para alguien más",
      description:
        "Realiza una cotización para uno de tus familiares o cualquier persona.",
      icon: OtherPersonOptionIcon,
    },
  ];

  const handlePlanClick = (plan: Plan) => {
    if (!userData) return;

    const summaryData = {
      ...userData,
      plan: {
        ...plan,
        isForSomeone: isForSomeone,
      },
    };

    navigate("/summary", {
      state: {
        summaryData,
        timestamp: new Date().toISOString(),
      } satisfies NavigationState,
    });
  };

  useEffect(() => {
    const state = location.state as NavigationState | undefined;

    if (!state?.userData) {
      navigate("/");
      return;
    }

    setUserData(state.userData);
    setIsLoading(false);
  }, [location.state, navigate]);

  useEffect(() => {
    const loadPlans = async () => {
      const plans = await fetchPlans();

      if (plans && userData) {
        const selectedPlans = plans.filter(
          (plan: Plan) => userData.age < plan.age,
        );
        setSelectedPlans(selectedPlans);
      }
    };

    if (selectedOption) {
      setIsForSomeone(selectedOption === "for-someone");
      loadPlans();
    }
  }, [selectedOption, fetchPlans, userData]);

  if (isLoading) {
    return <div className={styles.loading}>Cargando datos...</div>;
  }

  if (!userData) {
    return (
      <div className={styles.error}>No se encontraron datos del usuario</div>
    );
  }

  return (
    <>
      <div className={styles.stepper}>
        <div className={styles["stepper--mobile"]}>
          <a href="/" className={styles["stepper--mobile__icon"]}>
            <img src={BackArrowGrayIcon} alt="Volver" />
          </a>
          <p className={styles["stepper--mobile__text"]}>Paso 1 de 2</p>
          <div className={styles["stepper--mobile__bar"]}>
            <span className={styles["stepper--mobile__bar--fill"]}></span>
          </div>
        </div>

        <div className={styles["stepper--desktop"]}>
          <div
            className={`${styles["stepper--desktop__step"]} ${styles["stepper--desktop__step--first"]}`}
          >
            <span
              className={`${styles["stepper--desktop__step__number"]} ${styles["stepper--desktop__step__number--first"]}`}
            >
              1
            </span>
            <p>Planes y coberturas</p>
          </div>
          <span className={styles["stepper--desktop__line"]}></span>
          <div
            className={`${styles["stepper--desktop__step"]} ${styles["stepper--desktop__step--second"]}`}
          >
            <span
              className={`${styles["stepper--desktop__step__number"]} ${styles["stepper--desktop__step__number--second"]}`}
            >
              2
            </span>
            <p>Resumen</p>
          </div>
        </div>
      </div>

      <div className={styles.pricing}>
        <div className={styles.container}>
          <a href="/" className={styles.backButton}>
            <img src={BackArrowBlueIcon} alt="Volver" />
            <p className={styles.backButton__text}>Volver</p>
          </a>

          <div className={styles.content}>
            <div className={styles.text}>
              <h1 className={styles.text__title}>
                {userData.name} ¿Para quién deseas cotizar?
              </h1>
              <p className={styles.text__description}>
                Selecciona la opción que se ajuste más a tus necesidades.
              </p>
            </div>

            <Selector
              options={options}
              selectedOption={selectedOption}
              onSelect={setSelectedOption}
            />
          </div>

          {selectedPlans && (
            <div className={styles.plansContainer}>
              <ul className={styles.plans}>
                {selectedPlans.map((plan) => (
                  <li key={plan.id} className={styles.planElement}>
                    <Card>
                      <div className={styles.plan}>
                        <div className={styles.plan__header}>
                          <div className={styles.plan__header__title}>
                            <h3 className={styles.plan__header__title__text}>
                              {plan.name}
                            </h3>
                            <img src={plan.icon} alt={plan.name} />
                          </div>
                          <div className={styles.plan__header__cost}>
                            <p className={styles.plan__header__cost__label}>
                              Costo del plan
                            </p>
                            {isForSomeone ? (
                              <p className={styles.plan__header__cost__past}>
                                ${plan.price} antes
                              </p>
                            ) : (
                              <></>
                            )}
                            <p className={styles.plan__header__cost__value}>
                              ${isForSomeone ? plan.discountPrice : plan.price}{" "}
                              al mes
                            </p>
                          </div>
                        </div>
                        <span className={styles.plan__separator}></span>
                        <ul className={styles.plan__list}>
                          {plan.description.map((item) => (
                            <li
                              key={item}
                              className={styles.plan__list__element}
                            >
                              <p>{item}</p>
                            </li>
                          ))}
                        </ul>
                        <div className={styles.plan__button}>
                          <Button
                            text="Seleccionar Plan"
                            color="red"
                            onClick={() => handlePlanClick(plan)}
                          />
                        </div>
                      </div>
                    </Card>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Pricing;
