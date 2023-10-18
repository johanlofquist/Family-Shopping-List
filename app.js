import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
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
  let itemsArray = Object.entries(snapshot.val());

  clearItemsListEl();

  for (let i = 0; i < itemsArray.length; i++) {
    let currentItem = itemsArray[i];
    let currentItemID = currentItem[0];
    let currentItemValue = currentItem[1];
    appendItemToItemsListEl(currentItem);
  }
});

inputBtn.addEventListener("click", function () {
  clearItemsListEl();
  let inputValue = inputFieldEl.value;
  inputFieldEl.value = "";
  push(shoppingListInDB, inputValue);
});

function clearItemsListEl() {
  ulEl.innerHTML = "";
}

function appendItemToItemsListEl(item) {
  let itemID = item[0];
  let itemValue = item[1];
  let newEl = document.createElement("li");
  newEl.textContent = itemValue;
  newEl.addEventListener("click", function() {
    let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
    remove(exactLocationOfItemInDB)
  })
  ulEl.append(newEl);
}
