const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
menuToggle.addEventListener('click', () => nav.classList.toggle('open'));

const searchInput = document.getElementById('searchInput');
const roomFilter = document.getElementById('roomFilter');
const cards = [...document.querySelectorAll('.hostel-card')];
const listingCount = document.getElementById('listingCount');
const emptyState = document.getElementById('emptyState');

function filterHostels() {
  const term = searchInput.value.trim().toLowerCase();
  const type = roomFilter.value;
  let shown = 0;
  cards.forEach(card => {
    const matchesText = (card.dataset.name + ' ' + card.dataset.location).includes(term);
    const matchesType = type === 'all' || card.dataset.type === type;
    const visible = matchesText && matchesType;
    card.hidden = !visible;
    if (visible) shown++;
  });
  listingCount.textContent = `${shown} listing${shown === 1 ? '' : 's'}`;
  emptyState.hidden = shown !== 0;
}
document.getElementById('searchBtn').addEventListener('click', filterHostels);
searchInput.addEventListener('input', filterHostels);
roomFilter.addEventListener('change', filterHostels);

const dialog = document.getElementById('accountDialog');
const dialogTitle = document.getElementById('dialogTitle');
const dialogDescription = document.getElementById('dialogDescription');
const studentIdLabel = document.getElementById('studentIdLabel');

function openAccount(title, description, student) {
  dialogTitle.textContent = title;
  dialogDescription.textContent = description;
  studentIdLabel.hidden = !student;
  dialog.showModal();
}
document.getElementById('studentBtn').addEventListener('click', () =>
  openAccount('Student registration', 'Create your student account to browse and request hostel rooms.', true));
document.getElementById('managerBtn').addEventListener('click', () =>
  openAccount('Hostel manager registration', 'Register as a manager to submit and manage hostel listings.', false));
document.getElementById('loginLink').addEventListener('click', event => {
  event.preventDefault();
  openAccount('Login', 'The live login form will verify your account on the server.', true);
});
document.querySelectorAll('.book-btn').forEach(button => button.addEventListener('click', () => {
  openAccount('Request a booking', `Create or sign in to your student account to request ${button.dataset.hostel}.`, true);
}));
document.getElementById('demoSubmit').addEventListener('click', () => {
  alert('This is a front-end prototype. The next development step is connecting registration and login to PHP/MySQL.');
});
