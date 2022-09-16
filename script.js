import { Stack } from "./stackEngine.js"
import { makeError, makeToastNotification } from "./helper.js"

let stack = new Stack()

document.querySelector(".start").addEventListener("click", () => {
    if (document.querySelector(".menu-input").value != "" && document.querySelector(".start").getAttribute("data-option") == 'circular-stack') {
        stack.size = parseInt(document.querySelector(".menu-input").value)
        show()
        document.querySelector(".menu").classList.remove("active")
    } else if (document.querySelector(".start").getAttribute("data-option") == 'stack') {
        stack.infinity = 'true'
        stack.size = 0
        show()
        document.querySelector(".menu").classList.remove("active")
    } else if (document.querySelector(".start").getAttribute("data-option") == 'circular-stack' && document.querySelector(".start").style.color == "blue") {
        makeToastNotification("Add a size to start")
    }
})

if (screen.height > screen.width) {
    document.querySelector(".error-message").classList.add("phone")
    document.querySelector(".menu-options-container").style.flexDirection = 'column'
    document.querySelector(".menu-options").style.marginBottom = '0.5em'
    document.querySelector(".start").textContent = '^ CHOOSE'
    document.querySelector("#insert").textContent = 'I'
    document.querySelector("#remove").textContent = 'R'
    document.querySelector("#empty").textContent = 'E'
    document.querySelector(".controls").style.gap = "0.2rem"
    document.querySelector(".array-container").style.height = "fit-content"
    document.querySelectorAll(".button").forEach(button => {
        button.style.width = "90%"
    })
    document.querySelector("#hint").style.display = 'none';
} else {
    document.querySelector(".controls").style.flexDirection = "row"
};

const arrayParent = document.querySelector(".array-container")

function show() {


    const array = document.createElement("div")
    array.className = "array"

    if (arrayParent.firstElementChild != null) {
        arrayParent.firstElementChild.setAttribute("id", "first-array")
    }

    arrayParent.appendChild(array)

    if (arrayParent.children.length > 13) {
        arrayParent.removeChild(document.getElementById("first-array"))
    }

    if (stack.size == 0) {
        let boxes = document.createElement('div')
        boxes.className = 'box'
        stack.getStack()[0] == undefined ? "" : boxes.innerHTML = stack.getStack()[0]
        array.appendChild(boxes)
    }

    for (let index = 0; index < stack.size; index++) {
        let boxes = document.createElement('div')
        boxes.className = 'box'
        stack.getStack()[index] == undefined ? "" : boxes.innerHTML = stack.getStack()[index]
        array.appendChild(boxes)
    }

    if (array.children[stack.getCurrent()] != null) {
        array.children[stack.getCurrent()].style.backgroundColor = "orange"
    }

    console.log(`current: ${stack.getCurrent()}`);
    console.log(`current stack size: ${stack.size}`);
    console.log(stack.getStack());
}


document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".menu").classList.add("active")
})

const text = document.getElementById("inputHolder")

document.querySelector("#inputHolder").addEventListener("click", () => {
    document.querySelector("#hint").classList.remove("active")
})

document.querySelector("#source").addEventListener("click", () => {
    window.location.href = 'https://github.com/AceBurgundy/Aceburgundy.github.io'
})

document.querySelector("#stack").addEventListener("click", () => {
    document.querySelector(".start").setAttribute("data-option", "stack")
    document.querySelector(".start").style.color = "red"
    document.querySelector("#circular-stack-text").nextElementSibling.style.display = "none"
    document.querySelector("#circular-stack-text").parentElement.style.backgroundColor = "inherit"
    document.querySelector(".start").textContent = "START"
})

document.querySelector(".menu-input").addEventListener("click", () => {
    document.querySelector(".menu-input").parentElement.style.backgroundColor = "blue"
    document.querySelector(".start").setAttribute("data-option", "circular-stack")
    document.querySelector(".start").style.color = "blue"
    document.querySelector(".start").textContent = "START"
    document.querySelector("#circular-stack-text").parentElement.style.padding = "0.5em"
})
document.querySelector("#circular-stack-text").addEventListener("click", () => {
    document.querySelector("#circular-stack-text").nextElementSibling.style.display = "block"
    document.querySelector("#circular-stack-text").parentElement.style.backgroundColor = "blue"
    document.querySelector("#circular-stack-text").parentElement.style.padding = "0.5em"
    document.querySelector(".start").setAttribute("data-option", "circular-stack")
    document.querySelector(".start").style.color = "blue"
    document.querySelector(".start").textContent = "START"
})

document.querySelector(".start").addEventListener("click", () => {
    setTimeout(() => {
        document.querySelector("#hint").classList.add("active")
    }, 2000);
})

function insertStack() {
    document.querySelector("#hint").classList.remove("active")
    if (stack.insert(text.value) == "Stack overflow!") {
        makeError("Stack Overflow!")
    } else if (text.value.length > 2) {
        makeToastNotification("Choose 2 or less!")
    } else if (text.value.trim() == "") {
        makeToastNotification("Input Needed!")
    } else {
        let sound = new Audio(`sounds/green.mp3`)
        sound.play()
        text.value = ""
        show()
    }
}

document.addEventListener("keyup", (e) => {
    if (!document.querySelector(".menu").classList.contains("active")) {
        if (e.key == 'Enter') {
            insertStack()
        }
    }
})

document.getElementById("insert").addEventListener("click", () => {
    insertStack()
})

document.getElementById("remove").addEventListener("click", () => {
    if (stack.remove() == "Stack underflow") {
        makeError("Stack Underflow!")
    } else {
        let sound = new Audio(`sounds/yellow.mp3`)
        sound.play()
        show()
    }
})

document.querySelector(".reset").addEventListener("click", () => {
    document.querySelector(".prompt").classList.add("active")
})

document.querySelector("#yes").addEventListener("click", () => {
    window.location.reload();
})

document.querySelector("#no").addEventListener("click", () => {
    document.querySelector(".prompt").classList.remove("active")
})

document.querySelector("#empty").addEventListener("click", () => {
    makeToastNotification(stack.empty())
})