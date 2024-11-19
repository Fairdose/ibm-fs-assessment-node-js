const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [
    { username: 'token_user', password: 'token_password'}
];

const secretKey = `${Math.floor((Math.random * 10000 - 1) + 1000)}`

const isValid = (username) => { //returns boolean
    return users.find(user => user.username === username);
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
    const token = req.headers.authorization.replaceAll('"', '');

    const {
        session: { user: username },
        params: { isbn },
        body: { review }
    } = req

    if (token) {
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                res.status(500).json({ message: "Authorization failed" });

                return
            }

            if (Object.hasOwn(books, isbn)) {
                books[isbn].reviews[username] = review

                res.json({
                    messages: "Review posted successfully",
                    book: {...books[isbn]}
                })
            } else {
                res.json({ message: "No such book is found" });
            }
        })
    } else {
        res.status(500).json({ message: "Authorization failed" });
    }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
