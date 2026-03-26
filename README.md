# 💳 Credit Card Validator

[![Build Status](https://github.com/benovo71/credit-card-validator/workflows/Build%20and%20Deploy/badge.svg)]
(https://github.com/benovo71/credit-card-validator/actions)
[![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

> Виджет для валидации номера банковской карты с определением платёжной системы.

🔗 **Демо**: [https://benovo71/.github.io/credit-card-validator/](https://benovo71.github.io/credit-card-validator/)

---

## 📋 Описание

Проект реализует виджет ввода номера банковской карты с двумя ключевыми функциями:

1. ✅ **Проверка валидности** по алгоритму Луна (Luhn algorithm)
2. 🏦 **Определение платёжной системы** по префиксу номера:
   - `Мир` (2200–2204, 2221–2229, 2230–2235)
   - `Visa` (4...)
   - `Mastercard` (51–55, 2221–2720)
   - `American Express` (34, 37)
   - `Discover` (6011, 65)
   - `JCB` (2131, 1800, 35)
   - `Diners Club` (300–305, 36, 38)

---

## 🚀 Быстрый старт

### Требования

- Node.js ≥ 16
- npm ≥ 8
