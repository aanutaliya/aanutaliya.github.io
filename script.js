document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const dateElement = document.getElementById('date');
    const dayElement = document.getElementById('day');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const sessionElement = document.getElementById('session');
    const toggleButton = document.getElementById('toggle-btn');

    // Function to update time in 12-hour and 24-hour formats
    function updateTime() {
        const now = new Date();

        // Update date and day
        const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
        dateElement.textContent = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric'});
        dayElement.textContent = now.toLocaleDateString('en-US', { weekday: 'long' });


        // Update time
        let hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const session = hours >= 12 ? 'PM' : 'AM';

        // Get the current format from the toggle button
        const currentFormat = toggleButton.getAttribute('data-format');

        // Update time format
        if (currentFormat === '12') {
            hours = hours % 12 || 12;
            toggleButton.textContent = '24-hr';
        } else {
            toggleButton.textContent = '12-hr';
        }

        // Display time
        hoursElement.textContent = String(hours).padStart(2, '0');
        minutesElement.textContent = String(minutes).padStart(2, '0');
        secondsElement.textContent = String(seconds).padStart(2, '0');

        // Display session only in 12-hour format
        if (currentFormat === '12') {
            sessionElement.textContent = session;
        } else {
            sessionElement.textContent = ''; // Hide the session
        }
    }

    // Function to toggle time format and update display
    function toggleTimeFormat() {
        const currentFormat = toggleButton.getAttribute('data-format');
        const newFormat = currentFormat === '12' ? '24' : '12';
        toggleButton.setAttribute('data-format', newFormat);
        updateTime();
    }

    // Add event listener to the toggle button
    toggleButton.addEventListener('click', toggleTimeFormat);

    // Initial update
    updateTime();

    // Update time every second
    setInterval(updateTime, 1000);
});
