const myLibrary = [];
const btnAddBook = document.querySelector('#addBook');
const dialog = document.querySelector('dialog');
const btnConfirm = document.querySelector('#confirm');
const btnCancel = document.querySelector('#cancel');
let book;

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function resetDialog(title, author, pages, read) {
    title.value = "";
    author.value = "";
    pages.value = "";
    read.checked = false;
}

function makeCard(book) {
    const card = document.createElement('div');
    card.classList.add('card');

    const title = document.createElement('h2');
    title.style.textAlign = 'center';
    title.textContent = book.title;
    card.appendChild(title);

    const author = document.createElement('label');
    author.style.textAlign = 'center';
    author.textContent = 'Author: ' + book.author;
    card.appendChild(author);

    const pages = document.createElement('label');
    pages.style.textAlign = 'center';
    pages.textContent = 'Pages: ' + book.pages;
    card.appendChild(pages);

    const read = document.createElement('label');
    read.style.textAlign = 'center';
    if(book.read) {
        read.textContent = 'Read: Yes';
    } else {
        read.textContent = 'Read: No';
    }
    card.appendChild(read);

    const btnContainer = document.createElement('div');
    btnContainer.classList.add('button-container');
    
    const toggleRead = document.createElement('button');
    toggleRead.id = 'toggle';
    toggleRead.textContent = 'Toggle Read';

    const remove = document.createElement('button');
    remove.id = 'remove';
    remove.textContent = 'Remove';
    
    toggleRead.addEventListener('click', () => {
        if(book.read === true) {
            book.read = false;
            read.textContent = 'Read: No';
        } else {
            book.read = true;
            read.textContent = 'Read: Yes';
        }
    });

    remove.addEventListener('click', () => {
        card.remove();
    });

    btnContainer.appendChild(toggleRead);
    btnContainer.appendChild(remove);

    card.appendChild(btnContainer);

    const divContainer = document.querySelector('#container');
    divContainer.appendChild(card);
}

btnAddBook.addEventListener('click', (e) => {
    dialog.showModal();
});

dialog.addEventListener('close', (e) => {
    const title = document.getElementById('title');
    const author = document.getElementById('author');
    const pages = document.getElementById('pages');
    const read = document.getElementById('read');

    if(dialog.returnValue === 'confirm') {
        if(title.value.trim() === "" || author.value.trim() === "" || pages.value.trim() === "") {
            alert("All fields must be filled.");
            dialog.showModal();
        } else {
            book = new Book(title.value, author.value, pages.value, read.checked);
            makeCard(book);
            resetDialog(title, author, pages, read);
        }

    } else if(dialog.returnValue === 'cancel') {
        resetDialog(title, author, pages, read);
        dialog.close();
    }
});