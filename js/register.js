document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('register-form');
  const errorBox = document.getElementById('register-error');

  // Toggle password (mata terbuka / tertutup)
  document.querySelectorAll('.toggle-pass').forEach(btn => {
    btn.addEventListener('click', function () {
      const targetId = this.getAttribute('data-target');
      const input = document.getElementById(targetId);
      if (!input) return;

      if (input.type === 'password') {
        input.type = 'text';
        this.textContent = '𓁹'; // mata tertutup
        this.setAttribute('aria-pressed', 'true');
      } else {
        input.type = 'password';
        this.textContent = '👁'; // mata terbuka
        this.setAttribute('aria-pressed', 'false');
      }
    });
  });

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    errorBox.textContent = '';

    const fullname = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirm = document.getElementById('confirm-password').value;

    // Validasi dasar
    if (!fullname) {
      errorBox.textContent = 'Nama lengkap harus diisi.';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errorBox.textContent = 'Format email tidak valid.';
      return;
    }

    const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!pwRegex.test(password)) {
      errorBox.textContent = 'Password minimal 8 karakter, mengandung huruf dan angka.';
      return;
    }

    if (password !== confirm) {
      errorBox.textContent = 'Konfirmasi kata sandi tidak cocok.';
      return;
    }

    // Simpan ke localStorage (array users)
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const exists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      errorBox.textContent = 'Email ini sudah terdaftar.';
      return;
    }

    users.push({ name: fullname, email: email, password: password });
    localStorage.setItem('users', JSON.stringify(users));

    // redirect ke login
    alert('Registrasi berhasil. Silakan login.');
    window.location.href = 'login.html';
  });
});
