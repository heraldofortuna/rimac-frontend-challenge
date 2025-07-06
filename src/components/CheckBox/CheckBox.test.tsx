import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CheckBox from "./CheckBox";
import type { ICheckBoxProps } from "../../types/components/checkbox";

describe("CheckBox component", () => {
  const defaultProps: ICheckBoxProps = {
    label: "Test Checkbox",
    checked: false,
    onChange: vi.fn(),
  };

  const renderCheckBox = (props: Partial<ICheckBoxProps> = {}) => {
    return render(<CheckBox {...defaultProps} {...props} />);
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly with default props", () => {
    renderCheckBox();
    
    const checkbox = screen.getByLabelText("Test Checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute("type", "checkbox");
    expect(checkbox).not.toBeChecked();
    expect(screen.getByText("Test Checkbox")).toBeInTheDocument();
  });

  it("renders as checked when checked prop is true", () => {
    renderCheckBox({ checked: true });
    
    const checkbox = screen.getByLabelText("Test Checkbox");
    expect(checkbox).toBeChecked();
  });

  it("calls onChange handler with correct value when clicked", async () => {
    const handleChange = vi.fn();
    renderCheckBox({ onChange: handleChange });
    
    const checkbox = screen.getByLabelText("Test Checkbox");
    fireEvent.click(checkbox);
    
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it("toggles checked state when clicked", async () => {
    const handleChange = vi.fn();
    const { rerender } = renderCheckBox({ onChange: handleChange });
    
    const checkbox = screen.getByLabelText("Test Checkbox");
    
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledWith(true);

    rerender(<CheckBox {...defaultProps} checked={true} onChange={handleChange} />);

    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledWith(false);
  });

  it("renders correctly with custom label", () => {
    renderCheckBox({ label: "Custom Label" });
    
    expect(screen.getByText("Custom Label")).toBeInTheDocument();
    expect(screen.getByLabelText("Custom Label")).toBeInTheDocument();
  });

  it("matches snapshot when unchecked", () => {
    const { asFragment } = renderCheckBox();
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches snapshot when checked", () => {
    const { asFragment } = renderCheckBox({ checked: true });
    expect(asFragment()).toMatchSnapshot();
  });
});