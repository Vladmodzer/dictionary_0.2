import { applyStylesTableButton } from './functions/main-table-btn-change.js';
import { toggleList } from './functions/btnList.js';
import { ID_btnSaveWord, ID_mainListBtn, ID_main__add_word_btn } from './variables.js';
import { toggleMainAddWordBox } from './functions/btnWord.js'
import { getList } from './functions/get-list.js';
import { createWordOnServer } from './functions/createWors.js';


// Вызываем функцию при загрузке страницы и изменении размера окна
window.onload = applyStylesTableButton;
window.onresize = applyStylesTableButton;

// вешаем на кнопку list функцию переключатель списка
ID_mainListBtn.addEventListener('click', toggleList)

//  вешаем функцию при нажжатии на кнопку добавить слово
ID_main__add_word_btn.addEventListener('click', toggleMainAddWordBox);


//get запрос получить список 
ID_mainListBtn.addEventListener('click', getList);

// Инициализация таблицы
const table = document.querySelector(".main__table");



// Навешиваем обработчик события клика на кнопки "Удалить"
table.querySelectorAll(".main__btn-delete").forEach((button) => {
  button.addEventListener("click", (event) => {
    // Получаем слово, которое нужно удалить
    const word = event.target.parentNode;

    // Вызываем функцию для удаления слова
    deleteWord(word);
  });
});

//вешаем функцию сохранить новое слово на сервер на кнопку save
ID_btnSaveWord.addEventListener('click', createWordOnServer)




















