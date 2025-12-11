import { renderWarehousePage } from './pages/warehouse.js';
import { renderAddRecordPage } from './pages/addRecord.js';
import { showPreloader, hidePreloader } from './components/preload.js';

//Обрабатываем смену хеша
  window.addEventListener('hashchange', () => {

    showPreloader();
    const app = document.getElementById('app');
    app.style.display = 'none';
    router();
  });
 

document.addEventListener('DOMContentLoaded', () => {
  // Показываем прелоудер при первой загрузке*/
  showPreloader();

  // симуляция загрузки данных
    setTimeout(() => {
      router();
    hidePreloader();
  }, 2000); // через 2 сек покажем, что загрузка завершена
  
});

function router() {
  const hash = window.location.hash;
  
  if (hash === '#add') {

    renderAddRecordPage();

  } else {

    renderWarehousePage();
      
  }
}
