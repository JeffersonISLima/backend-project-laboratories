/* Input - Search laboratory by exam name */
const searchLaboratoryByExamName = () => {
  let input, filter, ul, li, a, i;
  input = document.getElementById('search-lab');
  filter = input.value.toUpperCase();
  ul = document.getElementById('menu__laboratories-list');
  li = ul.getElementsByTagName('li');
  for (i = 0; i < li.length; i += 1) {
    a = li[i].getElementsByTagName('a')[0];
    if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = '';
    } else {
      li[i].style.display = 'none';
    }
  }
}

/* Get the modal */
const modal = document.getElementById('exams-list-modal');

/* Get the button that opens the modal */
const btn = document.getElementById('exams-btn-modal');

/* Get the <span> element that closes the modal */
const span = document.getElementsByClassName('close')[0];

/* When the user clicks on the button, open the modal  */
btn.onclick = () => modal.style.display = 'block';

/* When the user clicks on <span> (x), close the modal */
span.onclick = () => modal.style.display = 'none';


/* When the user clicks anywhere outside of the modal, close it */
window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
}