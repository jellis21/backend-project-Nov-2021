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

// Sort flashcards by category
let cards = document.querySelectorAll('.card');
select.addEventListener('change', (e) => {
  mainDiv.innerHTML = '';
  for (const item of cards) {
    if (select.value === 'All') {
      mainDiv.appendChild(item);
    } else if (item.innerHTML.includes(`${select.value}`)) {
      mainDiv.appendChild(item);
      }
  } 
})

// update flashcards in browser
async function handleFetchRequest(url, body, type) {
  const response = await fetch(url, {
    method: type,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body, null,4)
  });
  return response.json();
}

mainDiv.addEventListener('click', handleClick);

function handleClick(e) {
  const target = e.target;
  const id = e.target.id;
  // Clicking "edit" allows you to update
  // Clicking "update" pushes changes to db
  // Clicking "delete" updates db and removes flashcard
  if (target.tagName === 'BUTTON' && target.innerText === "Edit") {
    target.innerText = "Update";
    target.className = "btn btn-dark";
    const targetCard = target.parentElement.parentElement;
    target.parentElement.innerHTML += `
    <button
    class="btn btn-danger delete"
    type="button"
    data-id="${id}"
    > 
    Delete
  </button>`;
    targetCard.querySelector('.cat').innerHTML =
    `<input id="cat" class="bg-secondary" value="${targetCard.querySelector('.cat').innerText}"/>`;
    targetCard.querySelector('.ques').innerHTML =
    `<input id="ques" class="bg-secondary" value="${targetCard.querySelector('.ques').innerText}"/>`;
    targetCard.querySelector('.ans').innerHTML =
    `<input id="ans" class="bg-secondary" value="${targetCard.querySelector('.ans').innerText}"/>`;
  } else if (target.tagName === 'BUTTON' && target.innerText === "Update") {
    const targetCard = target.parentElement.parentElement;
    target.innerText = "Success";
    target.className = "btn btn-success";
    setTimeout(() => {
      target.innerText = "Edit";
      target.className = "btn btn-dark";
    }, 2000);
    const deleteButton = target.parentElement.querySelector('.delete');
    deleteButton.remove()
    const body = {
      id,
      category: document.getElementById('cat').value,
      question: document.getElementById('ques').value,
      answer: document.getElementById('ans').value
    }
    handleFetchRequest(`http://localhost:8080/flashcards/edit`, body, 'POST')
    .then(response => console.log(response.message))

    targetCard.querySelector('.cat').innerHTML = `${targetCard.querySelector('#cat').value}`;
    targetCard.querySelector('.ques').innerHTML = `${targetCard.querySelector('#ques').value}`;
    targetCard.querySelector('.ans').innerHTML = `${targetCard.querySelector('#ans').value}`;
  } else if (target.tagName === 'BUTTON' && target.innerText === "Delete") {
    const dataId = target.getAttribute('data-id');
    fetch(`http://localhost:8080/flashcards/delete/${dataId}`, {
      method: 'DELETE'
    })
    .then(response => console.log(response))
    const targetCard = target.parentElement.parentElement;
    targetCard.remove();
  }
} 