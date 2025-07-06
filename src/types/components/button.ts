export interface IButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  text: string;
  size?: "small" | "medium" | "large";
  color?: "black" | "red";
  isDisabled: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}