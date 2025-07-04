import styles from './Footer.module.scss';
import RimacLogo from '@assets/logo-white.svg';
import RimacMobileLogo from '@assets/logo-mobile-white.svg';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <img src={RimacMobileLogo} alt="Mobile Rimac Logo" className={styles.logoMobile} />
        <img src={RimacLogo} alt="Desktop Rimac Logo" className={styles.logoDesktop} />
        <span className={styles.separator}></span>
        <p className={styles.text}>© 2023 RIMAC Seguros y Reaseguros.</p>
      </div>
    </footer>
  );
};

export default Footer;
