import styles from './Inputfield.module.scss';

interface IInputfieldProps {
  name: string;
  type: React.HTMLInputTypeAttribute;
  label: string;
  maxLength?: number;
}

const Inputfield: React.FC<IInputfieldProps> = ({ name, type, label, maxLength }) => {
  return (
    <div className={styles.inputfield}>
      <label htmlFor={name} className={styles.inputfield__label}>{label}</label>
      <input name={name} maxLength={maxLength} className={styles.inputfield__input} type={type} />
    </div>
  )
}

export default Inputfield;