$("#login-form").on("submit", function(e) {
  e.preventDefault();
  const username = $("#username").val();
  const password = $("#password").val();
  $.ajax({
    url: 'http://localhost:3000/auth/login',
    type: 'POST',
    dataType: 'json',
    data: {username, password},
    success: function(data, textStatus, xhr) {
      if(xhr.status === 200){
        localStorage.setItem('token', data.accessToken);
        window.location.href = 'main.html'
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      console.error(xhr.status);
      console.error(thrownError)
    }
  });
})
