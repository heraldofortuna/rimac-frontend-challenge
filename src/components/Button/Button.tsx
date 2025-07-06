import type { IButtonProps } from '../../types/components/button';
import styles from './Button.module.scss';

const Button: React.FC<IButtonProps> = ({
  type = "button",
  text,
  size = "medium",
  color = "black",
  isDisabled = false,
  isLoading = false,
  loadingText = "Cargando",
  onClick = () => {}
}) => {
  const buttonClass = `${styles.button} ${styles[size]} ${styles[color]} ${
    isDisabled ? styles.disabled : ''
  } ${isLoading ? styles.loading : ''}`;
  
  return (
    <button 
      type={type} 
      disabled={isDisabled || isLoading}
      onClick={isDisabled || isLoading ? undefined : onClick} 
      className={buttonClass}
    >
      {isLoading ? (
        <>
          <span className={styles.loader}></span>
          {loadingText}
        </>
      ) : (
        text
      )}
    </button>
  )
}

export default Button;