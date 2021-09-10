const express = require("express");
const router = express.Router();
const books = require("./booksController");

/* GET home page. */
router.get("/books", books.index);
router.post("/books/create", books.create);
router.get("/books/:id", books.show);
router.delete("/books/:id", books.delete);
router.put("/books/:id", books.update);

module.exports = router;
