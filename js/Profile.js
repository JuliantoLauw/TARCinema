const user = JSON.parse(localStorage.getItem('loggedInUser'));
let users = JSON.parse(localStorage.getItem('users')) || [];

if (!user) {
  alert("Silakan login terlebih dahulu!");
  window.location.href = "login.html";
} else {
  document.getElementById('name').textContent = user.name;
  document.getElementById('email').textContent = user.email;
  if (user.photo) document.getElementById('profilePic').src = user.photo;
}


document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('loggedInUser');
  window.location.href = "login.html";
});
document.getElementById('homeBtn').addEventListener('click', () => {
  window.location.href = "index.html";
});


document.getElementById('uploadPic').addEventListener('change', function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const newPhoto = e.target.result;
      document.getElementById('profilePic').src = newPhoto;
      user.photo = newPhoto;
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      users = users.map(u => u.email === user.email ? { ...u, photo: newPhoto } : u);
      localStorage.setItem('users', JSON.stringify(users));
      alert("Foto profil berhasil diperbarui!");
    };
    reader.readAsDataURL(file);
  }
});


document.getElementById('updateForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const newName = document.getElementById('newName').value.trim();
  const newEmail = document.getElementById('newEmail').value.trim();
  const newPassword = document.getElementById('newPassword').value.trim();

  if (!newName && !newEmail && !newPassword) {
    alert("Isi minimal satu kolom untuk diperbarui!");
    return;
  }

  const updatedName = newName || user.name;
  const updatedEmail = newEmail || user.email;
  const updatedPassword = newPassword || user.password;

  if (newEmail && newEmail !== user.email) {
    const duplicate = users.some(u => u.email.toLowerCase() === newEmail.toLowerCase() && u.email !== user.email);
    if (duplicate) {
      alert("Email ini sudah digunakan oleh akun lain!");
      return;
    }
  }

  users = users.map(u => u.email === user.email ? { name: updatedName, email: updatedEmail, password: updatedPassword, photo: user.photo } : u);
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('loggedInUser', JSON.stringify({ name: updatedName, email: updatedEmail, password: updatedPassword, photo: user.photo }));

  alert("Profil berhasil diperbarui!");
  location.reload();
});

const pupils = document.querySelectorAll('.pupil');
document.addEventListener('mousemove', e => {
  pupils.forEach(p => {
    const rect = p.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const angle = Math.atan2(y, x);
    const moveX = Math.cos(angle) * 3;
    const moveY = Math.sin(angle) * 3;
    p.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
});

const character = document.getElementById('character');
const mouth = character.querySelector('.mouth');
const eyes = character.querySelectorAll('.eye');
document.addEventListener('click', () => {
  mouth.classList.add('smile');
  eyes.forEach(e => e.classList.add('blink'));
  setTimeout(() => {
    mouth.classList.remove('smile');
    eyes.forEach(e => e.classList.remove('blink'));
  }, 900);
});
