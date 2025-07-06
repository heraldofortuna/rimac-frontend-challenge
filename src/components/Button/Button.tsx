import type { IButtonProps } from '../../types/components/button';
import styles from './Button.module.scss';

const Button: React.FC<IButtonProps> = ({
  type = "button",
  text,
  size = "medium",
  color = "black",
  isDisabled = false,
  onClick = () => {}
}) => {
  const buttonClass = `${styles.button} ${styles[size]} ${styles[color]}`;
  
  return (
    <button type={type} disabled={isDisabled} onClick={onClick} className={buttonClass}>
      {text}
    </button>
  )
}

export default Button;