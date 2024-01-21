// const updateData = { id: 'your_id', key: 'updated_value' }; // Replace with your actual data

export function dataChangeOnServer(updateData, data) {
  console.log('dataChangeOnServer called');
  fetch(`https://aturner060.pythonanywhere.com/words/${data}/`, {
    method: 'PATCH', // Corrected HTTP method
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateData),
  })
    .then(response => {

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log('ok');
      return response.json(); // If the server returns JSON
    })
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error))
    .finally(console.log(data[0].pk))
}
