import type { ICardProps } from "../../types/components/card";
import CheckIcon from "@assets/check.svg";
import styles from "./Card.module.scss";

const Card: React.FC<ICardProps> = ({
  children,
  isSelectable = false,
  isSelected = false,
  onClick = () => {},
}) => {
  const cardClasses = `${styles.card} ${isSelectable ? styles.selectable : ""} ${isSelected ? styles.selected : ""}`;
  const handleClick = isSelectable ? onClick : undefined;

  return (
    <div className={cardClasses} onClick={handleClick}>
      {isSelectable ? (
        isSelected ? (
          <img
            src={CheckIcon}
            alt="Card seleccionado"
            className={styles.card__check}
          />
        ) : (
          <span className={styles.card__circle} data-testid="selection-circle"></span>
        )
      ) : (
        <></>
      )}
      {children}
    </div>
  );
};

export default Card;
