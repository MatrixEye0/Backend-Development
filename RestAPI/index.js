const express = require('express'); // Import Express framework
const fs = require('fs'); // Import File System module to read/write files
const user = require('./MOCK_DATA.json'); // Import user data from JSON file

const app = express(); // Create an Express application
const port = 3000; // Port number on which server will run


// ==================== MIDDLEWARE ====================

// Parse incoming JSON data from request body
app.use(express.json());

// Parse form data (x-www-form-urlencoded) from request body
app.use(express.urlencoded({ extended: true }));


// ==================== GET REQUEST ====================

// GET request: Get all users in JSON format
app.get('/', (req, res) => {
    return res.json(user);
});


// GET request: Display all users as HTML
app.get('/users', (req, res) => {

    const html = `
        <ul>
            ${user.map(u =>
                `<li>${u.id} ${u.first_name} ${u.last_name}</li>`
            ).join('')}
        </ul>
    `;

    res.send(html);
});


// ==================== DYNAMIC ROUTE ====================

// GET request with dynamic URL parameter
// Example: /user/5 → get user whose id is 5
app.get('/user/:id', (req, res) => {

    // Get id from URL parameter
    // req.params.id is a string, so convert it to number
    const id = Number(req.params.id);

    // Find the user whose id matches the requested id
    const foundUser = user.find(u => u.id === id);

    // Send the found user as JSON response
    return res.json(foundUser);
});


// ==================== POST REQUEST ====================

// POST request: Add a new user
app.post('/userpost', (req, res) => {

    // Check the data received from Postman/client
    console.log("POST request received");
    console.log(req.body);

    // Get new user data from request body
    const newUser = req.body;

    // Create new user and generate a new id
    const newUserWithId = {
        ...newUser,
        id: user.length + 1
    };

    // Add new user to the users array
    user.push(newUserWithId);

    // Save updated users array back to MOCK_DATA.json
    fs.writeFileSync(
        './MOCK_DATA.json',
        JSON.stringify(user, null, 2)
    );

    // Send success response to client/Postman
    return res.json({
        status: "success",
        user: newUserWithId
    });
});


// ==================== START SERVER ====================

// Start Express server and listen on port 3000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});