const contactContainer = document.querySelector(".contact-container");
const addContact = document.querySelector(".add-contacts");
const enterName = document.querySelector("#name");
const enterSurname = document.querySelector("#surname");
const enterUrl = document.querySelector("#url");
const enterNum = document.querySelector("#number");

let users = JSON.parse(localStorage.getItem("users")) || [];

function render() {
  contactContainer.innerHTML = "";

  users.forEach((item) => {
    contactContainer.innerHTML += `<div class="contact-item">
        <img class="img" src="${item.picture}" alt="" style="width:50px; height:50px">
        <div class="inputs_">
            <span class="name">${item.name}</span>
            <span class="name">${item.surname}</span>
            <span>${item.number}</span>
        </div>
        <div class="contact-item__buttons">
            <button id="${item.id}" class="edit-btn">Edit</button>
            <button id="${item.id}" class="delete-btn">Delete</button>
        </div>
    </div>`;
  });
}

render();

addContact.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    !enterName.value.trim() ||
    !enterSurname.value.trim() ||
    !enterNum.value.trim() ||
    !enterUrl.value.trim()
  ) {
    return;
  }

  const contact = {
    id: Date.now(),
    name: enterName.value,
    surname: enterSurname.value,
    number: enterNum.value,
    url: enterUrl.value,
  };
  users.push(contact);

  localStorage.setItem("users", JSON.stringify(users));

  enterName.value = "";
  enterSurname.value = "";
  enterUrl.value = "";
  enterNum.value = "";

  render();
});

//! Delete

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    users = users.filter((item) => item.id != e.target.id);
    localStorage.setItem("users", JSON.stringify(users));
    render();
  }
});

const editModal = document.querySelector("#edit-modal");
const closeModalBtn = document.querySelector("#close-modal");
const editName = document.querySelector("#edit-name");
const editSurname = document.querySelector("#edit-surname");
const editUrl = document.querySelector("#edit-url");
const editNum = document.querySelector("#edit-number");
const editCancel = document.querySelector("#edit-cancel");
const editSubmit = document.querySelector("#edit-submit");

//! Edit
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit-btn")) {
    editModal.style.visibility = "visible";
    const userToEdit = users.find((item) => item.id == e.target.id);
    editName.value = userToEdit.name;
    editSurname.value = userToEdit.surname;
    editUrl.value = userToEdit.url;
    editNum.value = userToEdit.number;
    editSubmit.id = e.target.id;
  }
});

closeModalBtn.addEventListener("click", (e) => {
  editModal.style.visibility = "hidden";
});

editCancel.addEventListener("click", (e) => {
  editModal.style.visibility = "hidden";
});

editSubmit.addEventListener("click", (e) => {
  if (
    !editName.value.trim() ||
    !editSurname.value.trim() ||
    !editNum.value.trim() ||
    !editUrl.value.trim()
  ) {
    return;
  }
  users = users.map((item) => {
    if (item.id == editSubmit.id) {
      item.name = editName.value;
      item.surname = editSurname.value;
      item.url = editUrl.value;
      item.number = editNum.value;
    }
    return item;
  });
  localStorage.setItem("users", JSON.stringify(users));
  render();
  editModal.style.visibility = "hidden";
});
