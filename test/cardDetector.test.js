import { detectCardSystem } from '../src/cardDetector.js';

describe('Card System Detection', () => {
  test.each([
    ['4532015112830366', 'Visa'],
    ['5425233430109903', 'Mastercard'],
    ['2200000000000004', 'Мир'], // ✅ Исправлено: теперь совпадает с валидным номером
    ['2204123456789012', 'Мир'], // ✅ Дополнительный тест для МИР
    ['378282246310005', 'American Express'],
    ['6011111111111117', 'Discover'],
    ['3530111333300000', 'JCB'],
    ['1234567890123456', null],
  ])('%s should be detected as %s', (card, expected) => {
    expect(detectCardSystem(card)).toBe(expected);
  });
});