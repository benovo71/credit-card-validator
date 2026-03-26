/**
 * Проверяет номер карты по алгоритму Луна
 * @param {string} cardNumber - номер карты (только цифры)
 * @returns {boolean}
 */
export function validateCardNumber(cardNumber) {
  const cleaned = cardNumber.replace(/\s+/g, '');
  
  // Проверка: только цифры, длина 13-19
  if (!/^\d+$/.test(cleaned) || cleaned.length < 13 || cleaned.length > 19) {
    return false;
  }

  let sum = 0;
  let shouldDouble = false;

  // Проходим справа налево
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i], 10);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9; // или: digit = Math.floor(digit / 10) + (digit % 10)
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}