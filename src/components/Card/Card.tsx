import type { ICardProps } from '../../types/components/card';
import styles from './Card.module.scss';

const Card: React.FC<ICardProps> = ({ children }) => {
  return (
    <div className={styles.card}>
      {children}
    </div>
  );
};

export default Card;
