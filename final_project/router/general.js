const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Get the book list available in the shop
public_users.get('/',async function (req, res) {
  const fetchBooks = async () => books

  const allBooks = await fetchBooks();

  res.status(200).json(allBooks);
});

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

// Get book details based on ISBN
public_users.get('/isbn/:isbn',async function (req, res) {
  const { isbn } = req.params

  const findBook = () =>  new Promise((resolve, reject) => {
    if (books[isbn]) {
      resolve(books[isbn]);
    } else {
      reject({ message: 'No such book'})
    }
  })

  const bookResponse = await findBook();

  res.status(200).json(bookResponse);
 });

async function findBooksByAuthor(authorRegex) {
  return new Promise((resolve, reject) => {
    try {
      let targetBooks = {};

      for (const [key, value] of Object.entries(books)) {
        if (value.author.match(authorRegex)) {
          targetBooks[key] = value;
        }
      }

      resolve(targetBooks);
    } catch (error) {
      reject(error);
    }
  });
}
  
// Get book details based on author
public_users.get('/author/:author',async function (req, res) {
  const { author } = req.params

  const authorRegex = new RegExp(author, "i");

  const targetBooks = await findBooksByAuthor(authorRegex);

  res.status(200).json(targetBooks);
});

async function findBooksByTitle(titleRegex) {
  return new Promise((resolve, reject) => {
    try {
      let targetBooks = {};

      for (const [key, value] of Object.entries(books)) {
        if (value.title.match(titleRegex)) {
          targetBooks[key] = value;
        }
      }

      resolve(targetBooks);
    } catch (error) {
      reject(error);
    }
  });
}

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const { title } = req.params

  const titleRegex = new RegExp(title, "i");

  let targetBooks = findBooksByTitle(titleRegex);

  res.status(200).json(targetBooks);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const { isbn } = req.params

  const { title, reviews } = books[isbn]

  res.status(200).json({ isbn, title, reviews });
});

module.exports.general = public_users;
