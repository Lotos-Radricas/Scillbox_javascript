function handleFormSubmit(e) {
  e.preventDefault();

  if (!validateForm()) return;

  const title = document.getElementById("title").value;
  const genre = document.getElementById("genre").value;
  const releaseYear = document.getElementById("releaseYear").value;
  const isWatched = document.getElementById("isWatched").checked;

  const film = {
    title: title,
    genre: genre,
    releaseYear: releaseYear,
    isWatched: isWatched,
  };

  addFilm(film);
  document.querySelector('#film-form').reset();

}

// Валидация формы
function validateForm() {
  const title = document.getElementById('title').value.trim();
  const genre = document.getElementById('genre').value.trim();
  const yearStr = document.getElementById('releaseYear').value.trim();
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


// Получите элементы фильтров
const titleInput = document.getElementById("filterTitle");
const genreInput = document.getElementById("filterGenre");
const yearInput = document.getElementById("filterYear");
const watchedSelect = document.getElementById("filterWatched");

// Добавить слушателей событий
titleInput.addEventListener("input", updateFilteredTable);
genreInput.addEventListener("input", updateFilteredTable);
yearInput.addEventListener("input", updateFilteredTable);
watchedSelect.addEventListener("change", updateFilteredTable);

async function addFilm(film) {
  // const films = JSON.parse(localStorage.getItem("films")) || [];
  // films.push(film);
  // localStorage.setItem("films", JSON.stringify(films));

  // console.log(film);
  await fetch("https://sb-film.skillbox.cc/films", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      email: "ovikdevil@gmail.com",
    },
    body: JSON.stringify(film),
  });
  renderTable();
}

async function renderTable() {
  // const films = JSON.parse(localStorage.getItem("films")) || [];
  const filmsResponse = await fetch("https://sb-film.skillbox.cc/films", {
    headers: {
      email: "ovikdevil@gmail.com",
    },
  });
  const films = await filmsResponse.json();

  const filmTableBody = document.getElementById("film-tbody");

  // Clear table body first
  filmTableBody.innerHTML = "";

  // Then add new rows
  films.forEach((film) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${film.title}</td>
      <td>${film.genre}</td>
      <td>${film.releaseYear}</td>
      <td>${film.isWatched ? "Да" : "Нет"}</td>
      <button class = "redBtn" onclick="deleteMovie(${film.id})">Удалить</button>
      </td>`;
    filmTableBody.appendChild(row);
  });
}

document
  .getElementById("film-form")
  .addEventListener("submit", handleFormSubmit);

// Display films on load
renderTable();

//Удаление фильма
async function deleteMovie(id) {
  try {
    const response = await fetch(`https://sb-film.skillbox.cc/films/${id}`, {
      method: "DELETE",
      headers: {
        email: "ovikdevil@gmail.com",
      },
    });
    if (response.ok) {
      // Успешно удалено, обновляем таблицу с текущими фильтрами
      updateFilteredTable();
    } else {
      alert("Ошибка при удалении фильма");
    }
  } catch (error) {
    console.error("Ошибка:", error);
    alert("Ошибка при удалении фильма");
  }
}
//Удаление всех фильмов из таблицы и с сервера
async function deleteAllMovies() {
  if (!confirm("Вы уверены, что хотите удалить все фильмы?")) {
    return; // Подтверждение перед удалением
  }
  try {
    const response = await fetch(`https://sb-film.skillbox.cc/films`, {
      method: "DELETE",
      headers: {
        email: "ovikdevil@gmail.com",
      },
    });
    if (response.ok) {
      // Удаление прошло успешно, обновляем таблицу
      updateFilteredTable();

    } else {
      alert("Ошибка при удалении всех фильмов");
    }
  } catch (error) {
    console.error("Ошибка:", error);
    alert("Ошибка при удалении всех фильмов");
  }
}

document.getElementById("deleteAllServer").addEventListener("click", deleteAllMovies);

//Фильтрация при поиске
async function updateFilteredTable() {
    const title = document.getElementById("filterTitle").value;
    const genre = document.getElementById("filterGenre").value;
    const releaseYear = document.getElementById("filterYear").value;
    const isWatchedValue = document.getElementById("filterWatched").value;

    // Создаем параметры запроса
    const params = new URLSearchParams();

    if (title) params.append("title", title);
    if (genre) params.append("genre", genre);
    if (releaseYear) params.append("releaseYear", releaseYear);
    if (isWatchedValue !== "") params.append("isWatched", isWatchedValue);

    // Выполняем запрос с параметрами
    try {
    const response = await fetch(`https://sb-film.skillbox.cc/films?${params.toString()}`, {
      headers: {
        email: "ovikdevil@gmail.com",
      },
    });
  const films = await response.json();

  // Обновляем таблицу
  const filmTableBody = document.getElementById("film-tbody");
  filmTableBody.innerHTML = "";

  films.forEach((film) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${film.title}</td>
      <td>${film.genre}</td>
      <td>${film.releaseYear}</td>
      <td>${film.isWatched ? "Да" : "Нет"}</td>
      <td><button class="redBtn" onclick="deleteMovie(${film.id})">Удалить</button></td>`;
    filmTableBody.appendChild(row);
  });
  } catch (error) {
    console.error("Ошибка при получении фильмов:", error);
  }
}

// При загрузке страницы
updateFilteredTable();