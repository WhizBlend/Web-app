document.addEventListener('DOMContentLoaded', () => {
  const holidayForm = document.getElementById('holidayForm');
  const holidayList = document.getElementById('holidayList');
  const snow = document.getElementById('snowfall');
  const clock = document.getElementById('clock');
  const suggestedButtons = document.querySelectorAll('.suggested-holiday');
  const holidays = JSON.parse(localStorage.getItem('holidays')) || [];

  // Real-Time Clock
  setInterval(() => {
      const now = new Date();
      clock.textContent = now.toLocaleTimeString();
  }, 1000);

  // Add Holiday
  holidayForm.addEventListener('submit', (e) => {
      e.preventDefault();
      addHolidayFromForm();
  });

  // Suggested Holidays
  suggestedButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
          const { name, date, category } = btn.dataset;
          addHoliday({ name, date, category });
      });
  });

  // Add Holiday from Form
  function addHolidayFromForm() {
      const name = document.getElementById('holidayName').value;
      const date = document.getElementById('holidayDate').value;
      const category = document.getElementById('holidayCategory').value;

      addHoliday({ name, date, category });
  }

  // Add Holiday
  function addHoliday({ name, date, category }) {
      const holiday = { name, date, category };
      holidays.push(holiday);
      localStorage.setItem('holidays', JSON.stringify(holidays));
      updateHolidayList();
  }

  // Update Holiday List
  function updateHolidayList() {
      holidayList.innerHTML = '';
      holidays.forEach((holiday, index) => {
          const li = document.createElement('li');
          const holidayDate = new Date(holiday.date);
          const timeRemaining = getTimeRemaining(holidayDate);

          li.innerHTML = `
              ${holiday.name} (${holiday.category}) - ${holiday.date} 
              <span>Time until: ${timeRemaining}</span>
              <button class="delete-btn" data-index="${index}">Delete</button>
          `;

          // Snow Animation for Christmas
          if (holiday.name.toLowerCase() === 'christmas') {
              startSnow();
          }

          holidayList.appendChild(li);
      });

      // Add Delete Event Listeners
      document.querySelectorAll('.delete-btn').forEach((btn) => {
          btn.addEventListener('click', (e) => {
              const index = e.target.dataset.index;
              deleteHoliday(index);
          });
      });
  }

  // Get Time Remaining
  function getTimeRemaining(holidayDate) {
      const now = new Date();
      const timeDiff = holidayDate - now;

      if (timeDiff <= 0) return "It's here!";

      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  // Start Snow Animation for Christmas
  function startSnow() {
      snow.style.display = 'block';
      setInterval(() => {
          const flake = document.createElement('div');
          flake.className = 'snowflake';
          flake.style.left = Math.random() * 100 + 'vw';
          snow.appendChild(flake);

          setTimeout(() => flake.remove(), 8000);
      }, 100);
  }

  // Delete Holiday
  function deleteHoliday(index) {
      holidays.splice(index, 1);
      localStorage.setItem('holidays', JSON.stringify(holidays));
      updateHolidayList();
  }

  // Load Holidays
  updateHolidayList();
});

document.addEventListener('DOMContentLoaded', () => {
    const authSection = document.getElementById('auth-section');
    const appSection = document.getElementById('app-section');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');
    const logoutBtn = document.getElementById('logoutBtn');

    const users = JSON.parse(localStorage.getItem('users')) || {};
    let currentUser = localStorage.getItem('currentUser');

    // Toggle forms
    showRegister.addEventListener('click', () => {
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
    });
    showLogin.addEventListener('click', () => {
        registerForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
    });

    // Register
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('registerUsername').value;
        const password = document.getElementById('registerPassword').value;

        if (users[username]) {
            alert('User already exists!');
        } else {
            users[username] = { password, holidays: [] };
            localStorage.setItem('users', JSON.stringify(users));
            alert('Registration successful! Please login.');
            showLogin.click();
        }
    });

    // Login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        if (users[username] && users[username].password === password) {
            currentUser = username;
            localStorage.setItem('currentUser', currentUser);
            authSection.classList.add('hidden');
            appSection.classList.remove('hidden');
            loadHolidays();
        } else {
            alert('Invalid username or password!');
        }
    });

    // Logout
    logoutBtn.addEventListener('click', () => {
        currentUser = null;
        localStorage.removeItem('currentUser');
        appSection.classList.add('hidden');
        authSection.classList.remove('hidden');
    });

    // Holiday Management (adjust holiday functions to be user-specific)
    // ...
    // Extend existing holiday functions to save/load from users[currentUser].holidays
});


// Reminder Functionality
const reminderInput = document.getElementById('reminderInput');
const addReminderBtn = document.getElementById('addReminderBtn');
const reminderList = document.getElementById('reminderList');
let reminders = JSON.parse(localStorage.getItem('reminders')) || [];

// Load existing reminders
function loadReminders() {
    reminderList.innerHTML = '';
    reminders.forEach((reminder, index) => {
        const li = document.createElement('li');
        li.textContent = reminder;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-reminder-btn';
        deleteBtn.dataset.index = index;
        deleteBtn.addEventListener('click', deleteReminder);
        li.appendChild(deleteBtn);
        reminderList.appendChild(li);
    });
}

// Add new reminder
addReminderBtn.addEventListener('click', () => {
    const reminderText = reminderInput.value.trim();

    if (reminderText === '') {
        alert('Please enter a valid text or number!');
        return;
    }

    reminders.push(reminderText);
    localStorage.setItem('reminders', JSON.stringify(reminders));
    reminderInput.value = '';
    loadReminders();
});

// Delete reminder
function deleteReminder(e) {
    const index = e.target.dataset.index;
    reminders.splice(index, 1);
    localStorage.setItem('reminders', JSON.stringify(reminders));
    loadReminders();
}

// Initialize reminders
loadReminders();


     