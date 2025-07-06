export interface ICardProps {
  children: any;
  isSelectable?: boolean;
  isSelected?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
}