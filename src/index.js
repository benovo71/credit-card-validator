import { validateCardNumber } from "./validator.js";
import { detectCardSystem } from "./cardDetector.js";
import "./styles.scss";

document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("#card-input");
  const result = document.querySelector("#result");
  const form = document.querySelector("#card-form");
  const iconItems = document.querySelectorAll(".card-icon-item");

  // Форматирование ввода (пробелы каждые 4 цифры)
  input.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.replace(/(\d{4})/g, "$1 ").trim();
    e.target.value = value;

    // Сброс стилей
    input.classList.remove("valid", "invalid");
    result.classList.remove("show", "success", "error");

    // Сброс активной иконки
    iconItems.forEach((item) => item.classList.remove("active"));
  });

  // Валидация по кнопке
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const cleaned = input.value.replace(/\s+/g, "");

    if (cleaned.length < 13) {
      showResult("Please enter a valid card number", "error");
      input.classList.add("invalid");
      return;
    }

    const isValid = validateCardNumber(cleaned);
    const system = detectCardSystem(cleaned);

    // Подсветка иконки
    if (system) {
      const activeIcon = document.querySelector(
        `[data-card="${system.toLowerCase()}"]`,
      );
      if (activeIcon) {
        activeIcon.classList.add("active");
      }
    }

    if (isValid) {
      showResult(`✅ Valid ${system || "Card"} Number!`, "success");
      input.classList.add("valid");
    } else {
      showResult("❌ Invalid card number", "error");
      input.classList.add("invalid");
    }
  });

  function showResult(message, type) {
    result.textContent = message;
    result.className = `result show ${type}`;
  }
});
