const createError = require("http-errors");

let bookList = [];
let idno = 0;

exports.index = function (req, res) {
  res.send(bookList);
};

exports.create = function (req, res) {
  if (!req.body.title) {
    return next(createError(400, "title is required"));
  } else if (!req.body.author) {
    return next(createError(400, "author is required"));
  }
  bookList.push({
    id: idno,
    title: req.body.title,
    author: req.body.author,
    read: req.body.read,
  });
  res.send({ result: true });
  idno++;
};

exports.show = function (req, res, next) {
  const bookListitem = bookList.find((book) => book.id == req.params.id);
  if (!bookListitem) {
    return next(createError(404, "no book with that id"));
  }
  res.send(bookListitem);
};

exports.delete = function (req, res, next) {
  const bookListitem = bookList.find((book) => book.id == req.params.id);
  if (!bookListitem) {
    return next(createError(404, "no book with that id"));
  }
  bookList = bookList.filter((book) => book.id != req.params.id);
  res.send({ result: true });
};

exports.update = function (req, res, next) {
  const bookListitem = bookList.find((book) => book.id == req.params.id);
  if (!req.body.title && !req.body.author && !req.body.read) {
    return next(createError(400, "something is required to be updated"));
  }
  if (!bookListitem) {
    return next(createError(404, "no book with that id"));
  }
  bookList = bookList.map((book) => {
    if (book.id == req.params.id) {
      book.title = req.body.title || book.title;
      book.author = req.body.author || book.author;
      book.read = req.body.read || book.read;
    }
    return book;
  });
  res.send({ result: true });
};
