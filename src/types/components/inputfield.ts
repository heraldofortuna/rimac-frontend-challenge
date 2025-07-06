export interface IInputFieldProps {
  name: string;
  type?: string;
  label: string;
  maxLength?: number;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}