
export function deleteRow(button) {
    // Получаем родительскую строку и удаляем её
    const row = button.closest('tr');
    if (row) {
        row.parentNode.removeChild(row);
        console.log('deleteRow');
    }
}

