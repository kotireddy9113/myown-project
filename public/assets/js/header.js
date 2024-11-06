// Function to sanitize HTML to prevent XSS attacks
function sanitizeHTML(str) {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
}

// Function to load the header with user profile
function loadHeader() {
    // Retrieve the username from localStorage; default to 'Guest' if not found
    const username = localStorage.getItem('name') || 'Guest';

    document.getElementById("header").innerHTML = `
        <header>
            <div class="logo">Code Sync</div>
            <nav>
                <a href="./">Home</a>
                <a href="./aboutus">About Us</a>
                <a href="./contact">Contact</a>
            </nav>
            <div class="header-right">
                <button id="theme-toggle" class="theme-toggle" aria-label="Toggle Theme">🌙</button>
                <div class="user-profile">
                    <span class="username">${sanitizeHTML(username)}</span>
                    <button class="user-dropdown-btn" aria-haspopup="true" aria-expanded="false" aria-label="User Menu">▼</button>
                    <div class="user-dropdown-content" aria-label="User Dropdown Menu">
                        <a href="#" id="logout" aria-label="Logout">Logout</a>
                    </div>
                </div>
            </div>
        </header>
    `;

    // Initialize theme based on current settings
    initializeTheme();

    // Add event listeners for user profile interactions
    addUserProfileListeners();
}

// Function to update the username dynamically
function updateUsername(newUsername) {
    const sanitizedUsername = sanitizeHTML(newUsername);
    const usernameElement = document.querySelector('.user-profile .username');

    // Update the username in localStorage
    localStorage.setItem('${username}', sanitizedUsername);

    // Update the displayed username
    if (usernameElement) {
        usernameElement.textContent = sanitizedUsername;
    }
}

// Function to initialize theme based on localStorage
function initializeTheme() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    setTheme(currentTheme);
}

// Theme Toggle Functionality
function addThemeToggleListener() {
    const toggleButton = document.getElementById('theme-toggle');
    toggleButton.addEventListener('click', () => {
        const theme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
        setTheme(theme);
    });
}

function setTheme(theme) {
    const toggleButton = document.getElementById('theme-toggle');
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
        toggleButton.textContent = '☀️';
        toggleButton.setAttribute('aria-label', 'Switch to Light Mode');
    } else {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
        toggleButton.textContent = '🌙';
        toggleButton.setAttribute('aria-label', 'Switch to Dark Mode');
    }
    localStorage.setItem('theme', theme);
}

// Function to handle user profile interactions
function addUserProfileListeners() {
    const dropdownBtn = document.querySelector('.user-dropdown-btn');
    const dropdownContent = document.querySelector('.user-dropdown-content');
    const logoutBtn = document.getElementById('logout');

    // Check if dropdownBtn and dropdownContent exist before adding event listeners
    if (dropdownBtn && dropdownContent) {
        // Toggle dropdown visibility
        dropdownBtn.addEventListener('click', function() {
            const expanded = dropdownBtn.getAttribute('aria-expanded') === 'true' || false;
            dropdownBtn.setAttribute('aria-expanded', !expanded);
            dropdownContent.style.display = expanded ? 'none' : 'block';
        });

        // Close the dropdown when clicking outside
        window.addEventListener('click', function(event) {
            if (!event.target.matches('.user-dropdown-btn') && !event.target.closest('.user-profile')) {
                if (dropdownContent.style.display === 'block') {
                    dropdownContent.style.display = 'none';
                    dropdownBtn.setAttribute('aria-expanded', 'false');
                }
            }
        });
    }

    // Handle logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(event) {
            event.preventDefault();
            logout();
        });
    }
}

// Function to handle logout
function logout() {
    // Clear user data from localStorage
    localStorage.removeItem('username');
    // Optionally, clear other user-related data
    // Redirect to homepage
    window.location.href = 'index';
}

// Simulate login functionality
function login(username) {
    updateUsername(username);
    loadHeader(); // Reload the header with the new username
}

// Add event listener to the login button
document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            const enteredUsername = document.getElementById('loginUsername').value;
            if (enteredUsername) {
                login(enteredUsername); // Call login function with entered username
            }
        });
    }

    // Load the header when the page is first loaded
    loadHeader();
});
