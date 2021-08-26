function findAccountById(accounts, id) {
  const found = accounts.filter((account) => account.id === id);
  return found[0];
}

function sortAccountsByLastName(accounts) {
  accounts.sort((acc1, acc2) => {
    const lastName1 = acc1.name.last.toLowerCase();
    const lastName2 = acc2.name.last.toLowerCase();

    return lastName1 > lastName2 ? 1 : -1;
  });
  return accounts;
}
function getTotalNumberOfBorrows(account, books) {
  const accountId = account.id;
  let num = 0;
  books.forEach((book) => {
    const borrows = book.borrows;

    borrows.forEach((borrow) => {
      if (borrow.id === accountId) num++;
    });
  });
  return num;
}

const checkOutHelper = (account, books) => {
  const accountId = account.id;
  const checkedOut = [];
  books.forEach((book) => {
    const borrows = book.borrows;
    borrows.forEach((borrow) => {
      if (borrow.id === accountId && borrow.returned === false)
        checkedOut.push(book);
    });
  });
  return checkedOut;
};

function getBooksPossessedByAccount(account, books, authors) {
  const accountId = account.id;

  const checkedOut = checkOutHelper(account, books);
  let final = [];

  checkedOut.forEach((book) => {
    authors.forEach((author) => {
      if (book.authorId === author.id) {
        book.author = { ...author };
        final.push(book);
      }
    });
  });
  return final;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
