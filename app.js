const express = require('express');
const path = require('path');
const fs = require('fs');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser'); // Include body-parser
const JDoodle = require('./jdoodle'); // Import the JDoodle module
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Database connection
const connectDB = require('./config/db');
connectDB();

// Middleware
app.use(cookieParser());  // Middleware to parse cookies
app.use(express.json());  // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true }));  // Middleware to parse URL-encoded form data
app.use(bodyParser.urlencoded({ extended: true })); // Middleware for body parsing

// Static file middleware (CSS, JS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'assets')));

// Session setup with FileStore
const sessionDirectory = path.join(__dirname, 'sessions');
if (!fs.existsSync(sessionDirectory)) {
    fs.mkdirSync(sessionDirectory); // Ensure the session directory exists
}

app.use(session({
    store: new FileStore({
        path: sessionDirectory,  // Set the path for storing session files
        ttl: 86400               // Optional: set time to live for sessions (in seconds)
    }),
    secret: 'your-session-secret', // Change this to a secure random string
    resave: false,
    saveUninitialized: true,
}));

// Set Pug as the view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Routes
const registerRoute = require('./routes/registerRoute');
const loginRoute = require('./routes/loginRoute');
const subscribeRoute = require('./routes/subscribeRoute');
const { protect } = require('./middleware/auth');

// Use routes
app.use('/', registerRoute);
app.use('/', loginRoute);
app.use('/', subscribeRoute);

// General routes
app.get('/', (req, res) => res.redirect('/index'));
app.get('/index', (req, res) => res.render('index', { name: 'Code Sync' }));
app.get('/aboutus', (req, res) => res.render('aboutus'));
app.get('/Usersprofile', (req, res) => res.render('users/Usersprofile'));
app.get('/contact', (req, res) => res.render('contact'));
app.get('/Userspractice', (req, res) => res.render('users/Userspractice'));
app.get('/register', (req, res) => res.render('register'));
app.get('/login', (req, res) => res.render('login'));
app.get('/java', (req, res) => res.render('java'));
app.get('/javascript', (req, res) => res.render('javascript'));
app.get('/python', (req, res) => res.render('python'));
app.get('/thankyou', (req, res) => res.render('thankyou'));
app.get('/c', (req, res) => res.render('c'));
app.get('/cplus', (req, res) => res.render('cplus'));
app.get('/subscribe', (req, res) => res.render('subscribe'));
app.get('/chatroom', (req, res) => res.render('chatroom'));

// Protected route
app.get('/Coding', protect, (req, res) => {
    // Make sure to pass the user object if it exists
    res.render('users/coding', { user: req.user || null });
});


// Logout route
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/Coding');
        }
        res.clearCookie('token');  // Optional: clear the token cookie on logout
        res.redirect('/index');
    });
});

// Code Execution Route
// Code Execution Route
app.post('/execute', async (req, res) => {
    const { language, code } = req.body;

    // Mapping for languages and their version indices
    const languageMap = {
        c: 'c',
        cpp: 'cpp',
        java: 'java',
        python3: 'python3',
        javascript: 'javascript'
    };
    
    const versionIndexMap = {
        c: '0',
        cpp: '0',
        java: '0',
        python3: '3',
        javascript: '0'
    };

    const languageCode = languageMap[language]; // Get language code
    const versionIndex = versionIndexMap[language]; // Get version index

    try {
        // Execute the code using JDoodle
        const result = await JDoodle.executeCode(languageCode, versionIndex, code);
        
        // Check if execution was successful
        if (result.isExecutionSuccess) {
            // Render result.pug with the output
            res.render('result', { output: result.output });
        } else {
            res.render('result', { output: 'Error: ' + (result.error || 'Code did not execute successfully.') });
        }
    } catch (error) {
        console.error('Execution error:', error);
        res.render('result', { output: 'Error executing code: ' + error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


console.log(JDoodle); // Log JDoodle object
console.log(typeof JDoodle.executeCode); // Check if it's a function
