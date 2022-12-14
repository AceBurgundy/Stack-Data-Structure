import { Stack } from "./stack.js"
import { makeError, makeToastNotification } from "./helper.js"

let stack = new Stack()

document.addEventListener("DOMContentLoaded", () => {
    menu.classList.add("active")
})

const startButton = document.querySelector(".start")
const menuInput = document.querySelector(".menu-input")
const menu = document.getElementById("menu")
const hint = document.getElementById("hint")

const context = new AudioContext()
let audioFiles = {}
let sound = ["green", "yellow"]

for (let index = 0; index < sound.length; index++) {

    fetch(`sounds/${sound[index]}.mp3`)
        .then(data => data.arrayBuffer())
        .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
        .then(decodedAudio => {
            audioFiles[sound[index]] = decodedAudio
        })

}

function playSound(color) {
    const play = context.createBufferSource()
    play.buffer = audioFiles[color]
    play.connect(context.destination)
    play.start(context.currentTime)
}

startButton.addEventListener("click", (event) => {

    const gameMode = startButton.getAttribute("data-option")

    if (gameMode == 'with-size-stack') {

        if (menuInput.value == "") {
            makeToastNotification("Cannot be empty")
            event.preventDefault()
            return false
        }

        if (menuInput.value > 6 && menuInput.value < 1) {
            makeToastNotification("You can choose up to 6 only")
            event.preventDefault()
            return false
        }

        stack.setSize(menuInput.value)
        showStack()
        menu.classList.remove("active")

    }

    if (gameMode == 'stack') {
        stack.playWithNoSize(true)
        stack.setSize(0)
        showStack()
        menu.classList.remove("active")
        document.getElementById("middle").style.alignItems = "flex-end"
        document.querySelector(".array-container").style.alignItems = "flex-end"
    }

    setTimeout(() => {
        hint.classList.add("active")
    }, 2000);

})

const arrayContainer = document.querySelector(".array-container")

function showStack() {
    const array = document.createElement("div")
    array.className = "array"

    if (arrayContainer.firstElementChild != null) {
        arrayContainer.firstElementChild.setAttribute("id", "first-array")
    }

    arrayContainer.appendChild(array)

    if (arrayContainer.children.length > 17) {
        arrayContainer.removeChild(document.getElementById("first-array"))
    }

    if (stack.getSize() == 0) {
        let boxes = document.createElement('div')
        boxes.className = 'box'
        stack.getStack()[0] == undefined ? "" : boxes.innerHTML = stack.getStack()[0]
        array.appendChild(boxes)
    }

    for (let index = 0; index < stack.getSize(); index++) {
        let boxes = document.createElement('div')
        boxes.className = 'box'
        stack.getStack()[index] == undefined ? "" : boxes.innerHTML = stack.getStack()[index]
        array.appendChild(boxes)
    }

    if (array.children[stack.getCurrent()] != null) {
        array.children[stack.getCurrent()].style.backgroundColor = "orange"
    }

    if (array.children[stack.getCurrent()] != undefined) {
        document.getElementById("orange").innerHTML = array.children[stack.getCurrent()].textContent
    }
}

const gameInput = document.getElementById("inputHolder")

gameInput.addEventListener("click", () => {
    hint.classList.remove("active")
})

const game = document.getElementById("game")

// push logic
function insertStack() {

    if (gameInput.value.length > 2) {
        makeToastNotification("Choose 2 or less!")
        return false
    }

    if (gameInput.value.trim() == "") {
        makeToastNotification("Input Needed!")
        return false
    }

    if (screen.height > screen.width) {
        game.scrollLeft = game.scrollWidth
    }

    if (stack.overflow()) {
        makeError("Stack Overflow!")
        return false
    }

    playSound("green")
    stack.insert(gameInput.value)
    gameInput.value = ""
    showStack()
}

// calls insertStack() when enter is press
document.addEventListener("keyup", (event) => {

    hint.classList.remove("active")

    if (!menu.classList.contains("active")) {
        if (event.key == 'Enter') {
            insertStack()
        }
    }
})

// calls insertStack() on click
document.getElementById("insert").addEventListener("click", () => {
    hint.classList.remove("active")
    insertStack()
})

// pops element of the stack
document.getElementById("remove").addEventListener("click", (event) => {

    hint.classList.remove("active")

    if (screen.height > screen.width) {
        game.scrollLeft = game.scrollWidth
    }

    if (stack.underflow()) {
        makeError("Stack Underflow!")
        event.preventDefault()
    } else {
        playSound("yellow")
        stack.remove()
        showStack()
    }
})

document.querySelector(".reset").addEventListener("click", () => {
    document.querySelector(".prompt").classList.add("active")
})

document.getElementById("yes").addEventListener("click", () => {
    window.location.reload();
})

document.getElementById("no").addEventListener("click", () => {
    document.querySelector(".prompt").classList.remove("active")
})

document.getElementById("empty").addEventListener("click", () => {

    hint.classList.remove("active")

    if (stack.empty()) {
        makeToastNotification("Stack is empty")
    } else {
        makeToastNotification("Stack is not empty")
    }
})

// Media Queries
if (window.screen.availHeight > window.screen.availWidth) {
    document.querySelector(".error-message").classList.add("phone")
    document.querySelector(".menu-options-container").style.flexDirection = 'column'
    document.querySelector(".menu-options").style.marginBottom = '0.5em'
    startButton.textContent = '^ CHOOSE'
    document.getElementById("insert").textContent = 'I'
    document.getElementById("remove").textContent = 'R'
    document.getElementById("empty").textContent = 'E'
    document.querySelector(".controls").style.gap = "0.2rem"
    document.querySelector(".array-container").style.height = "fit-content"
    document.querySelectorAll(".button").forEach(button => {
        button.style.width = "90%"
    })
    hint.style.display = 'none';
    document.getElementById("bottom").style.position = "fixed";
    document.getElementById("bottom").style.bottom = "1%";
    document.getElementById("top").style.position = "fixed";
    document.getElementById("top").style.top = "1%";
    document.querySelector(".toast-message").style.width = "80%"
    document.querySelector(".prompt-options").style.flexDirection = "column"
    document.getElementById("with-size-stack").style.width = "100%"
};

// Menu UI Logic
const circularStackText = document.getElementById("with-size-stack-text")

document.getElementById("stack").addEventListener("click", (event) => {
    startButton.setAttribute("data-option", "stack")
    startButton.style.color = "red"
    event.target.parentElement.style.backgroundColor = "red"
    event.target.parentElement.style.padding = "0.5em"
    circularStackText.nextElementSibling.style.display = "none"
    circularStackText.parentElement.style.backgroundColor = "inherit"
    startButton.textContent = "START"
})

menuInput.addEventListener("click", (event) => {
    event.target.parentElement.style.backgroundColor = "blue"
    startButton.setAttribute("data-option", "with-size-stack")
    startButton.style.color = "blue"
    startButton.textContent = "START"
    circularStackText.parentElement.style.padding = "0.5em"
})

circularStackText.addEventListener("click", (event) => {
    event.target.nextElementSibling.style.display = "block"
    event.target.parentElement.style.backgroundColor = "blue"
    event.target.parentElement.style.padding = "0.5em"
    startButton.setAttribute("data-option", "with-size-stack")
    startButton.style.color = "blue"
    startButton.textContent = "START"
})