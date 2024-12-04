
const btnSearch = document.querySelector('.btn');
const inputSearch = document.querySelector('input');
const table = document.querySelector('table');
const tbody = document.querySelector('tbody');
const loader = document.querySelector('.loader');
const messageEl = document.querySelector('.text-danger');

btnSearch.addEventListener('click', fetchBooks)


let author = 'tolkien';
const endpoint = `https://openlibrary.org/search.json?author=`;

init();


function init(){
  loader.classList.add('d-none');
  table.classList.add('d-none');
  messageEl.innerHTML = 'Cerca un autore'
}

function fetchBooks(event){
  event.preventDefault()
  loader.classList.remove('d-none');
  messageEl.innerHTML = ''
  table.classList.add('d-none');
  
  author = inputSearch.value;
  axios.get(endpoint + author)
    .then(res => {
      loader.classList.add('d-none');
      const books = res.data.docs.map( book => {
        const {author_name, first_publish_year, isbn, title} = book;
        return{
          author_name,
          first_publish_year,
          isbn,
          title
        }
      });
      printBooks(books)
      
    })
    .catch(e => {
      console.log(e);
      loader.classList.add('d-none');
      messageEl.innerHTML = 'Cerca un autore'
    })
}

function printBooks(books){
  console.log(books);
  if(books.length === 0){
    messageEl.innerHTML = 'Nessun risultato trovato per la tua ricerca';
    return;
  }
  table.classList.remove('d-none');
  tbody.innerHTML = '';
  books.forEach((book, index) => {
    const {author_name, first_publish_year, isbn, title} = book;
    tbody.innerHTML += `
    <tr>
      <td>${index + 1}</td>
      <td>${title}</td>
      <td>${author_name.join(' - ')}</td>
      <td>${first_publish_year}</td>
      <td>${isbn[0]}</td>
    </tr>` 
  })
}