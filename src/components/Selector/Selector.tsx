import type { SelectorProps } from "../../types/components/selector";
import Card from "../Card";
import styles from "./Selector.module.scss";

const Selector: React.FC<SelectorProps> = ({
  options,
  selectedOption,
  onSelect,
}) => {
  return (
    <div className={styles.selector}>
      {options.map((option) => (
        <Card
          key={option.id}
          isSelectable
          isSelected={selectedOption === option.id}
          onClick={() => onSelect(option.id)}
        >
          <div className={styles.option}>
            <div className={styles.option__header}>
              <img
                src={option.icon}
                alt={option.title}
                className={styles.option__header__icon}
              />
              <h3 className={styles.option__header__text}>{option.title}</h3>
            </div>
            <p className={styles.option__text}>{option.description}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Selector;
