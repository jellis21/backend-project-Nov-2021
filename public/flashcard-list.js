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
  
  if (target.tagName === 'BUTTON' && target.innerText === "Update") {
    const body = {
      id,
      category: document.getElementById('cat').value,
      question: document.getElementById('ques').value,
      answer: document.getElementById('ans').value
    }
    handleFetchRequest(`http://localhost:8080/edit`, body, 'POST')
    .then(response => console.log(response.message))
  } else if (target.className === 'cat') {
    target.innerHTML = `
      <input id="cat" value="${target.innerText}"/>
    `;
  } else if (target.className === 'ques') {
    target.innerHTML = `
      <input id="ques" value="${target.innerText}"/>
    `;
  } else if (target.className === 'ans') {
    target.innerHTML = `
      <input id="ans" value="${target.innerText}"/>
    `;
  }
    
} 