import type { IInputFieldProps } from '../../types/components/inputfield';
import styles from './InputField.module.scss';

const InputField: React.FC<IInputFieldProps> = ({ name, type, label, maxLength }) => {
  return (
    <div className={styles.inputfield}>
      <label htmlFor={name} className={styles.inputfield__label}>{label}</label>
      <input name={name} maxLength={maxLength} className={styles.inputfield__input} type={type} />
    </div>
  )
}

export default InputField;