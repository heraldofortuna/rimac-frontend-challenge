import BackArrowBlueIcon from '@assets/back-arrow-blue.svg';
import BackArrowGrayIcon from '@assets/back-arrow-gray.svg';
import styles from './Pricing.module.scss';

const Pricing: React.FC = () => {
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
            <h1 className={styles.content__text__title}>Rocío ¿Para quién deseas cotizar?</h1>
            <p className={styles.content__text__description}>Selecciona la opción que se ajuste más a tus necesidades.</p>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default Pricing;