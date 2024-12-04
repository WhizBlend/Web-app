document.addEventListener('DOMContentLoaded', () => {
    const businessLoginForm = document.getElementById('businessLoginForm');
    const reminderForm = document.getElementById('businessReminderForm');
    const reminderSection = document.getElementById('business-reminder-section');
    const loginStatus = document.getElementById('loginStatus');
    const reminderList = document.getElementById('businessReminderList');
    const validCredentials = { username: 'admin', password: '1234' };
    const businessReminders = JSON.parse(localStorage.getItem('businessReminders')) || [];

    // Login Functionality
    businessLoginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('businessUsername').value;
        const password = document.getElementById('businessPassword').value;

        if (username === validCredentials.username && password === validCredentials.password) {
            loginStatus.textContent = 'Login successful!';
            reminderSection.style.display = 'block';
            businessLoginForm.style.display = 'none';
        } else {
            loginStatus.textContent = 'Invalid credentials. Try again.';
        }
    });

    // Add Reminder
    reminderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('reminderTitle').value;
        const date = document.getElementById('reminderDate').value;
        const details = document.getElementById('reminderDetails').value;

        const reminder = { title, date, details };
        businessReminders.push(reminder);
        localStorage.setItem('businessReminders', JSON.stringify(businessReminders));
        updateReminderList();
        reminderForm.reset();
    });

    // Update Reminder List
    function updateReminderList() {
        reminderList.innerHTML = '';
        businessReminders.forEach((reminder, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${reminder.title}</strong> - ${reminder.date}
                <p>${reminder.details}</p>
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;
            reminderList.appendChild(li);
        });

        // Add Delete Functionality
        document.querySelectorAll('.delete-btn').forEach((btn) => {
            btn.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                businessReminders.splice(index, 1);
                localStorage.setItem('businessReminders', JSON.stringify(businessReminders));
                updateReminderList();
            });
        });
    }

    // Initial Load
    updateReminderList();
});
