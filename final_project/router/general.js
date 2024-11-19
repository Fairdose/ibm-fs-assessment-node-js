const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const { username, password } = req.body;

  if (username && password) {
    const existingUser = users.find(user => user.username === username);

    if (existingUser) {
      res.status(200).json({ message: "User already exists" });
    } else {
      users.push({ username, password });

      res.status(200).json({ message: `${username} successfully registered` });
    }
  } else {
    res.status(200).json({ message: "You must provide both username and password!" });
  }
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.status(200).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const { isbn } = req.params

  const targetBook = books[isbn]

  res.status(200).json(targetBook);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const { author } = req.params

  const authorRegex = new RegExp(author, "i");

  let targetBooks = {}

  for (const [key, value] of Object.entries(books)) {
    if (value.author.match(authorRegex)) {
      targetBooks[key] = value
    }
  }

  res.status(200).json(targetBooks);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const { title } = req.params

  const authorRegex = new RegExp(title, "i");

  let targetBooks = {}

  for (const [key, value] of Object.entries(books)) {
    if (value.title.match(authorRegex)) {
      targetBooks[key] = value
    }
  }

  res.status(200).json(targetBooks);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const { isbn } = req.params

  const { title, reviews } = books[isbn]

  res.status(200).json({ isbn, title, reviews });
});

module.exports.general = public_users;
