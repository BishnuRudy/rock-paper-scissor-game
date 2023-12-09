const elements = {
    headerText        : document.querySelectorAll(".titles"),
    playerScore       : document.querySelector(".human-score"),
    computerScore     : document.querySelector(".computer-score"),
    playerWeaponImage : document.querySelector(".human > .rest"),
    AIWeaponImage     : document.querySelector(".computer > .rest"),
    weapons           : document.querySelector(".weapons"),
    winMessageField   : document.querySelector(".win-message")
};

const weaponImages = {
    "rest"    : "./images/rest.png",
    "rock"    : "./images/rock.png",
    "paper"   : "./images/paper.png",
    "scissor" : "./images/scissors.png"
}

function headerGlowAnimation() {
    setInterval(() => {
        for (const elem of elements.headerText) {
            elem.style.textShadow = 
                `
                    5px 0 10px ${generateRandomColor()},
                    -5px 0 10px ${generateRandomColor()},
                    4px 4px 10px ${generateRandomColor()},
                    1px -5px 0 ${generateRandomColor()}
                `
        }
    }, 500);
}

function AIWeaponChoice() {
    return [Math.floor(3 * Math.random())]
}

function increasePlayerScore() {
    elements.playerScore.textContent = 
        String(parseInt(elements.playerScore.textContent)+1);
}

function increaseAIScore() {
    elements.computerScore.textContent = 
        String(parseInt(elements.computerScore.textContent)+1); 
}

function determineWinner(playerChoice, AIChoice) {
    const winnerResult = (3 + playerChoice - AIChoice) % 3;
    if (winnerResult === 2)
        increaseAIScore();
    else if (winnerResult === 1)
        increasePlayerScore();
    displayWinMessage(winnerResult);
}

function handleWeaponAnimationState(playerWeapon, AIWeapon) {
    setTimeout( () => {
        elements.playerWeaponImage.classList.toggle("rest");
        elements.AIWeaponImage.classList.toggle("rest");

        elements.playerWeaponImage.src = 
            weaponImages[playerWeapon.textContent.toLocaleLowerCase()];
        elements.AIWeaponImage.src = weaponImages[AIWeapon]
    } , 200 )

    setTimeout( () => {
        elements.playerWeaponImage.classList.toggle("rest");
        elements.AIWeaponImage.classList.toggle("rest");
        elements.playerWeaponImage.src = weaponImages["rest"]        
        elements.AIWeaponImage.src = weaponImages["rest"]   
    }, 1500 )
}

function displayWinMessage(winner) {
    let msg;
    if (winner == 1)
        msg = "Player Won" 
    else if (winner == 2)
        msg = "Computer Won"
    else
        msg = "Its Tie"
    elements.winMessageField.textContent = `${msg}`;
    setTimeout( () => {
        elements.winMessageField.textContent = "";
    }, 1500 )
}

function generateRandomColor() {
    const hexcodes = "0123456789ABCDEF".split('');
    let colorCode = "#";
    for (let i = 0; i < 6; i++) {
        colorCode += hexcodes[Math.floor(Math.random() * hexcodes.length)];
    }
    return colorCode;
}

for (let i = 0; i < elements.weapons.children.length; i++) {
    const weapon = elements.weapons.children[i];
    weapon.addEventListener('click', (e) => {
        const AIWeapon = AIWeaponChoice();
        const AIweaponName = 
            elements.weapons.children[AIWeapon].textContent.toLocaleLowerCase()

        handleWeaponAnimationState(weapon, AIweaponName)
        determineWinner(i, AIWeapon)
    })
}