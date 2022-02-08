const addEl = document.querySelector("#add-el")
const inputEl = document.querySelector("#input-el")
const todoListEl = document.querySelector(".todoList")
const messageEl = document.querySelector(".footer span")
let todos = []

getLocalStorage()
//add button activate
inputEl.onkeyup = () => {
    let data = inputEl.value

    if (data.trim() != 0) {
        addEl.classList.add("active")
    } else {
        addEl.classList.remove("active")
    }
}

// listen for using return/enter key
inputEl.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault()
        addEl.click()
    }
})

addEl.addEventListener("click", () => {
    add()
})

//adding input value to todos array and local storage
let add = () => {
    todo = inputEl.value
    inputEl.value = ""
    inputEl.focus()
    todos.push(todo)
    console.log(todos)
    render(todos)
    saveToLocalStorage(todos)
}

// rendering values in array to screen
function render(todos) {
    let lists = ""
    todos.forEach((i) => {
        lists += `
        <li>${i} <span><i class="fas fa-trash" ></i></span></li>
    `
    })
    todoListEl.innerHTML = lists
    messageEl.textContent = `You have ${todos.length} pending tasks`
}

//saving array to local storage
let saveToLocalStorage = (todos) => {
    localStorage.setItem("savedTodo", JSON.stringify(todos))
    console.log(localStorage.getItem("savedTodo"))
}

// listen for click span or icon to delete spesific item
todoListEl.addEventListener("click", (e) => {
    if (e.target.tagName.toLowerCase() === "span") {
        const deleteBtn = e.target
        const li = deleteBtn.parentNode
        let index = li.innerText.trim()
        todos.splice(todos.indexOf(index), 1)
        saveToLocalStorage(todos)
        render(todos)
    } else if (e.target.tagName.toLowerCase() === "i") {
        const deleteBtn = e.target
        const li = deleteBtn.parentNode.parentNode
        let index = li.innerText.trim()
        todos.splice(todos.indexOf(index), 1)
        saveToLocalStorage(todos)
        render(todos)
    }
})

//checking local storage if there is any value before using app
function getLocalStorage() {
    let checkLocalStorage = JSON.parse(localStorage.getItem("savedTodo"))
    if (checkLocalStorage) {
        todos = checkLocalStorage
        render(todos)
    }
}

//delete localstorage and array
let deleteAll = () => {
    localStorage.clear()
    todos = []
    render(todos)
}
