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

     