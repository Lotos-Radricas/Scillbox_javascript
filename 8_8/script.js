// Функция для подсчёта гласных букв в слове
const countVowels = (elem) => {
    const arrlowerWord = elem.toLowerCase().split('');
    
// Используем метод filter() для фильтрации гласных букв
    const vowelCount = arrlowerWord.filter(isVowelIndexOf); 
       return(vowelCount.length) 
    };
    function isVowelIndexOf(char) {
    const vowels = "aeiouаеёиоуыэюя";
    const lowerCaseChar = char.toLowerCase(); 
    // Если indexOf вернул любое значение кроме -1, значит символ найден (является гласной)
    return vowels.indexOf(lowerCaseChar) !== -1;
    }

const word = 'JavaScript';
const vowelCount = countVowels(word);
console.log(vowelCount);
