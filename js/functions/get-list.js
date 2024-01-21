import { TAG_tbady } from "../variables.js";
import { createNewRow } from "./main-table-btn-change.js";

// URL, к которому вы хотите отправить GET-запрос
const url = "https://aturner060.pythonanywhere.com/words/";

export function getList() {
    const loadingIndicator = document.getElementById("loading-indicator");
    // Показываем индикатор загрузки
    loadingIndicator.classList.remove("hidden");
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            // Handle the data received from the server
            console.log(data
                );
            TAG_tbady.innerHTML = ''
            createNewRow(data);

        })
        .catch(error => {
            // Handle errors during the fetch
            console.error('Error during fetch:', error);
        }).finally(() => {
            // Скрываем индикатор загрузки после завершения запроса
            loadingIndicator.classList.add("hidden");
        });


   
}
