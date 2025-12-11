import { storage } from '../storage.js';
import { showPreloader, hidePreloader } from '../components/preload.js';

export function renderWarehousePage() {
  const app = document.getElementById('app');
  app.innerHTML = '';

  setTimeout(() => {
      app.style.display = 'block';
      //const loaderE4 = document.getElementById('preloader');
  
      hidePreloader();
    }, 2000);

  // Заголовок и кнопка
  const header = document.createElement('header');
  header.innerHTML = `
    <h1>Склад</h1>
    <button id="addBtn">Добавить запись</button>
  `;
  app.appendChild(header);


  // Таблица
  const table = document.createElement('table');
  table.innerHTML = `
    <thead>
      <tr>
        <th data-column="name" class = "column-header">Название</th>
        <th data-column="shelf">Полка</th>
        <th data-column="weight">Вес</th>
        <th data-column="storageTime">Время хранения</th>
        <th>Действия</th>
      </tr>
    </thead>
    <tbody></tbody>
  `;
  app.appendChild(table);

  
  const tbody = table.querySelector('tbody');

  function loadAndRender(data) {
    tbody.innerHTML = '';
    data.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.shelf}</td>
        <td>${item.weight}</td>
        <td>${item.storageTime}</td>
        <td>
          <button data-id="${item.id}" class="deleteBtn">Удалить</button>
        </td>
      `;
      tbody.appendChild(row);

    });
  }
    const data = storage.getItems();
    loadAndRender(data);
 

  // Переход к добавлению
  document.getElementById('addBtn').addEventListener('click', () => {

    window.location.hash = '#add';
  });

  // Удаление
  tbody.addEventListener('click', (e) => {
    if (e.target.classList.contains('deleteBtn')) {
      const id = e.target.dataset.id;
      storage.deleteItem(id);
      const data = storage.getItems();
      loadAndRender(data);
    }
  });

  // Сортировка
  const headers = table.querySelectorAll('th[data-column]');
  headers.forEach(header => {
    let ascending = true;
    header.addEventListener('click', () => {
      const column = header.dataset.column;
      let data = storage.getItems();
      data.sort((a, b) => {
        if (a[column] < b[column]) return ascending ? -1 : 1;
        if (a[column] > b[column]) return ascending ? 1 : -1;
        return 0;
      });
      loadAndRender(data);
      ascending = !ascending;
    });
  });

}