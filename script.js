//getting the form id and item lists(ul) id
let form = document.querySelector("#addTasks");
let itemList = document.querySelector("#addItems");
let textInputEl = document.querySelector("#textInput");

document.addEventListener("DOMContentLoaded", getListFromLocal);

//submit the form
form.addEventListener("submit", addItem); // listen to submit. create a function to add item

// -------- function to create item list ----- //

function addItem(event) {
  event.preventDefault();

  //getting the input id
  let newTasks = document.querySelector("#textInput").value;
  //create new list(li) when it is submitted
  let li = document.createElement("li");

  //add list to localstorage

  saveLocalList(textInputEl.value);

  //add the class
  li.classList = "list-group-item";

  li.appendChild(document.createTextNode(newTasks));

  //edit button
  let editIcon = document.createElement("i");

  editIcon.classList = "fa-regular fa-pen-to-square float-end";

  //create delete button element
  let deleteIcon = document.createElement("i");

  deleteIcon.classList = "fa-solid fa-trash float-end px-2";

  li.appendChild(editIcon);
  li.appendChild(deleteIcon);
  itemList.appendChild(li);

  reset();
}

//remove the list
itemList.addEventListener("click", removeItem);

//function to remove the list
function removeItem(event) {
  event.preventDefault();

  if (event.target.classList.contains("fa-trash")) {
    let li = event.target.parentElement;
    itemList.removeChild(li);
    removeLocalLists(li);
  }
}

itemList.addEventListener("click", editItem);

//edit the list
function editItem(event) {
  event.preventDefault();
  if (event.target.classList.contains("fa-pen-to-square")) {
    let li = event.target.parentElement;

    textInputEl.value = li.innerText;
    console.log(textInputEl.value);
    console.log(li);
    li.remove();
  }
}

// reset the form

const reset = () => {
  textInputEl.value = "";
};

//save to local storage

function saveLocalList(list) {
  //check if i already have the list

  let lists;

  if (localStorage.getItem("lists") === null) {
    lists = [];
  } else {
    lists = JSON.parse(localStorage.getItem("lists"));
  }

  lists.push(list);
  localStorage.setItem("lists", JSON.stringify(lists));
}

// get the lists from localstorage

function getListFromLocal() {
  let lists;

  if (localStorage.getItem("lists") === null) {
    lists = [];
  } else {
    lists = JSON.parse(localStorage.getItem("lists"));
  }

  lists.forEach((list) => {
    //getting the input id
    let newTasks = document.querySelector("#textInput").value;
    //create new list(li) when it is submitted
    let li = document.createElement("li");

    //this will make the lists stay on the window even if you refresh it because it is now save in local storage
    newTasks = list;

    //add the class
    li.classList = "list-group-item";

    li.appendChild(document.createTextNode(newTasks));

    //edit button
    let editIcon = document.createElement("i");

    editIcon.classList = "fa-regular fa-pen-to-square float-end";

    //create delete button element
    let deleteIcon = document.createElement("i");

    deleteIcon.classList = "fa-solid fa-trash float-end px-2";

    li.appendChild(editIcon);
    li.appendChild(deleteIcon);
    itemList.appendChild(li);
  });
}

//remove localstorage

function removeLocalLists(list) {
  let lists;

  if (localStorage.getItem("lists") === null) {
    lists = [];
  } else {
    lists = JSON.parse(localStorage.getItem("lists"));
  }

  const listIndex = list.innerText;
  console.log(list.innerText);

  lists.splice(lists.indexOf(listIndex), 1);
  localStorage.setItem("lists", JSON.stringify(lists));
}
