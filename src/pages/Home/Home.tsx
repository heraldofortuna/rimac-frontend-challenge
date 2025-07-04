import FamilyImage from '@assets/family.png';
import styles from './Home.module.scss';

const Home: React.FC = () => {
  return (
    <div className={styles.home}>
      <div className={styles.container}>
        <img src={FamilyImage} alt="Creado para ti y tu familia" className={styles.image} />

        <div className={styles.hero}>
          <div className={styles.hero__text}>
            <p className={styles.hero__text__label}>Seguro Salud Flexible</p>
            <div className={styles.hero__text__content}>
              <h1 className={styles.hero__text__content__title}>Creado para ti y tu familia</h1>
              <p className={styles.hero__text__content__description}>Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra asesoría. 100% online.</p>
            </div>
          </div>
          <img src={FamilyImage} alt="Creado para ti y tu familia" className={styles.hero__image} />
        </div>

        <span className={styles.separator}></span>

        <p className={styles.description}>Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra asesoría, 100% online.</p>

        <form>
        </form>
      </div>
    </div>
  )
}

export default Home;