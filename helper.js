export function makeToastNotification(message) {
    let toastBox = document.getElementById("toast-message")
    toastBox.textContent = message
    toastBox.classList.add("active")
    setTimeout(() => {
        toastBox.classList.remove("active")
    }, 2000);
}

let sound = new Audio(`sounds/wrong.mp3`)
sound.preload = "auto"

export function makeError(message) {
    sound.play()
    document.querySelector(".error-message").textContent = message
    document.querySelector(".error").classList.add("active")
    setTimeout(() => {
        document.querySelector(".error").classList.remove("active")
    }, 800);
}