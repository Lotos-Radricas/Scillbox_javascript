// Delivery.js


export class Delivery  {
  constructor(customerName, address, distance) {
    this._customerName = customerName;
    this._address = address;
    this._distance = distance;
  
    this._element = null; 
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

    // Внешний вид зависит от статуса
    this.updateCardStyle();


    // Внутренние элементы карточки
    card.innerHTML = `
      <label for "customer" class = "field-label">Имя</label>
      <button class="edit-btn">Изменить</button>
      <h3 class="customer">${this._customerName}</h3>
      <label for "address" class = "field-label">Адрес</label>
      <h3 class="address">${this._address}</h3>
      <label for "distance" class = "field-label">Расстояние</label>
      <h3 class="distance">${this._distance} км</h3>
      
    `;

    this._element = card; // сохраняем ссылку на DOM-элемент
    return card;
  }

  
}