import RimacLogo from "@assets/logo-red.svg";
import PhoneIcon from "@assets/phone.svg";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <img src={RimacLogo} alt="Rimac Logo" className={styles.logo} />
        <div className={styles.contact}>
          <p className={styles.contact__text}>¡Compra por este medio!</p>
          <div className={styles.contact__phone}>
            <span className={styles.contact__phone__icon}>
              <img src={PhoneIcon} alt="(01) 411 6001" />
            </span>
            <p className={styles.contact__phone__text}>(01) 411 6001</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
