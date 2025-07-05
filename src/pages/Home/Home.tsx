import FamilyImage from '@assets/family.png';
import Button from '../../components/Button';
import Inputfield from '../../components/Inputfield';
import useLazyUser from '../../hooks/useLazyUser';
import styles from './Home.module.scss';
import { useNavigate } from 'react-router-dom';
import type { NavigationState } from '../../types/custom/navigation';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { fetchUser, user, loading, error } = useLazyUser();

  const handleQuote = async () => {
    const userData = await fetchUser();

    if (!userData) return;

    navigate('/pricing', { 
      state: { 
        userData,
        timestamp: new Date().toISOString()
      } satisfies NavigationState
    });
  }

  return (
    <div className={styles.home}>
      <div className={styles.container}>
        <img src={FamilyImage} alt="Creado para ti y tu familia" className={styles.image} />

        <div className={styles.content}>
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

          <form className={styles.form} onSubmit={(e) => {
            e.preventDefault();
            handleQuote();
          }}>
            <div className={styles.inputs}>
              <Inputfield name="document" type="number" label="Nro. de documento" maxLength={8} />
              <Inputfield name="phone" type="number" label="Celular" maxLength={9} />
            </div>
            <div className={styles.tyc}>
              <div className={styles.tyc__policy}>
                <input type='radio' />
                <label>Acepto la Política de Privacidad</label>
              </div>
              <div className={styles.tyc__policy}>
                <input type='radio' />
                <label>Acepto la Política Comunicaciones Comerciales</label>
              </div>
              <p className={styles.tyc__link}>Aplican Términos y Condiciones.</p>
            </div>
            <Button type='submit' text="Cotiza aqui" />
          </form>
        </div>
      </div>
    </div>
  )
}

export default Home;