export interface IButtonProps {
  type?: "button" | "submit" | "reset";
  text: string;
  size?: "small" | "medium" | "large";
  color?: "black" | "red";
  isDisabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}