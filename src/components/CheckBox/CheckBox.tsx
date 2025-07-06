import type { ICheckBoxProps } from '../../types/components/checkbox';
import styles from './CheckBox.module.scss';

const CheckBox: React.FC<ICheckBoxProps> = ({ 
  label,
  checked,
  onChange
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <label className={styles.checkbox}>
      <span>{label}</span>
      <input 
        type="checkbox" 
        checked={checked}
        onChange={handleChange}
        className={styles.checkbox__input} 
      />
      <span className={styles.checkbox__checkmark}></span>
    </label>
  );
};

export default CheckBox;