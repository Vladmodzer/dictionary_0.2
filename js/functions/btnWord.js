import { CLASS_main__add_word_box, ID_mainAddWordBtn, ID_mainListBtn, ID_mainTabele } from '../variables.js';
// WORD BUTTON
export function toggleMainAddWordBox() {
    if (CLASS_main__add_word_box.classList.contains('hidden')) {
        // on
        CLASS_main__add_word_box.classList.remove('hidden');
        CLASS_main__add_word_box.classList.add('show-flex');
   
        ID_mainTabele.classList.remove('show-table');
        ID_mainTabele.classList.add('hidden');
        
        ID_mainAddWordBtn.classList.add('hidden');
        ID_mainListBtn.classList.remove('hidden');
         ID_mainListBtn.classList.add('btn-show')
     
    } else {
        // off
        CLASS_main__add_word_box.classList.add('hidden');
        CLASS_main__add_word_box.classList.remove('show-flex');

       
    }
}
