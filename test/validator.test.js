import { validateCardNumber } from '../src/validator.js';

describe('Card Number Validation (Luhn Algorithm)', () => {
  test.each([
    // Валидные карты (проходят алгоритм Луна)
    ['4532015112830366', true, 'Visa valid'],
    ['5425233430109903', true, 'Mastercard valid'],
    ['2200000000000004', true, 'MIR valid'], // ✅ Исправлено: был 2200500...
    ['378282246310005', true, 'Amex valid'],
    ['6011111111111117', true, 'Discover valid'],
    
    // Невалидные карты
    ['1234567812345678', false, 'Invalid sequence'], // ✅ Исправлено: был ...5670 (валидный!)
    ['4532015112830367', false, 'Wrong checksum'],
    ['abc123', false, 'Non-numeric'],
    ['', false, 'Empty string'],
    ['12345', false, 'Too short'],
  ])('%s should be %s (%s)', (card, expected, desc) => {
    expect(validateCardNumber(card)).toBe(expected);
  });
});