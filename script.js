const myLibrary = [];

// Book constructor
function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Add book
function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

// Display books in table format
function displayTable() {
  const container = document.querySelector("#library");
  container.innerHTML = "";

  const table = document.createElement("table");
  const headerRow = document.createElement("tr");

  for (let prop in myLibrary[0]) {
    const th = document.createElement("th");
    th.textContent = prop;
    headerRow.appendChild(th);
  }
  table.appendChild(headerRow);

  for (let book of myLibrary) {
    const row = document.createElement("tr");
    for (let prop in book) {
      const td = document.createElement("td");
      td.textContent = book[prop];
      row.appendChild(td);
    }
    table.appendChild(row);
  }

  container.appendChild(table);
}

// Display books in card format
function displayCards() {
  const container = document.querySelector("#library");
  container.innerHTML = "";

  for (let book of myLibrary) {
    const card = document.createElement("div");
    card.classList.add("book-card");
    card.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Read:</strong> ${book.read ? "✅ Yes" : "❌ No"}</p>
    `;
    container.appendChild(card);
  }
}

// Ask user how they want to view
function displayBooks() {
  if (myLibrary.length === 0) return;

  const choice = prompt("How would you like to see your library? (table / card)");

  if (choice.toLowerCase() === "table") {
    displayTable();
  } else {
    displayCards(); // default to cards if not table
  }
}

// --- TEST DATA ---
addBookToLibrary("Harry Potter", "Rowling", 400, true);
addBookToLibrary("Atomic Habits", "James Clear", 250, false);
addBookToLibrary("The Hobbit", "Tolkien", 310, true);

// Render
displayBooks();
