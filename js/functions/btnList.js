
import { ID_mainTabele } from '../variables.js';
import { CLASS_main__add_word_box } from '../variables.js';
import { ID_mainListBtn } from '../variables.js';
import { ID_mainAddWordBtn } from '../variables.js';
// LIST BUTTON
export function toggleList() {
    // on
    if (ID_mainTabele.classList.contains('hidden')) {
        ID_mainTabele.classList.remove('hidden');
        ID_mainTabele.classList.add('show-table');

        CLASS_main__add_word_box.classList.add('hidden');
        CLASS_main__add_word_box.classList.remove('show-flex');

        ID_mainListBtn.classList.add('hidden');
        ID_mainAddWordBtn.classList.remove('hidden');
        ID_mainAddWordBtn.classList.add('btn-show');



    }
    // of
    else {
        ID_mainTabele.classList.remove('show-table');
        ID_mainTabele.classList.add('hidden');
    }
}
