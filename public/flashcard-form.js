function formatFormData(fd) {
  const data = {};
  for (let key of fd.keys()) {
    data[key] = fd.get(key);
  }

  return data;
}

const handleSubmit = (e) => {
  e.preventDefault();
  const target = e.target;
  const data = new FormData(e.target);
  const body = formatFormData(data);
  postData("http://localhost:8080/flashcards/add", body).then((response) =>
    console.log(response)
  );
};

const form = document.getElementById("form");
form.addEventListener("submit", handleSubmit);
