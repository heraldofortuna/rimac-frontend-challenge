import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Card from "./Card";
import type { ICardProps } from "../../types/components/card";
import styles from "./Card.module.scss";

describe("Card component", () => {
  const defaultProps: ICardProps = {
    children: <div>Card Content</div>,
    isSelectable: false,
    isSelected: false,
    onClick: vi.fn(),
  };

  const renderCard = (props: Partial<ICardProps> = {}) => {
    return render(<Card {...defaultProps} {...props} />);
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly with default props", () => {
    renderCard();
    
    const card = screen.getByText("Card Content").parentElement;
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass(styles.card);
    expect(card).not.toHaveClass(styles.selectable);
    expect(card).not.toHaveClass(styles.selected);
    
    expect(screen.queryByAltText("Card seleccionado")).not.toBeInTheDocument();
    expect(screen.queryByTestId("selection-circle")).not.toBeInTheDocument();
  });

  it("renders selectable card correctly", () => {
    renderCard({ isSelectable: true });
    
    const card = screen.getByText("Card Content").parentElement;
    expect(card).toHaveClass(styles.card);
    expect(card).toHaveClass(styles.selectable);
    expect(card).not.toHaveClass(styles.selected);
    
    const circle = screen.getByTestId("selection-circle");
    expect(circle).toBeInTheDocument();
    expect(circle).toHaveClass(styles.card__circle);
  });

  it("renders selected card correctly", () => {
    renderCard({ isSelectable: true, isSelected: true });
    
    const card = screen.getByText("Card Content").parentElement;
    expect(card).toHaveClass(styles.card);
    expect(card).toHaveClass(styles.selectable);
    expect(card).toHaveClass(styles.selected);
    
    const checkIcon = screen.getByAltText("Card seleccionado");
    expect(checkIcon).toBeInTheDocument();
    expect(checkIcon).toHaveClass(styles.card__check);
  });

  it("calls onClick handler when clicked", async () => {
    const handleClick = vi.fn();
    renderCard({ isSelectable: true, onClick: handleClick });
    
    const card = screen.getByText("Card Content").parentElement;
    await fireEvent.click(card!);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when not selectable", async () => {
    const handleClick = vi.fn();
    renderCard({ isSelectable: false, onClick: handleClick });
    
    const card = screen.getByText("Card Content").parentElement;
    fireEvent.click(card!);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it("applies correct classes based on props", () => {
    const { rerender } = renderCard();
    let card = screen.getByText("Card Content").parentElement;
    
    expect(card).toHaveClass(styles.card);
    expect(card).not.toHaveClass(styles.selectable);
    expect(card).not.toHaveClass(styles.selected);
    
    rerender(<Card {...defaultProps} isSelectable={true} />);
    card = screen.getByText("Card Content").parentElement;
    expect(card).toHaveClass(styles.card);
    expect(card).toHaveClass(styles.selectable);
    expect(card).not.toHaveClass(styles.selected);

    rerender(<Card {...defaultProps} isSelectable={true} isSelected={true} />);
    card = screen.getByText("Card Content").parentElement;
    expect(card).toHaveClass(styles.card);
    expect(card).toHaveClass(styles.selectable);
    expect(card).toHaveClass(styles.selected);
  });

  it("matches snapshot for non-selectable card", () => {
    const { asFragment } = renderCard();
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches snapshot for selectable card", () => {
    const { asFragment } = renderCard({ isSelectable: true });
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches snapshot for selected card", () => {
    const { asFragment } = renderCard({ isSelectable: true, isSelected: true });
    expect(asFragment()).toMatchSnapshot();
  });
});