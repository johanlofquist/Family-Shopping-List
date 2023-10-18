import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings = {
    databaseURL: "https://shopping-list-67f02-default-rtdb.europe-west1.firebasedatabase.app/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputBtn = document.querySelector("#input-btn")
const inputFieldEl = document.querySelector("#input-field")
const ulEl = document.querySelector("#shopping-list")


inputBtn.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    inputFieldEl.value = ""
    push(shoppingListInDB, inputValue)
    let liEl = document.createElement("li")
    liEl.textContent = inputValue
    ulEl.append(liEl)

})