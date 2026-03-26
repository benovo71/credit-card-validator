/**
 * Определяет платёжную систему по номеру карты
 * @param {string} cardNumber - номер карты
 * @returns {string|null}
 */
export function detectCardSystem(cardNumber) {
  const cleaned = cardNumber.replace(/\s+/g, '');
  
  const patterns = [
    // МИР: 2200-2204, 2221-2229, 2230-2235, длина 16-19 цифр
    { name: 'Мир', regex: /^220[0-4]\d{12,15}$|^222[1-9]\d{12,15}$|^223[0-5]\d{12,15}$/ },
    
    // Visa: начинается с 4, длина 13, 16 или 19
    { name: 'Visa', regex: /^4\d{12}(?:\d{3,6})?$/ },
    
    // Mastercard: 51-55 или 2221-2720, длина 16
    { name: 'Mastercard', regex: /^5[1-5]\d{14}$|^2(22[1-9]|2[3-9][0-9]|[3-6][0-9]{2}|7[0-1][0-9]|720)\d{12}$/ },
    
    // American Express: 34 или 37, длина 15
    { name: 'American Express', regex: /^3[47]\d{13}$/ },
    
    // Discover: 6011, 622126-622925, 644-649, 65
    { name: 'Discover', regex: /^6(?:011|5\d{2})\d{12}$/ },
    
    // JCB: 2131, 1800, 3528-3589
    { name: 'JCB', regex: /^(?:2131|1800|35\d{3})\d{11}$/ },
    
    // Diners Club: 300-305, 36, 38
    { name: 'Diners Club', regex: /^3(?:0[0-5]|[68]\d)\d{11}$/ },
  ];

  for (const { name, regex } of patterns) {
    if (regex.test(cleaned)) {
      return name;
    }
  }
  
  return null;
}