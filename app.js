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
const html = document.querySelector("#myHtml")


onValue(shoppingListInDB, function (snapshot) {
  if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val());

    clearItemsListEl();

    for (let i = 0; i < itemsArray.length; i++) {
      let currentItem = itemsArray[i];
      let currentItemID = currentItem[0];
      let currentItemValue = currentItem[1];
      appendItemToItemsListEl(currentItem);
    }
  } else {
    ulEl.innerHTML = ""
  }
});

inputBtn.addEventListener("click", function () {
  clearItemsListEl();
  let inputValue = inputFieldEl.value;
  inputFieldEl.value = "";
  push(shoppingListInDB, inputValue);
  inputFieldEl.focus()
});

function clearItemsListEl() {
  ulEl.innerHTML = "";
}

function appendItemToItemsListEl(item) {
  let itemID = item[0];
  let itemValue = item[1];
  let newEl = document.createElement("li");
  newEl.textContent = itemValue;
  newEl.classList ="noAction"
  newEl.addEventListener("click", function (e) {
    if (e.target.style.color == "rgb(253, 253, 253)") {  
      let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`);
      remove(exactLocationOfItemInDB);
      return
    }
    e.target.style.backgroundColor = "#ee2b4f"
    e.target.style.color = "#FDFDFD"
  });
  ulEl.append(newEl);
}

html.addEventListener("click", function(e) {
  console.log(e.target.id)
  var myClass = e.target.classList;
  if(myClass!="noAction"){
    let liEl = document.getElementsByTagName("li")
    for (let i = 0; i < liEl.length; i++) {
      liEl[i].style.backgroundColor = "#FFFDF8"
      liEl[i].style.color = "black"      
  }
}})

