// Main Variables
const gameWindow = document.getElementById("gameContainer"); // Game Container
const mainCharacter = document.getElementById("characterContainer"); // Character Container
const offsetCharacter = 16 // Offset in PX
const door1 = document.getElementById("door1") // Door 1 ID
const sign = document.getElementById("sign") // Sign ID


// Dialog
const mainCharacterSpeech = document.getElementById("mainCharacterSpeech");
const counterSpeech = document.getElementById("counterSpeech");
const mcAudio = document.getElementById("mcAudio");
const cAudio = document.getElementById("cAudio");
const sec = 1000;

// Game states
gameState = {
    "door2locked": true,
    "inventory": []
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

    console.log("[Click-Element-Log]: " + e.target.id)

    switch (e.target.id) {
        case "door1":
            door1.style.opacity = 0.2
            sign.style.opacity = 0.5

            if (document.getElementById("key1") !== null) {
                console.log("[Debug-Log]: Found key!")
                document.getElementById('key1').remove();
                invHandler("add", "key")
                setTimeout(showMessage, 4 * sec, counterSpeech, cAudio, "NPC: I can talk you know..dummy");
                setTimeout(showMessage, 8 * sec, mainCharacterSpeech, mcAudio, "You: You don't have to be so mean.");
                setTimeout(showMessage, 12 * sec, counterSpeech, cAudio, "NPC: You should check the north house..");
            }

            break;
        case "door2":
            if (gameState.door2locked == true) {
                if (document.getElementById("inv-key") !== null) {
                    gameState.door2locked = false
                    console.log("[Debug-Log]: Door unlocked")
                    invHandler("delete", "key")

                } else {
                    alert("You don't have the key to open this door!")
                    console.log("[Debug-Log]: Don't have the 'key' item. So you can't open the door.")
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


// Functions

/**
 * Function to handle the inventory
 * @param {string} action "add", "delete"
 * @param {string} itemName "name of the item in a string"
 * @returns 
 */
function invHandler(action, itemName) {
    if (itemName == null || action == null) {
        console.log("[Debug-Log]: Wrong parameters given to invHandler()")
        return
    }

    switch (action) {
        case "add":
            gameState.inventory.push(itemName)
            break;

        case "delete":
            gameState.inventory.find(function (item, index) {
                if (item == itemName) {
                    var index = gameState.inventory.indexOf(item);
                    if (index !== -1)
                        gameState.inventory.splice(index, 1)
                }
            })
            break

        default:

    }

    updateInv(gameState.inventory, invList)

}

/**
 * update inventoryList
 * @param {Array} inventory array of items 
 * @param {HTMLElement} invList html <ul> element
 */
function updateInv(inventory, invList) {
    invList.innerHTML = '';
    inventory.forEach(function (item) {
        const invItem = document.createElement("li")
        invItem.id = "inv-" + item
        invItem.innerText = item
        invList.appendChild(invItem)
        console.log("[Update-Inventory-Log]: " + item)
    })
}

/**
 * Shows a message in a speech bubble
 * @param {getElementById} targetBalloon 
 * @param {getElementById} targetSound 
 * @param {string} message 
 */
function showMessage(targetBalloon, targetSound, message) {
    targetSound.currentTime = 0;
    targetSound.play();
    targetBalloon.style.opacity = "1";
    targetBalloon.innerText = message;
    setTimeout(hideMessage, 4 * sec, targetBalloon, targetSound);
}

/**
 * Set the opacity to 0
 * @param {getElementById} targetBalloon 
 * @param {getElementById} targetSound 
 */
function hideMessage(targetBalloon, targetSound) {
    targetSound.pause();
    targetBalloon.style.opacity = "0";
}