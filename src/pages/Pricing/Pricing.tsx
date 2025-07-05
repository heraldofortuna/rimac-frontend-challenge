import BackArrowBlueIcon from '@assets/back-arrow-blue.svg';
import BackArrowGrayIcon from '@assets/back-arrow-gray.svg';
import styles from './Pricing.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { NavigationState } from '../../types/custom/navigation';
import type { User } from '../../types/api/user';

const Pricing: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
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

  if (isLoading) {
    return <div className={styles.loading}>Cargando...</div>;
  }

  if (!userData) {
    return <div className={styles.error}>No se encontraron datos del usuario</div>;
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
      </div>
    </div>
  )
}

export default Pricing;