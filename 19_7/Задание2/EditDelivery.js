// EditDelivery.js
import { Delivery } from './Delivery.js';

export class EditDelivery extends Delivery {
  constructor(customerName, address, distance, status = 'delivery') {
    super(customerName, address, distance);
    this._status = status; // внутренний атрибут
  }

  // Геттер и сеттер для статуса
  get status() {
    return this._status;
  }

  set status(newStatus) {
    this._status = newStatus;
    //const card = this.cardElement
    this.updateCardStyle();
  }

  // Создаем карточку с кнопкой "Изменить"
  createCard() {
    const card = super.createCard();

    const btn = card.querySelector('.edit-btn');
    btn.addEventListener('click', () => {
      this.openEditWindow();
    });

    this.updateCardStyle();

    this.cardElement = card;
    return card;
  }

  // Обновление стилей карточки в зависимости от статуса
    updateCardStyle() {
    
    if (this.cardElement) {
    // Удаляем все предыдущие классы, связанные со статусом
    this.cardElement.classList.remove('status-delivered', 'status-canceled'); 
    
      switch (this.status) {
        
        case 'delivery':
          
          break;
        case 'delivered':

          this.cardElement.classList.add('status-delivered');

          break;
        case 'canceled':

          this.cardElement.classList.add('status-canceled');
          break;
        default:
          card.style.backgroundColor = '#fff';
      }
    } 
  }
  // Открытие окна редактирования
  openEditWindow() {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = 0; overlay.style.left = 0;
    overlay.style.width = '100%'; overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    overlay.style.display = 'flex'; 
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';

    const form = document.createElement('div');
    form.classList.add("form-container");    

    form.innerHTML = `
    <div>
    <h3>Изменить </h3>  
    <button id="cancelBtn" class="close-button">x</button>
      <input type="text" id="name" class="form-element" value="${this.customerName}" placeholder = "Имя" required><br><br>
      <input type="text" id="address" class="form-element" value="${this.address}" placeholder = "Адрес" required><br><br>
      <input type="number" id="distance" class="form-element" value="${this.distance}" placeholder = "Расстояние в км." required><br><br>
        <select id="status">
          <option value="delivery" ${this._status==='delivery'?'selected':''}>Доставляется</option>
          <option value="delivered" ${this._status==='delivered'?'selected':''}>Доставлен</option>
          <option value="canceled" ${this._status==='canceled'?'selected':''}>Отменен</option>
        </select>
      <br><br>
      <button id="saveBtn">Сохранить</button>
      </div>
    `;

    overlay.appendChild(form);
    document.body.appendChild(overlay);

    // Обработчики кнопок
    form.querySelector('#saveBtn').onclick = () => {
      this.customerName = form.querySelector('#name').value;
      this.address = form.querySelector('#address').value;
      this.distance = parseFloat(form.querySelector('#distance').value);
      this.status = form.querySelector('#status').value;


      if (!this.customerName || !this.address || isNaN(this.distance)) {
        alert('Пожалуйста, заполните все поля правильно.');
        return;
      }

      // Обновление карточки
      this.refreshCard();

      document.body.removeChild(overlay);
    };

    form.querySelector('#cancelBtn').onclick = () => {
      document.body.removeChild(overlay);
    };
    
  }

  // Обновление отображения карточки после редактирования
  refreshCard() {
    // Обновляем текстовые части
    this.cardElement.querySelector('h3:nth-of-type(1)').textContent = `${this.customerName}`;
    this.cardElement.querySelector('h3:nth-of-type(2)').textContent = `${this.address}`;
    this.cardElement.querySelector('h3:nth-of-type(3)').textContent = `${this.distance} км`;
    this.updateCardStyle();
  }
}