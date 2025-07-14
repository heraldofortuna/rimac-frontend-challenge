import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import calculateAge from "./calculateAge";

describe("calculateAge", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2023, 6, 15));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should calculate age correctly when birthday is today", () => {
    expect(calculateAge("15-07-1991")).toBe(32);
  });

  it("should work correctly for very old ages", () => {
    expect(calculateAge("15-07-1921")).toBe(102);
  });

  it("should work correctly for newborns", () => {
    expect(calculateAge("15-07-2023")).toBe(0);

    vi.setSystemTime(new Date(2023, 6, 16));
    expect(calculateAge("15-07-2023")).toBe(0);
  });

  it("should throw error for non-existent date", () => {
    expect(() => calculateAge("31-02-2000")).toThrow(
      "Fecha de nacimiento inválida",
    );
  });

  it("should return 0 for empty input", () => {
    expect(calculateAge("")).toBe(0);
  });

  it("should throw error for invalid date format", () => {
    expect(() => calculateAge("invalid-date")).toThrow(
      "Fecha de nacimiento inválida",
    );
  });

  it("should calculate age correctly when birthday has passed this year", () => {
    expect(calculateAge("10-05-1990")).toBe(33);
  });

  it("should handle leap year birthdays correctly", () => {
    vi.setSystemTime(new Date("2023-02-28"));
    expect(calculateAge("29-02-2000")).toBe(22);
  });

  it("should work correctly for people born on December 31st", () => {
    vi.setSystemTime(new Date("2023-12-30"));
    expect(calculateAge("31-12-1990")).toBe(32);
  });

  describe("Month validation", () => {
    it("should throw error for month 0", () => {
      expect(() => calculateAge("15-00-2000")).toThrow(
        "Fecha de nacimiento inválida",
      );
    });

    it("should throw error for month 13", () => {
      expect(() => calculateAge("15-13-2000")).toThrow(
        "Fecha de nacimiento inválida",
      );
    });

    it("should accept month 1 (January)", () => {
      expect(() => calculateAge("15-01-2000")).not.toThrow();
    });

    it("should accept month 12 (December)", () => {
      expect(() => calculateAge("15-12-2000")).not.toThrow();
    });
  });

  describe("Day validation", () => {
    it("should throw error for day 0", () => {
      expect(() => calculateAge("00-06-2000")).toThrow(
        "Fecha de nacimiento inválida",
      );
    });

    it("should throw error for day 32", () => {
      expect(() => calculateAge("32-06-2000")).toThrow(
        "Fecha de nacimiento inválida",
      );
    });

    it("should accept day 1", () => {
      expect(() => calculateAge("01-06-2000")).not.toThrow();
    });

    it("should accept day 31", () => {
      expect(() => calculateAge("31-07-2000")).not.toThrow();
    });
  });

  describe("Year validation", () => {
    it("should throw error for year 1899", () => {
      expect(() => calculateAge("15-06-1899")).toThrow(
        "Fecha de nacimiento inválida",
      );
    });

    it("should throw error for future year (2024)", () => {
      expect(() => calculateAge("15-06-2024")).toThrow(
        "Fecha de nacimiento inválida",
      );
    });

    it("should accept year 1900", () => {
      expect(() => calculateAge("15-06-1900")).not.toThrow();
    });

    it("should accept current year (2023)", () => {
      expect(() => calculateAge("15-06-2023")).not.toThrow();
    });

    it("should throw error for year 0", () => {
      expect(() => calculateAge("15-06-0000")).toThrow(
        "Fecha de nacimiento inválida",
      );
    });

    it("should throw error for negative year", () => {
      expect(() => calculateAge("15-06--100")).toThrow(
        "Fecha de nacimiento inválida",
      );
    });
  });

  describe("Combined invalid cases", () => {
    it("should throw error for all invalid values", () => {
      expect(() => calculateAge("00-00-1899")).toThrow(
        "Fecha de nacimiento inválida",
      );
    });

    it("should throw error for invalid day and month", () => {
      expect(() => calculateAge("32-13-2000")).toThrow(
        "Fecha de nacimiento inválida",
      );
    });

    it("should throw error for invalid month and year", () => {
      expect(() => calculateAge("15-00-3000")).toThrow(
        "Fecha de nacimiento inválida",
      );
    });
  });

  describe('calculateAge - Edge Cases for Age Calculation', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return 0 when birth date is in the future (same year)', () => {
    vi.setSystemTime(new Date(2023, 6, 15));
    expect(calculateAge('16-07-2023')).toBe(0);
  });
  
  it('should handle exactly 1 year old case', () => {
    vi.setSystemTime(new Date(2023, 6, 15));
    expect(calculateAge('15-07-2022')).toBe(1);
  });

  it('should handle day before 1 year birthday', () => {
    vi.setSystemTime(new Date(2023, 6, 14));
    expect(calculateAge('15-07-2022')).toBe(0);
  });
});
});
