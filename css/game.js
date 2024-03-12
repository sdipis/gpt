class Scene {
    constructor(name, content) {
        this.name = name;
        this.content = content;
        this.choices = [];
        this.maxVisibleChoices = 3;  // Set the maximum number of visible choices
    }
    isGameOver() {
        return this.name === 'gameOver';
    }

    addChoice(choiceText, nextScene) {
        this.choices.push({ text: choiceText, nextScene });
    }

    display() {
        // Display the scene content
        const gameContainer = document.getElementById('game-container');
        let contentParagraph = document.querySelector('.cont-par');
        contentParagraph.textContent = this.content;

        // Display choices if available
        if (this.choices.length > 0) {
            console.log('Choices:');

            // Create a list element
            const choicesList = document.createElement('ul');

            // Calculate the starting index based on the number of choices
            const startIndex = Math.max(0, this.choices.length - this.maxVisibleChoices);

            // Iterate through the choices starting from the calculated index
            for (let index = startIndex; index < this.choices.length; index++) {
                // Create a list item for each choice
                const listItem = document.createElement('li');
                listItem.textContent = `${index + 1}. ${this.choices[index].text}`;

                // Add click event listener to each list item
                listItem.addEventListener('click', () => {
                    gameState.makeChoice(index);
                });

                // Append the list item to the choices list
                choicesList.appendChild(listItem);
            }

            // Append the choices list to the game container
            choicesList.id = 'choices-list';
            gameContainer.appendChild(choicesList);
        }
    }
    

}

class GameState {
    constructor() {
        this.scenes = {};
        this.currentScene = null;
    }

    addScene(scene) {
        this.scenes[scene.name] = scene;
    }

    setCurrentScene(sceneName) {
        // Remove existing choices from the previous scene
        const gameContainer = document.getElementById('game-container');

        // Remove the existing choices list if it exists
        const existingChoicesList = document.getElementById('choices-list');
        if (existingChoicesList) {
            gameContainer.removeChild(existingChoicesList);
        }

        this.currentScene = sceneName;
        this.displayCurrentScene();
    }

    displayCurrentScene() {
        const currentScene = this.scenes[this.currentScene];
        if (currentScene) {
            currentScene.display();
        }
    }

    makeChoice(choiceIndex) {
        const currentScene = this.scenes[this.currentScene];
        if (currentScene && currentScene.choices[choiceIndex]) {
            const nextScene = currentScene.choices[choiceIndex].nextScene;

            // Check if the next scene exists
            if (this.scenes[nextScene]) {
                // Check if the next scene is a game-over scenario
                if (this.scenes[nextScene].isGameOver()) {
                    this.gameOver();
                } else {
                    this.setCurrentScene(nextScene);
                }
            } else {
                console.error(`Scene '${nextScene}' not found.`);
            }
        }
    }

    gameOver() {
        console.log('Game Over!');
        // You can add additional logic or UI updates for the game-over state here
    }
}




// Create instances of the Scene class for each scene in the game
const introScene = new Scene('intro', "You wake up. Your head hurts, and your mouth is dry. You aren't sure how you got here.");
introScene.addChoice('Get out of bed.', 'pathA');
introScene.addChoice('Go back to sleep.', 'pathB');

const pathAScene = new Scene('pathA', "You rolled out of bed. You're severely lethargic, you collapsed when you landed on the floor.");
pathAScene.addChoice('Cry', 'continuePathA');
pathAScene.addChoice('Wiggle your big toe', 'wiggleToeA');

const continuePathAScene = new Scene('continuePathA', "You start crying aggresively, making horrific noises in the process. Something is downstairs, and it hears you. It's coming up the stairs.");
continuePathAScene.addChoice('Hide under the bed', 'hideBedA');
continuePathAScene.addChoice('Play dead', 'playDead');

const playDead = new Scene('playDead', 'As the creature lurks above you, a spider cralws on your face. You shriek and claw to get the spider off of you. The creature take this opportunity to disembowl you. You are dead. Try again.');


const hideBedAScene = new Scene('hideBedA', "You scramble to hide under the bed. After pushing a pile of socks out of the way, you made just enough room to fit. Right as you pull your feet under, the bedroom door opens. The creature is now in the room.");
hideBedAScene.addChoice('Fight.', 'FightA');
hideBedAScene.addChoice('Flight.', 'HideSilentA');

const FightAScene = new Scene('FightA', 'You peak out to see what hunts you. You startle the creature, and it trips over a pile of old clothing on the floor.');
FightAScene.addChoice('TackleA', 'Take this chance to tackle the creature.');
FightAScene.addChoice('RunA', 'Take this chance to run for the door.');

//end game
const HideSilentAScene = new Scene('HideSilentA', 'Your efforts are in vain. Although you are completely silent, and still. The creature can smell you. It pulls you out by your feet. The creature disembowls you. You are dead.');

const wiggleToeAScene = new Scene('wiggleToeA', 'Starting with your big toe, you are able to use your body again. But before you could even get your shoes on, you hear a loud crash downstairs. It sounds like some type of creature is in the house.');
wiggleToeAScene.addChoice('Jump out of the window', 'JumpFromWindowA');
wiggleToeAScene.addChoice('See if you can get a better look at what is making noise.', 'continuePathA');

const JumpFromWindowAScene = new Scene('JumpFromWindowA', "You scramble to make a break for it. You lose your footing as you make your escape, crashing loudly on to the front lawn. The creature heard you, it's coming.");

const pathBScene = new Scene('pathB', 'You are even more dehydrated now, but any nap is a good nap.');
pathBScene.addChoice('Get out of bed.', 'pathA');

const gameOverScene = new Scene('gameOver', 'Game Over!');
// Add the game-over scene to the game state

// Create an instance of the GameState class
const gameState = new GameState();

// Add scenes to the game state
gameState.addScene(introScene);
gameState.addScene(pathAScene);
gameState.addScene(continuePathAScene);
gameState.addScene(hideBedAScene);
gameState.addScene(FightAScene);
gameState.addScene(HideSilentAScene);
gameState.addScene(wiggleToeAScene);
gameState.addScene(JumpFromWindowAScene);
gameState.addScene(pathBScene);
gameState.addScene(gameOverScene);
gameState.addScene(playDead);



// Function to start the game
function startGame() {
    gameState.setCurrentScene('intro');
}

// Function to handle user choices
function makeChoice(choiceIndex) {
    gameState.makeChoice(choiceIndex - 1);
}
