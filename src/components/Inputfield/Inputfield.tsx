import { useState, useEffect } from "react";
import type { IInputFieldProps } from "../../types/components/inputfield";
import styles from "./Inputfield.module.scss";

const Inputfield: React.FC<IInputFieldProps> = ({
  name,
  type = "text",
  label,
  maxLength,
  value: propValue = "",
  onChange,
}) => {
  const [value, setValue] = useState(propValue);

  useEffect(() => {
    setValue(propValue);
  }, [propValue]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (maxLength && newValue.length > maxLength) {
      const truncatedEvent = {
        ...event,
        target: {
          ...event.target,
          value: newValue.slice(0, maxLength)
        }
      };
      
      setValue(truncatedEvent.target.value);
      onChange?.(truncatedEvent);
      return;
    }

    setValue(newValue);
    onChange?.(event);
  };

  return (
    <div className={styles.inputfield}>
      <label htmlFor={name} className={styles.inputfield__label}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        maxLength={maxLength}
        autoComplete="off"
        onChange={handleChange}
        className={styles.inputfield__input}
      />
    </div>
  );
};

export default Inputfield;
