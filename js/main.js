// Main Variables
const gameWindow = document.getElementById("gameContainer"); // Game Container
const mainCharacter = document.getElementById("characterContainer"); // Character Container
const offsetCharacter = 16 // Offset in PX
const door1 = document.getElementById("door1") // Door 1 ID
const sign = document.getElementById("sign") // Sign ID

// Game states
gameState = {
    "door2locked": true
}

// Inventory Variables
const invBox = document.getElementById("inventoryContainer") // Inv div
const invList = document.getElementById("inventoryList") // Inv ul

// OnClick function
gameWindow.onclick = function (e) {
    var rect = gameWindow.getBoundingClientRect()
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    // console.log(e.target.id)
    mainCharacter.style.left = x - offsetCharacter + "px";
    mainCharacter.style.top = y - offsetCharacter + "px";

    console.log("[Debug-Log]: " + e.target.id)

    switch (e.target.id) {
        case "door1":
            door1.style.opacity = 0.2
            sign.style.opacity = 0.5

            if (document.getElementById("key1") !== null) {
                console.log("[Debug-Log]: Found key!")
                document.getElementById('key1').remove();
                const keyElement = document.createElement("li")
                keyElement.id = "inv-key"
                keyElement.innerText = "Key"
                invList.appendChild(keyElement)
            }

            break;
        case "door2":
            if (gameState.door2locked == true) {
                if (document.getElementById("inv-key") !== null) {
                    gameState.door2locked = false
                    console.log("[Debug-Log]: Door unlocked")

                } else {
                    alert("You don't have the key to open this door!")
                }

            } else {
                console.log("[Debug-Log]: Enter building")
            }


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