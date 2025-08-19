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

// Remove book helper
function removeBook(id) {
  const index = myLibrary.findIndex(book => book.id === id);
  if (index !== -1) {
    myLibrary.splice(index, 1); // remove from array
    displayBooks(); // re-render
  }
}

// Display books in table format
function displayTable() {
  const container = document.querySelector("#library");
  container.innerHTML = "";

  const table = document.createElement("table");
  table.innerHTML = `
    <tr>
      <th>Title</th><th>Author</th><th>Pages</th><th>Read</th><th>Action</th>
    </tr>
  `;

  myLibrary.forEach(book => {
    const row = document.createElement("tr");
    row.dataset.id = book.id;

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.pages}</td>
      <td>${book.read ? "✅" : "❌"}</td>
      <td><button class="removeBtn">Remove</button></td>
    `;

    document.querySelector("#removeBtn").addEventListener("click",()=>{
        removeBook(book.id);
    })

    table.appendChild(row);
  });

  container.appendChild(table);
}

// Display books in card format
function displayCards() {
  const container = document.querySelector("#library");
  container.innerHTML = "";

  myLibrary.forEach(book => {
    const card = document.createElement("div");
    card.className = "book-card";
    card.dataset.id = book.id;

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Read:</strong> ${book.read ? "✅ Yes" : "❌ No"}</p>
      <button class="removeBtn">Remove</button>
    `;

    card.querySelector(".removeBtn").addEventListener("click", () => {
      removeBook(book.id);
    });

    container.appendChild(card);
  });
}

// Ask user how they want to view
function displayBooks() {
  const viewToggle = document.querySelector("#viewToggle");
  if (viewToggle.checked) {
    displayTable();
  } else {
    displayCards();
  }
}

// --- TEST DATA ---
addBookToLibrary("Harry Potter", "Rowling", 400, true);
addBookToLibrary("Atomic Habits", "James Clear", 250, false);
addBookToLibrary("The Hobbit", "Tolkien", 310, true);

// Render
displayBooks();

let opnBtn = document.querySelector("#newBook");
let closeBtn = document.querySelector("#closeButton");
let dialog = document.querySelector("#bookDialog");
let form = document.querySelector("#bookForm");

opnBtn.addEventListener("click", ()=> dialog.showModal());
closeBtn.addEventListener("click", ()=> dialog.close());

form.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent page reload

  const title = document.querySelector("#title").value.trim();
  const author = document.querySelector("#author").value.trim();
  const pages = document.querySelector("#pages").value;
  const read = document.querySelector("#read").checked;

  if (!title || !author || !pages) return;

  addBookToLibrary(title, author, pages, read);

  form.reset();
  dialog.close();

  displayBooks(); // re-render after adding new book
});

// re-render if user changes view toggle
document.querySelector("#viewToggle").addEventListener("change", displayBooks);

