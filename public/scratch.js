


// async function dropdownList(url = '', data) {
//   const response = await fetch(url, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data) 
//   });
//   return response; 
// }

// dropdownList('http://localhost:8080/show/all')
// .then(res => console.log(res))
// .catch((err) => console.log(err));


// for (const item of category) {
//   if (nav.innerText.includes(`${item.innerText}`)) {
//     nav.innerHTML += ''
//   } else {
//     nav.innerHTML += `<li><a href="http://localhost:8080/show/${item.innerText}">${item.innerText}</a>`
//   }
// }