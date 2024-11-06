import { formatAmount } from './formatAmount';

describe('formatAmount', () => {
    it('should format the amount correctly for positive values', () => {
        expect(formatAmount(123456)).toBe('R$ 1.234,56');
    });

    it('should format the amount correctly for zero', () => {
        expect(formatAmount(0)).toBe('R$ 0,00');
    });

    it('should format the amount correctly for small values', () => {
        expect(formatAmount(1)).toBe('R$ 0,01');
    });
});