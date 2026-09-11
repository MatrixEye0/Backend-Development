const express = require("express");
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 7000;

// Built-in middleware
app.use(express.json());

// Custom middleware
app.use((req, res, next) => {
    next();
});

app.get("/", (req, res) => {
    res.send("<h1>Home Page</h1>");
});

app.get("/about", (req, res) => {
    res.send("<h1>About Page</h1>");
});

app.get("/contact", (req, res) => {
    res.send("<h1>Contact Page</h1>");
});

// error page middleware
app.use((req, res) => {
    res.status(404).send("<h1>404 - Page Not Found</h1>");
});

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
});