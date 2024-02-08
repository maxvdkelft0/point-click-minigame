// Variables
const gameWindow = document.getElementById("gameContainer"); // Game Container
const mainCharacter = document.getElementById("characterContainer"); // Character Container
const offsetCharacter = 16
const door1 = document.getElementById("door1")
const sign = document.getElementById("sign")


// OnClick function
gameWindow.onclick = function (e) {
    var rect = gameWindow.getBoundingClientRect()
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    console.log(e.target.id)
    mainCharacter.style.left = x - offsetCharacter + "px";
    mainCharacter.style.top = y - offsetCharacter + "px";

    switch (e.target.id) {
        case "door1":
            door1.style.opacity = 0.2
            sign.style.opacity = 0.5

            break;

        case "sign":
            sign.style.opacity = 0.2
            door1.style.opacity = 0.5

            break;

        default:
            door1.style.opacity = 0.5
            sign.style.opacity = 0.5

            break;
    }
}