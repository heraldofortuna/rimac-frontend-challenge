import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Selector from "./Selector";
import type { SelectorProps } from "../../types/components/selector";

describe("Selector component", () => {
  const mockOptions = [
    {
      id: "option1",
      title: "Option 1",
      description: "Description for option 1",
      icon: "/path/to/icon1.png",
    },
    {
      id: "option2",
      title: "Option 2",
      description: "Description for option 2",
      icon: "/path/to/icon2.png",
    },
  ];

  const mockOnSelect = vi.fn();

  const renderSelector = (props: Partial<SelectorProps> = {}) => {
    const defaultProps: SelectorProps = {
      options: mockOptions,
      selectedOption: null,
      onSelect: mockOnSelect,
    };

    return render(<Selector {...defaultProps} {...props} />);
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all options correctly", () => {
    renderSelector();

    mockOptions.forEach((option) => {
      expect(screen.getByText(option.title)).toBeInTheDocument();
      expect(screen.getByText(option.description)).toBeInTheDocument();
      const icon = screen.getByAltText(option.title);
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("src", option.icon);
    });
  });

  it("calls onSelect with the correct option id when an option is clicked", async () => {
    renderSelector();

    const firstOption = screen.getByText(mockOptions[0].title).closest("div");
    if (firstOption) {
      await fireEvent.click(firstOption);
    }

    expect(mockOnSelect).toHaveBeenCalledTimes(1);
    expect(mockOnSelect).toHaveBeenCalledWith(mockOptions[0].id);
  });

  it("does not mark any option as selected when selectedOption is null", () => {
    renderSelector({ selectedOption: null });

    mockOptions.forEach((option) => {
      const optionElement = screen.getByText(option.title).parentElement;
      expect(optionElement).not.toHaveClass("selected");
    });
  });

  it("renders nothing when options array is empty", () => {
    const { container } = renderSelector({ options: [] });
    expect(container.firstChild).toBeEmptyDOMElement();
  });
});