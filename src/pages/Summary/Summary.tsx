import BackArrowBlueIcon from "@assets/back-arrow-blue.svg";
import BackArrowGrayIcon from "@assets/back-arrow-gray.svg";
import PeopleIcon from "@assets/people.svg";
import Card from "../../components/Card";
import Loader from "../../components/Loader";
import type { NavigationState, Summary } from "../../types/custom/navigation";
import styles from "./Summary.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const SummaryPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [summaryData, setSummaryData] = useState<Summary | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleReturn = () => {
    if (!summaryData) return;

    navigate("/pricing", {
      state: {
        userData: {
          name: summaryData.name,
          lastName: summaryData.lastName,
          age: summaryData.age,
          document: summaryData.document,
          phone: summaryData.phone,
        },
        timestamp: new Date().toISOString(),
      } satisfies NavigationState,
    });
  };

  useEffect(() => {
    const state = location.state as NavigationState | undefined;

    if (!state?.summaryData) {
      navigate("/");
      return;
    }

    setSummaryData(state.summaryData);
    setIsLoading(false);
  }, [location.state, navigate]);

  if (isLoading) {
    return <Loader />;
  }

  if (!summaryData) {
    navigate("/404");
    return;
  }

  return (
    <>
      <div className={styles.stepper}>
        <div className={styles["stepper--mobile"]}>
          <div
            className={styles["stepper--mobile__icon"]}
            onClick={handleReturn}
          >
            <img src={BackArrowGrayIcon} alt="Volver" />
          </div>
          <p className={styles["stepper--mobile__text"]}>Paso 2 de 2</p>
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

      <div className={styles.summary}>
        <div className={styles.container}>
          <div className={styles.backButton} onClick={handleReturn}>
            <img src={BackArrowBlueIcon} alt="Volver" />
            <p className={styles.backButton__text}>Volver</p>
          </div>

          <div className={styles.content}>
            <h1 className={styles.title}>Resumen del seguro</h1>
            <Card>
              <div className={styles.information}>
                <p className={styles.information__label}>
                  Precios calculados para:
                </p>
                <div className={styles.information__header}>
                  <img
                    src={PeopleIcon}
                    alt={`${summaryData.name} ${summaryData.lastName}`}
                  />
                  <h2>
                    {summaryData.name} {summaryData.lastName}
                  </h2>
                </div>
                <span className={styles.information__separator}></span>
                <div className={styles.information__item}>
                  <h3 className={styles.information__item__subtitle}>
                    Responsable de pago
                  </h3>
                  <p>DNI: {summaryData.document}</p>
                  <p>Celular: {summaryData.phone}</p>
                </div>
                <div className={styles.information__item}>
                  <h3 className={styles.information__item__subtitle}>
                    Plan elegido
                  </h3>
                  <p>{summaryData.plan.name}</p>
                  <p>
                    Costo del Plan: $
                    {summaryData.plan.isForSomeone
                      ? summaryData.plan.discountPrice
                      : summaryData.plan.price}{" "}
                    al mes
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default SummaryPage;
