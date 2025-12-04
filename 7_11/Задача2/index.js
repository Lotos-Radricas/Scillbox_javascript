 // Исходный массив роста
        const Rosts = ['164', '157', '160','143', '170'];
        const RostList = document.getElementById('rost-list');
            
        // Функция для отображения списка ростовок на странице
        function renderRosts(arr) {
            RostList.innerHTML = ''; // Очищаем текущий список
    
            for (let i = 0; i < arr.length; i++) {
                const liRost = document.createElement('li')
                liRost.textContent = `${i + 1}) ${arr[i]}`
                RostList.append(liRost)
            }            
        } 
        renderRosts(Rosts);

        // Функция проверки роста в списке
        function findRost(arr, search) {
            let result = -1;
            
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] === search.trim()) {
                    result = i;
                    break;
                }               
            }
            return result;
        }

        // Функция добавления роста
        function addRost() {
            const newRostTitle = prompt('Введите рост ученика');

            if (newRostTitle === null || newRostTitle.trim() === '') {
                alert('Рост не введён!');
                return;
            } else {
                let rez = findRost(Rosts,newRostTitle);
                if (rez < 0) {         
                    Rosts.push(newRostTitle.trim());
                } else {
                    alert('Рост есть в списке!');
                return;    
                }
            }
            
            renderRosts(Rosts); // Перерисовываем список 
        }

        // Функция поиска списка минимальных ростов
        function finderMinList(arr, minRost) {
            const rezList = [];
            
            for (const item of arr) {

                if (item >= minRost ) {
                    rezList.push(item);                                    
                }                
            }
            return rezList
        }
        
        
        function searchRost() {
            const searchTerm = prompt('Введите минимальный рост')

            if (searchTerm === null || searchTerm.trim() === '') {
                alert('Рост не введён!');

                renderRosts (Rosts);
            }
            const findList = finderMinList(Rosts, searchTerm)
            renderRosts (findList)

        }
     
