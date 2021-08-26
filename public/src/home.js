function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  const borrowed = [];
  books.forEach((book) => {
    const borrows = book.borrows;
    borrows.forEach((borrow) => {
      if (borrow.returned === false) borrowed.push(book);
    });
  });

  return borrowed.length;
}

function getMostCommonGenres(books) {
  const genres = books.reduce((acc, book) => {
    if (!acc[book.genre]) {
      acc[book.genre] = 1;
    } else {
      acc[book.genre]++;
    }

    return acc;
  }, {});

  let result = Object.keys(genres).map((genre) => {
    const obj = { name: genre, count: genres[genre] };
    return obj;
  });

  result.sort((genre1, genre2) => {
    return genre1.count > genre2.count ? -1 : 1;
  });
  return result.slice(0, -1);
}

function getMostPopularBooks(books) {
  const populars = books.reduce((acc, book) => {
    if (!acc[book.title]) {
      acc[book.title] = book.borrows.length;
    }
    return acc;
  }, {});

  let result = Object.keys(populars).map((pop) => {
    const obj = { name: pop, count: populars[pop] };
    return obj;
  });
  result.sort((book1, book2) => {
    return book1.count > book2.count ? -1 : 1;
  });
  return result.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  const counter = books.reduce((accumulator, { authorId, borrows }) => {
    accumulator[authorId]
      ? accumulator[authorId].push(borrows.length)
      : (accumulator[authorId] = [borrows.length]);
    return accumulator;
  }, {});
  //console.log(counter)

  for (let id in counter) {
    const sum = counter[id].reduce((one, two) => one + two);
    counter[id] = sum;
  }
  //console.log(counter)

  const sorted = sortKeys(counter);
  //console.log(sortedKeys)

  const authorArray = sorted
    .map((authorId) => {
      const {
        name: { first, last },
      } = authors.find(({ id }) => id === parseInt(authorId));

      const name = `${first} ${last}`;
      return { name, count: counter[authorId] };
    })
    .slice(0, 5);

  //console.log(authorArray);
  return authorArray;
}

function sortKeys(object) {
  const keys = Object.keys(object);
  const sortedKeys = keys.sort((itemA, itemB) => {
    if (object[itemA] > object[itemB]) {
      return -1;
    } else if (object[itemA] < object[itemB]) {
      return 1;
    } else {
      return 0;
    }
  });
  return sortedKeys;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
