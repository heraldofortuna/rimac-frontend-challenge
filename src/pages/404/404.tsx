import Button from "../../components/Button";
import styles from "./404.module.scss";

const NotFound: React.FC = () => {
  return (
    <div className={styles.notfound}>
      <div className={styles.container}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.subtitle}>Not Found</p>
        <p className={styles.description}>
          The resource requested could not be found on this server!
        </p>
        <a href="/">
          <Button text="Volver" size="small" />
        </a>
      </div>
    </div>
  );
};

export default NotFound;
