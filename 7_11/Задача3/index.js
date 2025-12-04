
    // Исходный массив товаров
        const Things = ['Арбуз', 'Молоко', 'Яблоки','Кофе', 'Книга', 'Макароны'];
        const ThingsList = document.getElementById('thing-list');
        
        // Функция сортировки товаров в списке
        function sortThing(arr) {
            for (let j = 0; j < arr.length; j++) {

                for (let i = 0; i < arr.length; i++) {
                    if (arr[i] > arr[i+1]) {
                        let temp = arr[i];
                        arr[i] = arr[i+1];
                        arr[i+1] = temp;
                    }               
                }
            }
            return arr;
        }
        
        // Функция для отображения списка товаров на странице
        function renderThings(arr) {
            ThingsList.innerHTML = ''; // Очищаем текущий список
            const sortList = sortThing(arr);
            for (let i = 0; i < sortList.length; i++) {
                const liThing = document.createElement('li');
                liThing.textContent = `${i + 1}) ${arr[i]}`;
                ThingsList.append(liThing)
            }            
        } 
        
        renderThings(Things);

        // Функция проверки товара в списке
        function findThing(arr, search) {
            let result = -1;
            
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] === search.trim()) {
                    result = i;
                    break;
                }               
            }
            return result;
        }

        // Функция добавления товара
        function addThing() {
            const newThingTitle = prompt('Введите название товара');

            if (newThingTitle === null || newThingTitle.trim() === '') {
                alert('Название товара не введено!');
                return;
            } else {
                let rez = findThing(Things,newThingTitle);
                if (rez < 0) {         
                    Things.push(newThingTitle.trim());
                } else {
                    alert('Товар есть в списке!');
                return;    
                }
            }
            
            renderThings(Things); // Перерисовываем список 
        }

        // Функция поиска списка минимальных ростов
        function finderMinList(arr, minThing) {
            const rezList = [];
            
            for (const item of arr) {

                if (item >= minThing ) {
                    rezList.push(item);                                    
                }                
            }
            return rezList
        }
        
        
        function searchThing() {
            const searchTerm = prompt('Введите минимальный рост')

            if (searchTerm === null || searchTerm.trim() === '') {
                alert('Рост не введён!');

                renderThings (Things);
            }
            const findList = finderMinList(Things, searchTerm)
            renderThings (findList)

        }
     
