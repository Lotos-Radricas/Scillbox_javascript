let films = [];

// Загружаем фильмы из localStorage при загрузке страницы
window.onload = function() {
  const storedfilms = localStorage.getItem('films');
  
  if (storedfilms) {
        films = JSON.parse(storedfilms);
  } else {
        films = [];
  }
  renderTable();
}

function renderTable() {
    const films = JSON.parse(localStorage.getItem('films')) || []

    const filmTableBody = document.querySelector('#film-tbody')

    filmTableBody.innerHTML = ""

    films.forEach((film) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${film.title}</td>
            <td>${film.genre}</td>
            <td>${film.year}</td>
            <td>${film.isWatched ? "Да" : "Нет"}</td>
            <td>
        <button onclick="editMovie(${film.id})">Редактировать</button>
        <button onclick="deleteMovie(${film.id})">Удалить</button>
      </td>`;

        filmTableBody.appendChild(row);    
    });
}


// Функция для сохранения в localStorage
function saveToLocalStorage() {
    localStorage.setItem('films', JSON.stringify(films));
}

// Удаление фильма
function deleteMovie(id) {
  films = films.filter(f => f.id !== id);
  saveToLocalStorage(); // сохраняем после удаления
  renderTable();
}

// Редактирование фильма
function editMovie(id) {
  const movie = films.find(m => {
      return m.id === id;
  });
  if (movie) {
    document.getElementById('title').value = movie.title;
    document.getElementById('genre').value = movie.genre;
    document.getElementById('year').value = movie.year;
    document.getElementById('isWatched').checked = movie.isWatched;
    document.getElementById('movieId').value = movie.id;
    
    const switchButton = document.getElementById('submitButton');
    switchButton.textContent = "Обновить";
    const cancelButton = document.getElementById('cancelButton');
    cancelButton.style.display = 'block';

  }
}

//Обработчик для кнопки отменить редактирование
document.getElementById('sortButton').addEventListener('click', () => {
    
    document.querySelector('#film-form').reset();
    document.getElementById('movieId').value = '';
    const switchButton = document.getElementById('submitButton');
    switchButton.textContent = "Добавить";
    const cancelButton = document.getElementById('cancelButton');
    cancelButton.style.display = 'none';

});

function sortFilmsByField() {
    const criterion = document.getElementById('sortCriteria').value;

    return films.slice().sort((a, b) => {
        if (typeof a[criterion] === 'string' && typeof b[criterion] === 'string') {
            // Для строк используем localeCompare
            return a[criterion].localeCompare(b[criterion]);
        } else {
            // Для чисел или других типов
            return a[criterion] - b[criterion];
        }
       
    });


}

// Обработчик для кнопки Сортировать
document.getElementById('sortButton').addEventListener('click', () => {
    const sortedFilms = sortFilmsByField();

    films = sortedFilms;

    saveToLocalStorage();
    renderTable();

});

// Валидация формы
function validateForm() {
  const title = document.getElementById('title').value.trim();
  const genre = document.getElementById('genre').value.trim();
  const yearStr = document.getElementById('year').value.trim();
  const errorMsg = document.getElementById('errorMsg');
  errorMsg.textContent = '';

  if (!title || !genre || !yearStr) {
    errorMsg.textContent = 'Пожалуйста, заполните все поля!';
    return false;
  }
  const year = parseInt(yearStr);
  if (isNaN(year) || year < 1888 || year > new Date().getFullYear()) {
    errorMsg.textContent = 'Введите корректный год!';
    return false;
  }
  return true;
}


document.querySelector('#film-form').addEventListener('submit', function(e) {
  e.preventDefault();
    if (!validateForm()) return;

        const idField = document.querySelector('#movieId');
        const title = document.querySelector('#title').value.trim();
        const genre = document.querySelector('#genre').value.trim();
        const year = document.querySelector('#year').value.trim();
        const isWatched = document.querySelector('#isWatched').checked;
        

    if (idField.value) {
        // Обновление
        const id = parseInt(idField.value);
        const index = films.findIndex(m => m.id === id);
        if (index !== -1) {
        films[index] = { id, title, genre, year, isWatched };
        const switchButton = document.getElementById('submitButton');
        switchButton.textContent = "Добавить";
        const cancelButton = document.getElementById('cancelButton');
        cancelButton.style.display = 'none';
        }
    } else {
        // Добавление
        const newId = Date.now();
        films.push({ id: newId, title, genre, year, isWatched });
        

    }

    saveToLocalStorage(); // сохраняем после изменений
    renderTable();
    document.querySelector('#film-form').reset();
    document.getElementById('movieId').value = '';
    });

renderTable();

