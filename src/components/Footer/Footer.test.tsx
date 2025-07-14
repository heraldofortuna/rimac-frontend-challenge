import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";
import styles from "./Footer.module.scss";
import getCurrentYear from "../../utils/getCurrentYear/getCurrentYear";

vi.mock("@assets/logo-white.svg", () => ({
  default: "rimac-logo-white.svg",
}));

vi.mock("@assets/logo-mobile-white.svg", () => ({
  default: "rimac-logo-mobile-white.svg",
}));

describe("Footer Component", () => {
  let container: HTMLElement;
  let footer: HTMLElement;

  beforeEach(() => {
    const { container: renderedContainer } = render(<Footer />);
    container = renderedContainer;
    footer = screen.getByRole("contentinfo");
  });

  it("renders the footer element with correct class", () => {
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass(styles.footer);
  });

  it("renders the container div with correct class", () => {
    const containerDiv = footer.firstElementChild;
    expect(containerDiv).toHaveClass(styles.container);
  });

  it("renders the mobile logo with correct attributes", () => {
    const mobileLogo = screen.getByAltText("Mobile Rimac Logo");
    expect(mobileLogo).toBeInTheDocument();
    expect(mobileLogo).toHaveAttribute("src", "rimac-logo-mobile-white.svg");
    expect(mobileLogo).toHaveClass(styles["logo--mobile"]);
  });

  it("renders the desktop logo with correct attributes", () => {
    const desktopLogo = screen.getByAltText("Desktop Rimac Logo");
    expect(desktopLogo).toBeInTheDocument();
    expect(desktopLogo).toHaveAttribute("src", "rimac-logo-white.svg");
    expect(desktopLogo).toHaveClass(styles["logo--desktop"]);
  });

  it("renders the separator", () => {
    const separator = container.querySelector(`.${styles.separator}`);
    expect(separator).toBeInTheDocument();
  });

  it("displays the correct copyright text", () => {
    const currentYear = getCurrentYear();
    const copyrightText = screen.getByText(
      `© ${currentYear} RIMAC Seguros y Reaseguros.`,
    );
    expect(copyrightText).toBeInTheDocument();
    expect(copyrightText).toHaveClass(styles.text);
  });

  it("matches snapshot", () => {
    const { asFragment } = render(<Footer />);
    expect(asFragment()).toMatchSnapshot();
  });
});
