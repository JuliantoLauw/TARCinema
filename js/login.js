$(document).ready(function () {
  $('#login-form').on('submit', function (e) {
    e.preventDefault();
    $('#login-global-error').addClass('hidden');

    const email = $('#login-email').val().trim();
    const password = $('#login-password').val().trim();

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      alert('Login Berhasil! Mengarahkan ke Homepage.');

      localStorage.setItem('loggedInUser', JSON.stringify(foundUser));

      window.location.href = 'index.html';
    } else {
      $('#login-global-error').removeClass('hidden');
    }
  });

  $('.toggle-pass').on('click', function () {
    const target = $(this).data('target');
    const $input = $('#' + target);

    if ($input.length) {
      const type = $input.attr('type') === 'password' ? 'text' : 'password';
      $input.attr('type', type);

      $(this).text(type === 'password' ? '👁' : '𓁹');
    }
  });
});

document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value.trim();

  const users = JSON.parse(localStorage.getItem('users')) || [];

  const user = users.find(
    u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (user) {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    alert("Login berhasil!");
    window.location.href = "index.html";
  } else {
    document.getElementById('login-global-error').classList.remove('hidden');
  }
});

