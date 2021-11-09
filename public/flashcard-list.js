const select = document.getElementById('select');
const category = document.getElementsByTagName('h4');
const mainDiv = document.getElementById('accordion');
const nav = document.getElementById('nav');

for (const item of category) {
  if (select.innerText.includes(`${item.innerText}`)) {
    select.innerHTML += ''
  } else {
    select.innerHTML += `<option value="${item.innerHTML}">${item.innerHTML}</option>`
  }
}

// need to complete. Not filtering flashcards properly
select.addEventListener('change', (e) => {
  e.preventDefault();
  console.log(select.value)
  fetch(`http://localhost:8080/show/:${select.value}`)
  .then((res) => res.text())
  .then((data) => {
    mainDiv.innerHTML = data
  })
})


mainDiv.addEventListener('click', handleClick)


function handleClick(e) {
  // console.log(e.target.id)
const id = e.target.id;
fetch(`http://localhost:8080/edit/${id}`)
.then(json => json.json())
.then(response => console.log(response))
} 