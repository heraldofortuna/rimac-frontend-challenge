import styles from "./Loader.module.scss";

const Loader: React.FC = () => {
  return (
    <div className={styles.loaderContainer} data-testid="loader-container">
      <div className={styles.loader} data-testid="loader-element"></div>
    </div>
  );
};

export default Loader;