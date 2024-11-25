document.addEventListener('DOMContentLoaded', () => {
    const holidayForm = document.getElementById('holidayForm');
    const holidayList = document.getElementById('holidayList');
  
    // Load saved holidays from localStorage
    const savedHolidays = JSON.parse(localStorage.getItem('holidays')) || [];
    savedHolidays.forEach(addHolidayToList);
  
    holidayForm.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const holidayName = document.getElementById('holidayName').value;
      const holidayDate = document.getElementById('holidayDate').value;
  
      if (holidayName && holidayDate) {
        const holiday = { name: holidayName, date: holidayDate };
        savedHolidays.push(holiday);
  
        // Save to localStorage
        localStorage.setItem('holidays', JSON.stringify(savedHolidays));
  
        addHolidayToList(holiday);
        holidayForm.reset();
      }
    });
  
    function addHolidayToList(holiday) {
      const li = document.createElement('li');
      const today = new Date();
      const holidayDate = new Date(holiday.date);
  
      const timeDiff = holidayDate - today;
      const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  
      li.textContent = `${holiday.name} - ${holiday.date} (${daysLeft} days left)`;
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Remove';
      deleteButton.style.background = '#dc3545';
      deleteButton.style.color = 'white';
      deleteButton.style.border = 'none';
      deleteButton.style.padding = '5px 10px';
      deleteButton.style.borderRadius = '5px';
      deleteButton.style.cursor = 'pointer';
  
      deleteButton.addEventListener('click', () => {
        holidayList.removeChild(li);
        const index = savedHolidays.findIndex((h) => h.name === holiday.name && h.date === holiday.date);
        if (index > -1) {
          savedHolidays.splice(index, 1);
          localStorage.setItem('holidays', JSON.stringify(savedHolidays));
        }
      });
  
      li.appendChild(deleteButton);
      holidayList.appendChild(li);
    }
  });