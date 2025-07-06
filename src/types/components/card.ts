import type { ReactNode } from "react";

export interface ICardProps {
  children: ReactNode;
  isSelectable?: boolean;
  isSelected?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
}
