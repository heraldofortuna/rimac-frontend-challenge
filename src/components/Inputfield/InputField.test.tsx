import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import type { IInputFieldProps } from "../../types/components/inputfield";
import InputField from "./InputField";

describe("InputField component", () => {
  const defaultProps: IInputFieldProps = {
    name: "test-input",
    type: "text",
    label: "Test Label",
    value: "",
    onChange: vi.fn(),
  };

  const renderInputField = (props: Partial<IInputFieldProps> = {}) => {
    return render(<InputField {...defaultProps} {...props} />);
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly with default props", () => {
    renderInputField();
    
    expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveAttribute("name", "test-input");
    expect(input).toHaveValue("");
  });

  it("displays the correct initial value", () => {
    renderInputField({ value: "initial value" });
    
    expect(screen.getByRole("textbox")).toHaveValue("initial value");
  });

  it("updates value when props change", async () => {
    const { rerender } = renderInputField({ value: "first" });
    
    expect(screen.getByRole("textbox")).toHaveValue("first");
    
    rerender(<InputField {...defaultProps} value="second" />);
    
    expect(screen.getByRole("textbox")).toHaveValue("second");
  });

  it("calls onChange handler when input changes", async () => {
    const handleChange = vi.fn();
    renderInputField({ onChange: handleChange });
    
    const input = screen.getByRole("textbox");
    await fireEvent.change(input, { target: { value: "new value" } });
    
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange.mock.calls[0][0].target.value).toBe("new value");
  });

  it("respects maxLength when provided", async () => {
    const handleChange = vi.fn();
    renderInputField({ maxLength: 5, onChange: handleChange });
    
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "123456" } });

    expect(input).toHaveValue("12345");
  
    expect(handleChange).toHaveBeenCalledTimes(1);
    const event = handleChange.mock.calls[0][0];
    expect(event.target.value).toBe("12345");
  });

  it("renders different input types correctly", () => {
    renderInputField({ type: "password" });
    
    expect(screen.getByLabelText("Test Label")).toHaveAttribute("type", "password");
  });

  it("has proper accessibility attributes", () => {
    renderInputField();
    
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("autoComplete", "off");
    expect(input).toHaveAttribute("id", "test-input");
  });

  it("matches snapshot with default props", () => {
    const { asFragment } = renderInputField();
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches snapshot with value and maxLength", () => {
    const { asFragment } = renderInputField({ 
      value: "test value", 
      maxLength: 20 
    });
    expect(asFragment()).toMatchSnapshot();
  });
});