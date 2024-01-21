import { ID_inputTranslate, ID_inputWord } from "../variables.js";


function addMassage(massage) {
  const tableWrapper = document.querySelector('.main__table-wrapper');
  const massageElement = document.createElement('h1');
  massageElement.classList.add('massage')
  massageElement.style.textAlign = 'center';
  massageElement.style.paddingTop = ' 40px';
  massageElement.style.color = 'var(--button-red-hover-col)'
  massageElement.textContent = massage;
  massageElement.style.textTransform = 'uppercase'
  tableWrapper.appendChild(massageElement);
  // Set a timer to remove the message after 3 seconds
  setTimeout(() => {
    massageElement.remove();
  }, 2000);
  cleanInputs()
}

export function checkInputs(input_1, input_2) {
  console.log('checkInputs');
  if (input_1.value && input_2.value) {
    return true
  }
  else {
    false
  }
}
function cleanInputs() {

  ID_inputTranslate.value = '';
  ID_inputWord.value = ''

}
function ifInoutsAmpty(data) {

  ID_inputTranslate.value = data.translate;
  ID_inputWord.value = data.word;
  setTimeout(() => {
    cleanInputs();
  }, 1500);
}
const url = 'https://aturner060.pythonanywhere.com/words/'
export async function createWordOnServer() {
  if (checkInputs(ID_inputWord, ID_inputTranslate)) {
    const loadingIndicator = document.getElementById("loading-indicator");
    // Показываем индикатор загрузки
    loadingIndicator.classList.remove("hidden");
    const wordData = {
      word: ID_inputWord.value,
      translate: ID_inputTranslate.value,
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Дополнительные заголовки, если необходимо
      },
      body: JSON.stringify(wordData),
    })
      .then(response => response.json())
      .then(data => {
        if (data.word[0] == 'This field may not be blank.') {
          ifInoutsAmpty(data);
        }
        if (data.word == 'This word is already exist.') {
          addMassage(data.word)
        }
        console.log('Ответ сервера:', data.word);
      })
      .catch(error => {
        console.error('Ошибка при отправке запроса:', error);
      })
      .finally(
        () => {
          // Скрываем индикатор загрузки после завершения запроса
          loadingIndicator.classList.add("hidden");
          ID_inputWord.value = ''
          ID_inputTranslate.value = ''
        }
      )
  }



}

