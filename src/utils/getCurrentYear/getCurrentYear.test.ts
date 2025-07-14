import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import getCurrentYear from './getCurrentYear';

describe('Current year functions', () => {
  beforeEach(() => {
    const mockDate = new Date(2023, 0, 1);
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('getCurrentYear', () => {
    it('should return current year as number', () => {
      const result = getCurrentYear();
      expect(result).toBe(2023);
      expect(typeof result).toBe('number');
    });
  });

  describe('Validation with real date', () => {
    it('should return the correct current year', () => {
      vi.useRealTimers();
      const expectedYear = new Date().getFullYear();
      expect(getCurrentYear()).toBe(expectedYear);
    });
  });
});