const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [
    { username: 'token_user', password: 'token_password'}
];

const secretKey = `${Math.floor((Math.random * 10000 - 1) + 1000)}`

const isValid = (username) => { //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username, password) => { //returns boolean
    const userFound = users.find(user => user.username === username && user.password === password)

    return !!userFound
}

//only registered users can login
regd_users.post("/login", (req, res) => {
    const { username, password } = req.body

    const isAuthenticated = authenticatedUser(username, password)

    if (isAuthenticated) {
        const token = jwt.sign({ username, password }, secretKey, { expiresIn: "1h" });
        res.status(200).json(token)
    } else {
        res.status(500).json({ message: "Invalid username or password" });
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    //Write your code here
    return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
