import { getDayAndMonth } from './getDayAndMonth';

describe('getDayAndMonth', () => {
    it('should return the correct day and month for a given date string', () => {
        expect(getDayAndMonth('2023-10-05')).toBe('05 de outubro');
        expect(getDayAndMonth('2023-01-15')).toBe('15 de janeiro');
        expect(getDayAndMonth('2023-12-25')).toBe('25 de dezembro');
    });

    it('should handle invalid date strings gracefully', () => {
        expect(getDayAndMonth('invalid-date')).toBe('NaN de Invalid Date');
    });

});