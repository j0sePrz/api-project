$(document).ready(function () {
  function loadPlaylists() {
    $.get('http://localhost:3000/playlists', function (data) {
      $('#playlists').empty();

      data.forEach(function (playlist) {
        const playlistItem = `<li data-id="${playlist._id}">${playlist.name} - ${playlist.description}</li>`;
        $('#playlists').append(playlistItem);
      });
    });
  }

  loadPlaylists();

  $('#create-form').submit(function (event) {
    event.preventDefault();
    const name = $('#name').val();
    const description = $('#description').val();
    $.post({
      url: 'http://localhost:3000/playlists',
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') },
      data: { name: name, description: description },
      success: function (data) {
        const playlistItem = `<li data-id="${data._id}">${data.name} - ${data.description}</li>`;
        $('#playlists').append(playlistItem);

        $('#name').val('');
        $('#description').val('');
      }
    });
  });

  $('#update-form').submit(function (event) {
    event.preventDefault();
    const id = $('#update-id').val();
    const name = $('#update-name').val();
    const description = $('#update-description').val();
    $.ajax({
      url: 'http://localhost:3000/playlists/' + id,
      method: 'PATCH',
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') },
      data: { name: name, description: description },
      success: function () {
        const updatedPlaylistItem = `<li data-id="${id}">${name} - ${description}</li>`;
        $('#playlists li[data-id="' + id + '"]').replaceWith(updatedPlaylistItem);

        $('#update-id').val('');
        $('#update-name').val('');
        $('#update-description').val('');
      }
    });
  });

  $('#delete-form').submit(function (event) {
    event.preventDefault();
    const id = $('#delete-id').val();
    $.ajax({
      url: 'http://localhost:3000/playlists/' + id,
      method: 'DELETE',
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') },
      success: function () {
        $('#playlists li[data-id="' + id + '"]').remove();

        $('#delete-id').val('');
      }
    });
  });
  document.getElementById('fetchButton').addEventListener('click', async function() {
    console.log('Button clicked.'); // Debugging statement 1

    try {
        const response = await fetch('http://localhost:3000/getApiData');
        console.log('Response received:', response); // Debugging statement 2

        if (!response.ok) {
            console.log('Response error:', response.statusText);
            return;
        }

        const data = await response.json();
        console.log('Data:', data); // Debugging statement 3

        const coffeeDiv = document.getElementById('coffeeData');
        coffeeDiv.innerHTML = `
            <h2>${data.title}</h2>
            <p>${data.description}</p>
            <p>${data.ingredients.join(', ')}</p>
        `;
    } catch (error) {
        console.error('Fetch failed:', error); 
    }
});

});

