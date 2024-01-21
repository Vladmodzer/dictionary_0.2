
import { TAG_tbady } from "../variables.js";
import { deleteRow } from "./deleteRowOnClient.js";

const tableWrapper = document.querySelector('.main__table-wrapper');
let openDropdown = null; // Keep track of the currently open dropdown

export function applyStylesTableButton() {
    const editButton = document.querySelector(".main__btn-edit");
    const deliteButton = document.querySelector(".main__btn-delete");
    const mainListBtn = document.getElementById("main__list-btn");
    const mainAddWordBtn = document.getElementById("main__add-word-btn");
    const mainBtnSave = document.querySelector('.main__btn-save');
};

function deleteWordOnServer(pk, btn) {
    const loadingIndicator = document.getElementById("loading-indicator");
    loadingIndicator.classList.remove("hidden");

    const url = `https://aturner060.pythonanywhere.com/words/${pk}/`;
    deleteRow(btn)
    return fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to delete word. Status: ${response.status}`);
            }
            console.log('Word deleted successfully.');
            return response.json();
        })
        .catch(error => {
            console.error('Error deleting word:', error);
        })
        .finally(() => {
            loadingIndicator.classList.add("hidden");
        });
}

function editToggle(dropDawn) {
    if (dropDawn.classList.contains('hidden')) {
        if (openDropdown) {
            openDropdown.classList.add('hidden');
        }

        dropDawn.classList.remove('hidden');
        openDropdown = dropDawn;


    } else {
        dropDawn.classList.add('hidden');
        openDropdown = null;
    }
}
function lockalWordChange(saveBtn, newWord, newTranslate, dropDawn) {
    const wordbox = saveBtn.closest('tr');

    const localWordElement = wordbox.querySelector('.main__table-word');
    const localTranslateElement = wordbox.querySelector('.main__table-translate');


    // Assuming you want to update localword and localtranslate with the text content
    if (checkInputsDrop(newWord, newTranslate) == 'word') {

        localWordElement.textContent = newWord.value;
        dropDawn.classList.add('hidden');
        newWord.value = ''

    }

    if (checkInputsDrop(newWord, newTranslate) == 'translate') {
        localTranslateElement.textContent = newTranslate.value;
        dropDawn.classList.add('hidden');
        newTranslate.value = ''
    }
    if(checkInputsDrop(newWord, newTranslate) == 'word and translate'){
        localWordElement.textContent = newWord.value;
        localTranslateElement.textContent = newTranslate.value;
        dropDawn.classList.add('hidden');
        newWord.value = ''
        newTranslate.value = ''
    }




}
function checkInputsDrop(word, trans) {

    if (word.value && trans.value) {
        return 'word and translate'
    }
    if (word.value && !trans.value) {
        return 'word'
    }
    if (trans.value && !word.value) {
        return 'translate'
    }
    else {
        return false
    }
}

function dropBtnSaveHandle(dropDawnBtnSave, dropDawn, dropDawnWord, dropDawnTranslate, data) {
    console.log("2");

    if (checkInputsDrop(dropDawnWord, dropDawnTranslate) == 'word and translate') {
        console.log('word and translate');



        // put function


        updateDataOnServerTwoWords(dropDawnWord.value, dropDawnTranslate.value, data);
        lockalWordChange(dropDawnBtnSave, dropDawnWord, dropDawnTranslate, dropDawn);
        dropDawnWord.value = '';
        dropDawnTranslate.value = '';
    }
    if (checkInputsDrop(dropDawnWord, dropDawnTranslate) == 'word') {
        console.log('wordChangeOnServerWord');
        const word = dropDawnWord.value;
        lockalWordChange(dropDawnBtnSave, dropDawnWord, dropDawnTranslate, dropDawn);

        dropDawn.classList.add('hidden');
        openDropdown = null;



        updateDataOnServer(word, data, 'word');
        dropDawnWord.value = '';
        dropDawnTranslate.value = '';
    }
    if (checkInputsDrop(dropDawnWord, dropDawnTranslate) == 'translate') {
        console.log('translate');
        const translate = dropDawnTranslate.value;
        lockalWordChange(dropDawnBtnSave, dropDawnWord, dropDawnTranslate, dropDawn);
        dropDawn.classList.add('hidden');
        openDropdown = null;

        updateDataOnServer(translate, data, 'translate'
        );
        dropDawnWord.value = '';
        dropDawnTranslate.value = '';
    }
}


async function updateDataOnServer(updateData, pk, key) {
    const apiUrl = `https://aturner060.pythonanywhere.com/words/${pk}/`;

    // Данные, которые вы хотите отправить
    if (key == 'word') {

        const requestData = {
            word: updateData

        };
        // Опции запроса, включая метод "PUT", заголовки и тело запроса в формате JSON
        const requestOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
                // Дополнительные заголовки, если необходимо
            },
            body: JSON.stringify(requestData)
        };

        // Используем функцию fetch() для отправки PUT-запроса
        fetch(apiUrl, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json(); // Может быть необходимо обработать ответ сервера
            })
            .then(data => {
                console.log('PUT request successful. Response:', data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    else {
        console.log(key);
        const requestData = {
            translate: updateData

        };
        // Опции запроса, включая метод "PUT", заголовки и тело запроса в формате JSON
        const requestOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
                // Дополнительные заголовки, если необходимо
            },
            body: JSON.stringify(requestData)
        };

        // Используем функцию fetch() для отправки PUT-запроса
        fetch(apiUrl, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json(); // Может быть необходимо обработать ответ сервера
            })
            .then(data => {
                console.log('PUT request successful. Response:', data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }




}
async function updateDataOnServerTwoWords(word, translate, pk) {
    // URL, на который будет отправлен PUT-запрос
    const Url = `https://aturner060.pythonanywhere.com/words/${pk}/`;

    // Данные, которые вы хотите отправить
    const Data = {
        word: word,
        translate: translate,
    };

    // Опции запроса, включая метод "PUT", заголовки и тело запроса в формате JSON
    const Options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
            // Дополнительные заголовки, если необходимо
        },
        body: JSON.stringify(Data)
    };

    // Используем функцию fetch() для отправки PUT-запроса
    fetch(Url, Options)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json(); // Может быть необходимо обработать ответ сервера
        })
        .then(data => {
            console.log('PUT request successful. Response:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });

}

export function createNewRow(data) {
    const table = document.querySelector('.main__table');

    data.forEach(item => {
        const newRow = document.createElement('tr');
        newRow.classList.add('main__new-word-pair');

        const newWord = document.createElement('td');
        newWord.classList.add('main__table-word', 'table-hover');
        newWord.textContent = item.word;

        const newTranslate = document.createElement('td');
        newTranslate.classList.add('main__table-translate', 'table-hover');
        newTranslate.textContent = item.translate;

        const tableBtnBox = document.createElement('td');
        tableBtnBox.classList.add('position-relative')
        tableBtnBox.classList.add('main__table-btn-box', 'table-hover');

        const newButtonEdit = document.createElement('button');
        newButtonEdit.classList.add('main__btn-edit', 'midle-btn', 'btn-blue', 'btn-blue-hover', 'btn-active');
        newButtonEdit.id = 'table-btn-edit';
        newButtonEdit.textContent = 'edit'

        const newButtonDelit = document.createElement('button');
        newButtonDelit.classList.add('main__btn-delete', 'midle-btn', 'btn-red', 'btn-red-hover', 'btn-active', 'button-del-marg-l');
        newButtonDelit.id = 'table-btn-delete';
        newButtonDelit.textContent = 'delete';

        newButtonDelit.addEventListener('click', () => {
            deleteWordOnServer(item.pk, newButtonDelit);
            console.log('deleteWordOnServer:::', item.pk);
        })

        const dropDawnWord = document.createElement('input');

        const dropDawnTranslate = document.createElement('input');

        const dropDawn = document.createElement('div');
        const dropDawnBtnSave = document.createElement('button');
        dropDawnBtnSave.classList.add('dropSaveBtn');

        dropDawnBtnSave.textContent = 'save'
        dropDawnWord.placeholder = 'word'
        dropDawnTranslate.placeholder = 'translate'
        dropDawnWord.style.width = '100%'
        dropDawnTranslate.style.width = '100%'
        dropDawn.appendChild(dropDawnWord);
        dropDawn.appendChild(dropDawnTranslate);
        dropDawn.appendChild(dropDawnBtnSave);

        dropDawn.classList.add('dropDawn');
        dropDawn.style.width = '100%';
        dropDawn.style.right = '1%';
        dropDawn.style.height = 'fit-content';
        dropDawn.style.padding = '5%';
        dropDawn.classList.add('hidden');
        dropDawn.style.zIndex = '100';
        dropDawn.style.borderRadius = '10px';
        dropDawn.style.boxShadow = '0px 2px 10px rgba(0, 0, 0, 0.1)';


        newButtonEdit.addEventListener('click', () => {
            const dropDawn = tableBtnBox.querySelector('.dropDawn');
            if (dropDawn) {
                editToggle(dropDawn);
            } else {
                console.error("Не удалось найти нужный 'div' для предоставленной кнопки.");
            };
        });
        dropDawnBtnSave.addEventListener('click', () => {

            dropBtnSaveHandle(dropDawnBtnSave, dropDawn, dropDawnWord, dropDawnTranslate, item.pk)
        });

        tableBtnBox.appendChild(newButtonEdit);
        tableBtnBox.appendChild(newButtonDelit);
        tableBtnBox.appendChild(dropDawn)
        newRow.appendChild(newWord);
        newRow.appendChild(newTranslate);
        newRow.appendChild(tableBtnBox);
        TAG_tbady.appendChild(newRow);
    });
}
