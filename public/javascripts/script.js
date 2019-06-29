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