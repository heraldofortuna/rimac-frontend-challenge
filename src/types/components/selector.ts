export interface SelectorProps {
  options: SelectorOption[];
  selectedOption?: string | null;
  onSelect: (id: string) => void;
}

interface SelectorOption {
  id: string;
  title: string;
  description: string;
  icon: string;
}