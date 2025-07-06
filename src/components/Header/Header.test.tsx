import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "./Header";
import styles from "./Header.module.scss";

vi.mock("@assets/logo-red.svg", () => ({
  default: { src: "rimac-logo.svg" },
}));

vi.mock("@assets/phone.svg", () => ({
  default: { src: "phone-icon.svg" },
}));

describe("Header Component", () => {
  beforeEach(() => {
    render(<Header />);
  });

  it("renders the header element with correct class", () => {
    const header = screen.getByRole("banner");
    expect(header).toHaveClass(styles.header);
  });

  it("renders the container div with correct class", () => {
    const container = screen.getByRole("banner").firstChild;
    expect(container).toHaveClass(styles.container);
  });

  it("renders the Rimac logo with correct attributes", () => {
    const logo = screen.getByAltText("Rimac Logo");
    expect(logo).toHaveClass(styles.logo);
  });

  it("renders the contact section with correct structure", () => {
    const contactSection = screen.getByText(
      "¡Compra por este medio!",
    ).parentElement;
    expect(contactSection).toHaveClass(styles.contact);
  });

  it("displays the correct contact text", () => {
    const contactText = screen.getByText("¡Compra por este medio!");
    expect(contactText).toHaveClass(styles.contact__text);
  });

  it("renders the phone contact section correctly", () => {
    const phoneSection = screen.getByText("(01) 411 6001").parentElement;
    expect(phoneSection).toHaveClass(styles.contact__phone);
  });

  it("displays the phone icon with correct attributes", () => {
    const phoneIcon = screen.getByAltText("(01) 411 6001");
    const iconContainer = phoneIcon.closest("span");
    expect(iconContainer).toHaveClass(styles.contact__phone__icon);
  });

  it("displays the correct phone number", () => {
    const phoneNumber = screen.getByText("(01) 411 6001");
    expect(phoneNumber).toHaveClass(styles.contact__phone__text);
  });
});
