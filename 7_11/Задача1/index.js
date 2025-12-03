// Исходный массив книг
        const books = ['Мастер и Маргарита', 'Гарри Поттер', 'Над пропастью во ржи','Властелин колец', 'Дюна'];
        const BooksList = document.getElementById('book-list');
            
        // Функция для отображения списка книг на странице
        function renderBooks(arr) {
            const listBook = document.createElement("ul");
            BooksList.innerHTML = ''; // Очищаем текущий список
    
            for (let i = 0; i < arr.length; i++) {
                const liBook = document.createElement('li')
                liBook.textContent = `${i + 1}) ${arr[i]}`
                BooksList.append(liBook)
            }
            
        } 
        renderBooks(books);

        // Функция добавления новой книги
        function addBook() {
            const newBookTitle = prompt('Введите название книги');

            if (newBookTitle === null || newBookTitle.trim() === '') {
                alert('Название книги не введено!');
                return;
            }

            books.push(newBookTitle.trim());
            renderBooks(books); // Перерисовываем список с новой книгой
        }

        // Функция поиска книги
        function findBook(arr, search) {
            let result = -1;
            
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] === search) {
                    result = i;
                    break
                }
                
            }
            return result
        }
        
        function searchBook() {
            const searchTerm = prompt('Введите название книги')

            if (searchTerm === null || searchTerm.trim() === '') {
                prompt('Книга не найдена!');

                return; // Ничего не делаем, если ввод пустой или отменен
            }
            const findIndex = findBook(books, searchTerm)
        
            if (findIndex > -1) {
                const lightBook = document.querySelector(`li:nth-child(${findIndex + 1})`)
                lightBook.classList.add('highlight');
            
            } else {
                alert('Книга не найдена!');
                renderBooks(books);

            }
        }
     
