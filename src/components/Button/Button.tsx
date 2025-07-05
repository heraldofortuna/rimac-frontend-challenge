import styles from './Button.module.scss';

interface IButtonProps {
  type: "button" | "submit" | "reset" | undefined;
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const Button: React.FC<IButtonProps> = ({ type, text, onClick }) => {
  return (
    <button type={type} onClick={onClick} className={styles.button}>
      {text}
    </button>
  )
}

export default Button;