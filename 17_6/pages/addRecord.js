import { storage } from '../storage.js';
import { hidePreloader } from '../components/preload.js';

export function renderAddRecordPage() {
  
  const app = document.getElementById('app');
  app.innerHTML = '';

  setTimeout(() => {
    app.style.display = 'block';
    //const loaderE2 = document.getElementById('preloader');
    hidePreloader();
  }, 2000);

  const header = document.createElement('header');
  header.innerHTML = `<div class="header-center"><h1>Добавить запись</h1></div>`;
  app.appendChild(header);

  const form = document.createElement('form');
  form.innerHTML = `
    <div>
      <input type="text" id="name" placeholder = "Название" required />
    </div>
    <div>
      <input type="text" id="shelf" placeholder = "Полка"  required />
    </div>
    <div>
      <input type="number" id="weight" placeholder = "Вес" required />
    </div>
    <div>
      <input type="date" id="storageTime" required />
    </div>
    <button type="submit">Добавить запись</button>
  `;
  app.appendChild(form);

  form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const shelf = document.getElementById('shelf').value.trim();
      const weight = parseFloat(document.getElementById('weight').value);
      const storageTime = document.getElementById('storageTime').value;

      if (!name || !shelf || isNaN(weight) || !storageTime) {
        alert('Пожалуйста, заполните все поля правильно.');
        return;
      }

      const newItem = {
        id: Date.now().toString(),
        name,
        shelf,
        weight,
        storageTime
      };
      storage.addItem(newItem);
      window.location.hash = '#';
  });
//}
  // Получение элемента ссылки
  function getLinkEl(text, href = '') {
      const linkEl = document.createElement("a")
      linkEl.textContent = text
      linkEl.href = href
      linkEl.classList.add("link")
      return linkEl
  }

  const homeLinkEl = getLinkEl("<< На Cклад", "/")
  app.append(homeLinkEl)
  
  homeLinkEl.addEventListener("click", function (event) {
  event.preventDefault(); // остановить стандартное поведение
       
    window.location.href = "/"; // перейти на главную
});
}
