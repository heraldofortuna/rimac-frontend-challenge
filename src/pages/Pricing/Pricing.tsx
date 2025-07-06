import BackArrowBlueIcon from '@assets/back-arrow-blue.svg';
import BackArrowGrayIcon from '@assets/back-arrow-gray.svg';
import PersonalOptionIcon from '@assets/personal-option.svg';
import OtherPersonOptionIcon from '@assets/other-person-option.svg';
import styles from './Pricing.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { NavigationState } from '../../types/custom/navigation';
import type { User } from '../../types/api/user';
import { usePlans } from '../../hooks/usePlans';
import Card from '../../components/Card';
import Button from '../../components/Button';

const Pricing: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { plans, loading: plansLoading, error: plansError } = usePlans();
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const state = location.state as NavigationState | undefined;

    if (!state?.userData) {
      navigate('/');
      return;
    }

    setUserData(state.userData);
    setIsLoading(false);
  }, [location.state, navigate]);

  const isDataReady = !isLoading && !plansLoading && userData && plans;

  if (isLoading || plansLoading) {
    return <div className={styles.loading}>Cargando datos...</div>;
  }

  if (!userData) {
    return <div className={styles.error}>No se encontraron datos del usuario</div>;
  }

  if (plansError) {
    return <div className={styles.error}>Error al cargar los planes: {plansError.message}</div>;
  }

  if (!plans || plans.length === 0) {
    return <div className={styles.error}>No hay planes disponibles</div>;
  }

  return (
    <div className={styles.pricing}>
      <div className={styles.container}>
        <div className={styles.stepper}>
          <div className={styles['stepper--mobile']}>
            <a href="/">
              <img src={BackArrowGrayIcon} alt="Volver" />
            </a>
            <p className={styles.stepper__text}>Paso 1 de 2</p>
            <div className={styles.stepper__bar}></div>
          </div>

          <div className={styles['stepper--desktop']}>
            <div className={`${styles['stepper--desktop__step']} ${styles['stepper--desktop__step--first']}`}>
              <span className={`${styles['stepper--desktop__step__number']} ${styles['stepper--desktop__step__number--first']}`}>1</span>
              <p>Planes y coberturas</p>
            </div>
            <span className={styles['stepper--desktop__line']}></span>
            <div className={`${styles['stepper--desktop__step']} ${styles['stepper--desktop__step--second']}`}>
              <span className={styles['stepper--desktop__step__number']}>2</span>
              <p>Resumen</p>
            </div>
          </div>
        </div>

        <a href="/" className={styles.backButton}>
          <img src={BackArrowBlueIcon} alt="Volver" />
          <p className={styles.backButton__text}>Volver</p>
        </a>

        <div className={styles.content}>
          <div className={styles.content__text}>
            <h1 className={styles.content__text__title}>{userData.name} ¿Para quién deseas cotizar?</h1>
            <p className={styles.content__text__description}>Selecciona la opción que se ajuste más a tus necesidades.</p>
          </div>
          <div></div>
        </div>

        <section className={styles.options}>
          <Card>
            <div className={styles.option}>
              <div className={styles.option__header}>
                <img src={PersonalOptionIcon} alt="Cotiza tu seguro de salud y agrega familiares si así lo deseas." className={styles.option__header__icon} />
                <h3 className={styles.option__header__text}>Para mi</h3>
              </div>
              <p className={styles.option__text}>Cotiza tu seguro de salud y agrega familiares si así lo deseas.</p>
            </div>
          </Card>
          <Card>
            <div className={styles.option}>
              <div className={styles.option__header}>
                <img src={OtherPersonOptionIcon} alt="Realiza una cotización para uno de tus familiares o cualquier persona." className={styles.option__header__icon} />
                <h3 className={styles.option__header__text}>Para alguien más</h3>
              </div>
              <p className={styles.option__text}>Realiza una cotización para uno de tus familiares o cualquier persona.</p>
            </div>
          </Card>
        </section>

        {isDataReady && (
          <div className={styles.plansContainer}>
            <ul className={styles.plans}>
              {plans.map(plan => (
                <li key={plan.id} className={styles.plan}>
                  <Card>
                    <h3>{plan.name}</h3>
                    <div>
                      <p>Costo del plan</p>
                      <p>${plan.price} al mes</p>
                    </div>
                    <ul className={styles.plan__list}>
                      {plan.description.map(item => (
                        <li>
                          <div>
                            <p>{item}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <Button text="Seleccionar Plan" color='red' />
                  </Card>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Pricing;