import { getDateAndTime } from './getDateAndTime';

describe('getDateAndTime', () => {
     it('should handle different dates correctly', () => {
        const date = new Date('2022-01-01T00:00:00');
        const result = getDateAndTime(date);
        expect(result).toBe('01  jan  2022 - 00:00');
    });

    it('should handle invalid date input gracefully', () => {
        const date = new Date('invalid-date');
        const result = getDateAndTime(date);
        expect(result).toBe('Invalid Date - Invalid Date');
    });
});