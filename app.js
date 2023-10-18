import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
const appSettings = {
  databaseURL:
    "https://shopping-list-67f02-default-rtdb.europe-west1.firebasedatabase.app/",
};
const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");
const inputBtn = document.querySelector("#input-btn");
const inputFieldEl = document.querySelector("#input-field");
const ulEl = document.querySelector("#shopping-list");
onValue(shoppingListInDB, function (snapshot) {
  let itemsArray = Object.values(snapshot.val());

  clearItemsListEl();

  for (let i = 0; i < itemsArray.length; i++) {
    let currentItem = itemsArray[i];
    appendItemToBooksListEl(currentItem);
  }
});

inputBtn.addEventListener("click", function () {
  clearItemsListEl()
  let inputValue = inputFieldEl.value;
  inputFieldEl.value = "";
  push(shoppingListInDB, inputValue);
});

function clearItemsListEl() {
  ulEl.innerHTML = "";
}

function appendItemToBooksListEl(itemValue) {
  ulEl.innerHTML += `<li>${itemValue}</li>`;
}
