import Player from './class/player.js'; // class
// import Item from '../js/class/item.js'; // Make sure to include the correct path
// import { checkPlayerCollisionsWithItems } from '../js/class/item.js'; // Make sure to include the correct path
// import Car from './car/car.js'; // class
import Enemy from './class/enemy.js'; // class
// import Building from '../js/class/buildings.js'; //class
import NpcCar from './car/npc_car.js'; //class extends Car
import { createNpcCar } from './car/npc_car_manager.js';
// import Bullet from './combat/bullet.js'; // class
import {bullets} from './combat/bullet.js';
import './animations/player_animations.js';
import { keysPressed } from './animations/player_animations.js';
import './animations/change_player_color.js';
import Item from './class/item.js';
import Pers_Item from './class/pers_item.js';

  //‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾//
 //          Initialize            //
//________________________________//

const currentPage = document.body.dataset.page;
const player = new Player();
const npcCarInitialX = 20;
const npcCarInitialY = 0;
const sundayDriver = new NpcCar(npcCarInitialX, npcCarInitialY);
if (currentPage == 'bar_interior' && currentPage == 'casino_interior') {
    sundayDriver = null; // Initialize to null

}
const enemies = [];

//init items

if (currentPage == 'interior') {

//pass player instance to item and declare the props
const myItem = new Item(player, "Red Shoes", "An overpriced electronic", "../resources/items/redShoes.svg", 1100, 300);
document.getElementById('interior-container').appendChild(myItem.element);

const blueItem = new Pers_Item(player, "Blue Shoes", "An overpriced electronic", "../resources/items/blueShoes.svg", 1100, 250);
document.getElementById('interior-container').appendChild(blueItem.element);

const beerBottle = new Item(player, "Beer Bottle", "Get lifted", "../resources/items/beerBottle.svg", 600, 160);
document.getElementById('interior-container').appendChild(beerBottle.element);

const baseballBat = new Item(player, "Baseball Bat", "Get lifted", "../resources/items/baseballBat.svg", 1350, 250);
document.getElementById('interior-container').appendChild(baseballBat.element);

const fent = new Item(player, "Opiate Syringe", "Brought to you by purdue", "../resources/items/fent.svg", 460, 150);
document.getElementById('interior-container').appendChild(fent.element);

const methPipe = new Item(player, "Meth Pipe", "Not even once", "../resources/items/smokingPipe.svg", 350, 160);
document.getElementById('interior-container').appendChild(methPipe.element);

}
  //‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾//
 //           Spawn NPC            //
//________________________________//

if(currentPage=='casino_interior'){
for (let i = 0; i < 
    10 //patrons will spawn in the casino
    ; i++) {
    enemies.push(new Enemy());
}}else if(currentPage==='bar_interior'){
    for (let i = 0; i < 
        5 //patrons will spawn in the bar
        ; i++) {
        enemies.push(new Enemy());
}}else{
    for (let i = 0; i < 
        0 //patrons will spawn in the outside portions
        ; i++) {
        enemies.push(new Enemy());
    }
}

  //‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾//
 //       Event Listeners          //
//________________________________//
// const spaceship = document.querySelector('#ufo');
// spaceship.addEventListener('click', player.toggleUfo());

document.addEventListener('keydown', (event) => {
                       switch (event.key) {
        case 'ArrowUp','w':
            player.move(0, -.05); // Move upwards
            break;
        case 'ArrowDown','s':
            player.move(0, .05); // Move downwards
            break;
        case 'ArrowLeft','a':
            player.move(-.05, 0); // Move to the left
            break;
        case 'ArrowRight','d':
            player.move(.05, 0); // Move to the right
            break;
                            case 'c':
                                // Toggle between being in the car and on foot
                                player.toggleCar();
                                break;

                                case 'u':
                                    // Toggle between being in the car and on foot
                                    player.toggleUfo();
                                    break;
                    }
}); // player car movement event listeners

document.addEventListener('keydown', (event) => {
    // Check if the player is in the car
    if (player.inCar) {
        switch (event.key) {
            case 'ArrowLeft':
                if (player.car.isDrifting) {
                    // Drifting left: Adjust the angle and enable drifting
                    player.car.setAngle(player.car.angle - 15); // Adjust the angle as needed
                    player.car.isDrifting = true;
                } else {
                    // Turning left without drifting
                    player.car.setAngle(player.car.angle - 15); // Adjust the angle as needed
                }
                break;
            case 'ArrowRight':
                if (player.car.isDrifting) {
                    // Drifting right: Adjust the angle and enable drifting
                    player.car.setAngle(player.car.angle + 15); // Adjust the angle as needed
                    player.car.isDrifting = true;
                } else {
                    // Turning right without drifting
                    player.car.setAngle(player.car.angle + 15); // Adjust the angle as needed
                }
                break;
            
            case ' ':
                // Spacebar pressed: Enable drifting
                player.car.isDrifting = true;
                break;
        }
    }
    if (player.inUfo) {
        switch (event.key) {
            case 'ArrowLeft':
                if (player.spaceship.isDrifting) {
                    // Drifting left: Adjust the angle and enable drifting
                    player.spaceship.setAngle(player.spaceship.angle - 15); // Adjust the angle as needed
                    player.spaceship.isDrifting = true;
                } else {
                    // Turning left without drifting
                    player.spaceship.setAngle(player.spaceship.angle - 15); // Adjust the angle as needed
                }
                break;
            case 'ArrowRight':
                if (player.spaceship.isDrifting) {
                    // Drifting right: Adjust the angle and enable drifting
                    player.spaceship.setAngle(player.spaceship.angle + 15); // Adjust the angle as needed
                    player.spaceship.isDrifting = true;
                } else {
                    // Turning right without drifting
                    player.spaceship.setAngle(player.spaceship.angle + 15); // Adjust the angle as needed
                }
                break;
            
            case ' ':
                // Spacebar pressed: Enable drifting
                player.car.isDrifting = true;
                break;
        }
    }
});

document.addEventListener('keyup', (event) => {
    // Check if the player is in the car
    if (player.inCar) {
        switch (event.key) {
            case 'ArrowLeft':
            case 'ArrowRight':
                // Stop drifting when left or right key is released
                player.car.isDrifting = false;
                break;
            case ' ':
                // Spacebar released: Disable drifting
                player.car.isDrifting = false;
                break;
        }
    }
    if (player.inUfo) {
        switch (event.key) {
            case 'ArrowLeft':
            case 'ArrowRight':
                // Stop drifting when left or right key is released
                player.ufo.isDrifting = false;
                break;
            case ' ':
                // Spacebar released: Disable drifting
                player.ufo.isDrifting = false;
                break;
        }
    }
});
                
document.addEventListener('keydown', (event) => {
keysPressed[event.key] = true;
handlePlayerMovement();
});
                
document.addEventListener('keyup', (event) => {
keysPressed[event.key] = false;
handlePlayerMovement();
});

function handlePlayerMovement() {
    const directionX = (keysPressed['ArrowRight'] ? 1 : 0) + (keysPressed['ArrowLeft'] ? -1 : 0);
    const directionY = (keysPressed['ArrowDown'] ? 1 : 0) + (keysPressed['ArrowUp'] ? -1 : 0);
    player.move(directionX, directionY);
}; // handle player movement



   //‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾//
  //           Game Loop            //
 //________________________________//

  // Game Loop
  function gameLoop() {
    // Update player
    player.update();
    checkCarCollisionWithEnemies(player, enemies);

    // Update Sunday driver if it exists
    if (sundayDriver) {
        sundayDriver.update();
        checkPlayerCollisionsWithCar(player, sundayDriver);
    }

    
    // Update enemies
    for (const enemy of enemies) {
        enemy.update();
    }

    // Request the next animation frame
    requestAnimationFrame(gameLoop);
}



// Call the gameLoop function to start the game loop
gameLoop(player, sundayDriver, enemies, bullets);

//     for (let i = bullets.length - 1; i >= 0; i--) {
//         const bullet = bullets[i];
//         const bulletRect = bullet.element.getBoundingClientRect();

//         for (let j = enemies.length - 1; j >= 0; j--) {
//             const enemy = enemies[j];
//             const enemyRect = enemy.element.getBoundingClientRect();

//             if (
//                 bulletRect.left < enemyRect.right &&
//                 bulletRect.right > enemyRect.left &&
//                 bulletRect.top < enemyRect.bottom &&
//                 bulletRect.bottom > enemyRect.top
//             ) {
//                 // Bullet hit the enemy
//                 bullets.splice(i, 1);
//                 enemyHit(enemy, enemies);
//                 console.log('Enemy hit by a bullet');
//                 break; // Exit the inner loop once a collision is detected
//             }
//         }
//     }
// }

// // handle enemy hits (from bullets)
// function enemyHit(enemy, enemies) {
//     console.log('enemy shot');
//     // Decrease enemy health
//     enemy.health = (enemy.health || 0) - 1;

//     // Check if enemy is "dead"
//     if (enemy.health <= 0) {
//         console.log('Target Eliminated');
//         // Remove the enemy
//         enemies.splice(enemies.indexOf(enemy), 1);
//     }
// }


// enemy car -> player
function checkPlayerCollisionsWithCar(player, sundayDriver) {
    // Check if both player and enemy car elements exist
    if (!player.element || !sundayDriver.element) {
        console.error('Player or enemy car element does not exist.');
        return;
    }

    const playerRect = player.element.getBoundingClientRect();
    const npcCarRect = sundayDriver.element.getBoundingClientRect();

    // Check for collision
    if (
        playerRect.left < npcCarRect.right &&
        playerRect.right > npcCarRect.left &&
        playerRect.top < npcCarRect.bottom &&
        playerRect.bottom > npcCarRect.top
    ) {
        // Collision occurred, implement your collision handling logic
        console.log('Player has been hit by a car!');
        handleCarCollision(player);
    }
}

//player car -> enemies
function checkCarCollisionWithEnemies(player, enemies) {
    // Check if the player is in the car
    if (player.inCar) {
        const playerRect = player.car.element.getBoundingClientRect();
    
        for (const enemy of enemies) {
            const enemyRect = enemy.element.getBoundingClientRect();
    
            if (
                playerRect.left < enemyRect.right &&
                playerRect.right > enemyRect.left &&
                playerRect.top < enemyRect.bottom &&
                playerRect.bottom > enemyRect.top
            ) {
                // Handle collision with the enemy (e.g., decrease player's health)
                // handleCarCollision();
                enemy.speed = 0;
                enemy.element.classList.add('dead');
                console.log('Car collided with an enemy!');
            }
        }
    }
}

// what happens when the player is hit by car?
function handleCarCollision(player) {
    player.x -= -2; // Move the player upward by 50 pixels
    player.element.classList.add('jumping');
    //modify the .jumping class in CSS to add immersion to the vehicular homicide 

    // Remove the jumping class after a delay to stop the animation
    setTimeout(() => {
        player.element.classList.remove('jumping');
    }, 125); // Adjust the delay as needed
}