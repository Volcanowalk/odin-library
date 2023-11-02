const library = [];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

Book.prototype.changeRead = function() {
    if(this.read) {
        this.read = false
    } else {
        this.read = true
    }
}

function addBook(title, author, pages, read) {
    let book = new Book(title, author, pages, read)
    library.push(book)
}

function deleteBook(index) {
    library.splice(index, 1)
}

function clearDisplay() {
    document.querySelector('tbody').innerHTML = ""
}

function displayBook() {
    const tbody = document.querySelector("tbody")

    library.forEach((book, index) => {
        let row = tbody.insertRow(-1);

        let cellTitle = row.insertCell(0);
        let cellAuthor = row.insertCell(1);
        let cellPages = row.insertCell(2);
        let cellRead = row.insertCell(3);
        let cellDelete = row.insertCell(4);

        cellTitle.innerHTML = book.title
        cellAuthor.innerHTML = book.author
        cellPages.innerHTML = `${book.pages}`

        let toggleRead = document.createElement('button')
        if(book.read) {
            toggleRead.innerText = 'Read'
        } else {
            toggleRead.innerText = 'Not read'
        }
        toggleRead.setAttribute('class', 'toggleRead')
        toggleRead.addEventListener('click', function(event) {
            if(event.target.innerText === 'Read') {
                event.target.innerText = 'Not read'
                book.changeRead()
            } else {
                event.target.innerText = 'Read'
                book.changeRead()
            }
        })
        cellRead.append(toggleRead)

        let btnDelete = document.createElement('button')
        btnDelete.innerText = "DELETE"
        btnDelete.setAttribute('class', 'btnDelete')
        btnDelete.setAttribute('data-array-index', `${index}`)
        btnDelete.addEventListener('click', function() {
            deleteBook(btnDelete.dataset.arrayIndex)
            //Clear the table
            clearDisplay()
            //Display again
            displayBook()
            
        })
        cellDelete.appendChild(btnDelete)
    })
}



document.addEventListener("DOMContentLoaded", () => {   


    addBook("The Great Gatsby", "F. Scott Fitzgerald", 208, true)

    displayBook()

    const dialog = document.querySelector("dialog")
    const addbook = document.querySelector('.addBook')
    const btnClose = document.querySelector('.btnClose')
    const btnSubmit = document.querySelector('.btnSubmit')

    addbook.addEventListener('click', () => {
        dialog.showModal()
    })

    btnClose.addEventListener('click', () => {
        dialog.close()
    })

    btnSubmit.addEventListener('click', () => {
        let title = document.querySelector('#title').value
        let author = document.querySelector('#author').value
        let pages = document.querySelector('#pages').value
        let read = document.querySelector('#read').checked

        addBook(title, author, pages, read)

        //Clear the table
        clearDisplay()
        //Re-populate the table
        displayBook()

        //Clear the input fields
        document.querySelector('#title').value = ''
        document.querySelector('#author').value = ''
        document.querySelector('#pages').value = ''
        document.querySelector('#read').checked = false
    })

})