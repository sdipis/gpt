import Player from '../js/class/player.js'; // class
// import Item from '../js/class/item.js'; // Make sure to include the correct path
// import { checkPlayerCollisionsWithItems } from '../js/class/item.js'; // Make sure to include the correct path
// import Car from './car/car.js'; // class
import Enemy from '../js/class/enemy.js'; // class
// import Building from '../js/class/buildings.js'; //class
import NpcCar from './car/npc_car.js'; //class extends Car
import { createNpcCar } from './car/npc_car_manager.js';
// import Bullet from './combat/bullet.js'; // class
import {bullets} from './combat/bullet.js';
import './animations/player_animations.js';
import { keysPressed } from './animations/player_animations.js';
import './animations/change_player_color.js';


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

// const items = []; // Add this line to initialize the items array
// const healthPotion = new Item(0, 0, 'bag of crack');
// items.push(healthPotion);


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
        12 //patrons will spawn in the outside portions
        ; i++) {
        enemies.push(new Enemy());
    }
}

  //‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾//
 //       Event Listeners          //
//________________________________//

document.addEventListener('keydown', (event) => {
                       switch (event.key) {
        case 'ArrowUp','w':
            player.move(0, -1); // Move upwards
            break;
        case 'ArrowDown','s':
            player.move(0, 1); // Move downwards
            break;
        case 'ArrowLeft','a':
            player.move(-1, 0); // Move to the left
            break;
        case 'ArrowRight','d':
            player.move(1, 0); // Move to the right
            break;
                        // case 'Space':
                        //     // Create a bullet and add it to the bullets array
                        //     const bullet = new Bullet(player.x, player.y, 1, { x: 0, y: 0 });
                        //     bullets.push(bullet);
                        //     break;
                            case 'c':
                                // Toggle between being in the car and on foot
                                player.toggleCar();
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
});
                
document.addEventListener('keydown', (event) => {
keysPressed[event.key] = true;
handlePlayerMovement();
});
                
document.addEventListener('keyup', (event) => {
keysPressed[event.key] = false;
handlePlayerMovement();
});

 // Shooting Listeners
//holding mouse down fires gun
document.addEventListener('mousedown', (event) => {
    player.shootBullet(event);
    
    const shootInterval = setInterval(() => {
    player.shootBullet(event);
    },30); 
                    
    //when you release mouse, it clears the interval so it doesnt keep shooting
    document.addEventListener('mouseup', () => {
    clearInterval(shootInterval);
    }, { once: true });
    
});

function handlePlayerMovement() {
    const directionX = (keysPressed['ArrowRight'] ? 1 : 0) + (keysPressed['ArrowLeft'] ? -1 : 0);
    const directionY = (keysPressed['ArrowDown'] ? 1 : 0) + (keysPressed['ArrowUp'] ? -1 : 0);
    player.move(directionX, directionY);
}; // handle player movement



   //‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾//
  //           Game Loop            //
 //________________________________//
/* This is the main brain of the   /
   the operations.               */

  // Game Loop
function gameLoop() {
    // Update player
    player.update();

    // Update Sunday driver if it exists
    if (sundayDriver) {
        sundayDriver.update();
        checkPlayerCollisionsWithCar(player, sundayDriver);
    }

    // Update enemies
    for (const enemy of enemies) {
        enemy.update();
    }

    // Update bullets
    for (const bullet of bullets) {
        bullet.update();
    }

    // Request the next animation frame
    requestAnimationFrame(gameLoop);
}


// Call the gameLoop function to start the game loop
gameLoop(player, sundayDriver, enemies, bullets);


// player | enemy Car
function checkPlayerCollisionsWithCar(player, sundayDriver) {
    // Check if sundayDriver exists
        return; // Exit the function if sundayDriver does not exist
    


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


// handle enemy hits (from bullets)
function checkCollisionWithEnemies(player, enemies, bullets) {
    for (let i = bullets.length - 1; i >= 0; i--) {
        const bullet = bullets[i];
        const bulletRect = bullet.element.getBoundingClientRect();

        for (let j = enemies.length - 1; j >= 0; j--) {
            const enemy = enemies[j];
            const enemyRect = enemy.element.getBoundingClientRect();

            if (
                bulletRect.left < enemyRect.right &&
                bulletRect.right > enemyRect.left &&
                bulletRect.top < enemyRect.bottom &&
                bulletRect.bottom > enemyRect.top
            ) {
                // Bullet hit the enemy
                bullets.splice(i, 1);
                enemyHit(enemy, enemies);
                console.log('Enemy hit by a bullet');
                break; // Exit the inner loop once a collision is detected
            }
        }
    }
}

// player's car | enemy
function checkCarCollisionWithEnemies(player, sundayDriver, enemies) {
    const carRect = player.car.element.getBoundingClientRect();

    // Check collision with Sunday driver
    const sundayDriverRect = sundayDriver.element.getBoundingClientRect();
    if (
        player.inCar && // Add this condition to check if the player is in the car
        carRect.left < sundayDriverRect.right &&
        carRect.right > sundayDriverRect.left &&
        carRect.top < sundayDriverRect.bottom &&
        carRect.bottom > sundayDriverRect.top
    ) {
        // Handle collision with Sunday driver, e.g., stop the car or remove the Sunday driver
        // Example: sundayDriver.stop();
    }

    // Check collision with enemies if the player is in the car
    if (player.inCar) {
        for (const enemy of enemies) {
            const enemyRect = enemy.element.getBoundingClientRect();

            if (
                carRect.left < enemyRect.right &&
                carRect.right > enemyRect.left &&
                carRect.top < enemyRect.bottom &&
                carRect.bottom > enemyRect.top
            ) {
                // Handle collision with enemy only when the player is in the car
                enemy.stop(); // Assuming you have a stop method in your Enemy class
                enemy.element.classList.add('dead'); // Add the 'dead' class to the enemy's element
            }
        }
    }
}


// handle enemy hits (from bullets)
function enemyHit(enemy, enemies) {
    // Decrease enemy health
    enemy.health = (enemy.health || 0) - 1;

    // Check if enemy is "dead"
    if (enemy.health <= 0) {
        console.log('Target Eliminated');
        // Remove the enemy
        enemies.splice(enemies.indexOf(enemy), 1);
    }
}



// what happens when the player is hit?
function handleCarCollision(player) {
    player.x -= -2; // Move the player upward by 50 pixels
    player.element.classList.add('jumping');
    //modify the .jumping class in CSS to add immersion to the vehicular homicide 

    // Remove the jumping class after a delay to stop the animation
    setTimeout(() => {
        player.element.classList.remove('jumping');
    }, 125); // Adjust the delay as needed
}




// // Call the gameLoop function to start the game loop
// gameLoop(player, sundayDriver, enemies, bullets);