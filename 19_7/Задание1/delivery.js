// delivery.js
export class Delivery {
  constructor(customerName, address, distance) {
    this._customerName = customerName;
    this._address = address;
    this._distance = distance; // число
    this._element = null; // DOM-элемент карточки
  }

  // Геттеры и сеттеры
  get customerName() {
    return this._customerName;
  }

  set customerName(name) {
    this._customerName = name;
    if (this._element) {
      this._element.querySelector('.customer').textContent = name;
    }
  }

  get address() {
    return this._address;
  }

  set address(addr) {
    this._address = addr;
    if (this._element) {
      this._element.querySelector('.address').textContent = addr;
    }
  }

  get distance() {
    return this._distance;
  }

  set distance(dist) {
    this._distance = dist;
    if (this._element) {
      this._element.querySelector('.distance').textContent = `${dist} км`;
    }
  }

  // Метод для создания DOM-элемента карточки
  createCard() {
    const card = document.createElement('div');
    card.className = 'delivery-card';

    // Внутренние элементы карточки
    card.innerHTML = `
      <label for "customer" class = "field-label">Имя</label>
      <h3 class="customer">${this._customerName}</h3>
      <label for "address" class = "field-label">Адрес</label>
      <h3 class="address">${this._address}</h3>
      <label for "distance" class = "field-label">Расстояние</label>
      <h3 class="distance">${this._distance} км</h3>
    `;
    this._element = card;
    return card;
  }
}