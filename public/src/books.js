function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const allBooks = [];
  const borrowed = [];
  const returned = [];

  books.forEach((book) => {
    const borrows = book.borrows;
    borrows.forEach((borrow) => {
      if (borrow.returned === false) borrowed.push(book);
    });
    if (!borrowed.includes(book)) returned.push(book);
  });

  allBooks.push(borrowed, returned);

  return allBooks;
}

function getBorrowersForBook(book, accounts) {
  const borrows = book.borrows;
  const accountsBorrowing = [];
  accounts.forEach((account) => {
    const accountId = account.id;
    borrows.forEach((borrow) => {
      if (borrow.id === accountId && accountsBorrowing.length < 10) {
        account.returned = borrow.returned;
        accountsBorrowing.push(account);
      }
    });
  });
  return accountsBorrowing;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
