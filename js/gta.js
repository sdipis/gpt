class Player {
    constructor() {
        this.car = new Car();
        this.element = document.getElementById('player');
        this.x = 0;
        this.y = 0;
        this.speed = 10;
        this.inCar = false;
        this.size=20;

                // Add a property to track the number of bullets shot
                this.bulletsShot = 0;
                // Add a property to store the maximum bullets before reloading
                this.maxBullets = 10;
                // Add a property to track whether the player is reloading
                this.isReloading = false;
                this.update();
                this.updateBulletsDisplay();


        // Listen for the carPositionChange event
        this.carPositionChangeListener = () => {
            // Update the player's position to match the car's position
            if (this.isInCar) {
                const carRect = this.car.element.getBoundingClientRect();
                this.x = carRect.left;
                this.y = carRect.top;
                this.update();
            }
        };

        document.addEventListener('carPositionChange', this.carPositionChangeListener);

                // Add a property to track the interval ID for spawning pixels
                this.pixelSpawnIntervalId = null;

                // Example: Adding key event listener for pixel spawning
                document.addEventListener('keydown', (event) => {
                    if (event.key === 'j') {
                        this.startPixelSpawning();
                    }
                });

    }

    eatEnemy() {
        // Increase player's size and speed when an enemy is eaten
        this.size += 5; // You can adjust the amount the player grows
        this.speed += 0.1; // You can adjust the amount the player's speed increases

        // Apply the new size to the player's element
        this.element.style.height = `${this.size}px`;
        this.element.style.width = `${this.size}px`;

        // Log the updated size and speed (optional)
        console.log(`Player size: ${this.size}, Player speed: ${this.speed}`);
    }
      // Function to start spawning pixels
      startPixelSpawning() {
        // Clear any existing interval
        this.stopPixelSpawning();

        // Set the interval to spawn pixels every 100 milliseconds (adjust as needed)
        this.pixelSpawnIntervalId = setInterval(() => {
            this.spawnPixel();
        }, 100);

        // Stop spawning pixels after 5 seconds (adjust as needed)
        setTimeout(() => {
            this.stopPixelSpawning();
        }, 5000);
    }

    // Function to stop spawning pixels
    stopPixelSpawning() {
        clearInterval(this.pixelSpawnIntervalId);
    }

    // Function to spawn a pixel
    spawnPixel() {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel'); // You can style this class in your CSS
        pixel.style.position = 'absolute';
        pixel.style.width = '5px';
        pixel.style.height = '5px';
        pixel.style.backgroundColor = 'white';
        pixel.style.left = `${this.x}px`; // Adjust as needed
        pixel.style.top = `${this.y}px`; // Adjust as needed

            // Set the position relative to the player's current position
    const playerRect = this.element.getBoundingClientRect();
    pixel.style.left = `${playerRect.left}px`;
    pixel.style.top = `${playerRect.top}px`;

        document.body.appendChild(pixel);

        // Remove the pixel after 1 second
        setTimeout(() => {
            pixel.remove();
        }, 1000);
    }

    updateBulletsDisplay() {
        document.getElementById('bulletsCount').textContent = this.bulletsCount;
    }


    startReloading() {
        // Set isReloading to true
        this.isReloading = true;
    
        // Add an event listener for the "R" key to finish reloading
        const reloadListener = (event) => {
            if (event.key === 'R' || event.key === 'r') {
                // Reset bulletsShot count and set isReloading to false
                this.bulletsShot = 0;
                this.isReloading = false;
    
                // Reset bullets count to ten and update display
                this.bulletsCount = 10;
                this.updateBulletsDisplay();
    
                console.log('Reload complete. Ready to shoot!');
                reload_note.style.display="none";

                // Remove the event listener
                document.removeEventListener('keydown', reloadListener);
            }
        };
    
        document.addEventListener('keydown', reloadListener, { once: true });
    }

    toggleCar() {
        // Toggle the inCar property
        this.inCar = !this.inCar;

        // Add logic here to handle the visual changes or other actions when entering/exiting the car
        if (this.inCar) {
            console.log('Entering the car');
            // Add visual changes or other actions when entering the car
            this.element.style.display = 'none';  // Hide the player when in the car
        } else {
            console.log('Exiting the car');
            // Add visual changes or other actions when exiting the car
            this.element.style.display = 'block';  // Show the player when exiting the car
        }
        
    }


    move(directionX, directionY) {
        if (this.inCar) {
            // Move the car
            this.car.move(directionX, directionY);
            this.car.update();
            
        } else {
            // Calculate the new position based on the direction
            this.x += this.speed * directionX;
            this.y += this.speed * directionY;
    
            // Check for collisions
            this.checkCollision();
        }
    
        // Update the player's position
        this.update();
    }
    teleportToRoom(buildingId) {

        switch (buildingId) {
            case 'building4':
                console.log('Entering the bar');
                // Implement logic to navigate to the corresponding room or change the location
                // For example, redirect to the main room (gta.html)
                window.location.href = 'rooms/bar.html';   
                break;
                case 'building6':
                    console.log('Entering the casino');
                    // Implement logic to navigate to the corresponding room or change the location
                    // For example, redirect to the main room (gta.html)
                    window.location.href = 'rooms/casino.html';   
                    break;
            case 'building2':
    console.log('Teleporting to Room 2');
    // Implement logic to navigate to the corresponding room or change the location
    // For example, redirect to the main room (gta.html)
    window.location.href = '../interior.html';
    break;
            case 'door':
                console.log('Teleporting through the door');
                // Implement logic to navigate to the corresponding room or change the location
                // For example, redirect to the interior room (interior.html)
                window.location.href = '../interior.html';
                break;

                case 'bar-door':
                    console.log('Teleporting outside');
                    // Implement logic to navigate to the corresponding room or change the location
                    // For example, redirect to the main room (gta.html)
                    window.location.href = '../interior.html';
                    break;
                    case 'casino-door':
                        console.log('Teleporting outside');
                        // Implement logic to navigate to the corresponding room or change the location
                        // For example, redirect to the main room (gta.html)
                        window.location.href = '../interior.html';
                        break;
                        //casino ports
                        case 'blackjack-table':
                            console.log('Starting Blackjack');
                            // Implement logic to navigate to the corresponding room or change the location
                            // For example, redirect to the main room (gta.html)
                            window.location.href = '../rooms/games/poker.html';   
                            break;


                    case 'building2':
            // Add more cases for other buildings as needed
            default:
                console.log(`Unknown buildingId: ${buildingId}`);
                break;
        }
    }
    
    update() {
        if (this.inCar) {
            // Update the player's position to match the car's position
            const carRect = this.car.element.getBoundingClientRect();
            this.x = carRect.left;
            this.y = carRect.top;
            this.car.update(); // Call the update method of the car
        }

        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }

    checkCollision() {
        const playerRect = this.element.getBoundingClientRect();

        // ... (Your existing code)

        for (const building of buildings) {
            const buildingRect = building.getBoundingClientRect();

            if (
                playerRect.left < buildingRect.right &&
                playerRect.right > buildingRect.left &&
                playerRect.top < buildingRect.bottom &&
                playerRect.bottom > buildingRect.top
            ) {
                // Handle collision with the building (e.g., teleport)
                if (building.id === 'building2') {
                    this.teleportToRoom(building.id);
                }
                                // Handle collision with the building (e.g., teleport)
                if (building.id === 'building4') {
                    this.teleportToRoom(building.id);
                }

                if (building.id === 'bar-door') {
                    this.teleportToRoom(building.id);
                }

                if (building.id === 'building6') {
                    this.teleportToRoom(building.id);
                }

                if (building.id === 'casino-door') {
                    this.teleportToRoom(building.id);
                }


                if (building.id === 'blackjack-table') {
                    this.teleportToRoom(building.id);
                }

                console.log(`Player collided with building ${building.id}`);
            }
        }
    }


    shootBullet(event) {
        // Create a new bullet element
        const bullet = document.createElement('div');
        bullet.className = 'bullet';
        document.body.appendChild(bullet);

        if (this.isReloading) {
            console.log('RELOAD YOUR GUN');
            reload_note.style.display="block";
            return;
        }
    
        //increment bullets shot (10 in a clip
        this.bulletsShot++;

                // Check if the player needs to reload
                if (this.bulletsShot >= this.maxBullets) {
                    this.startReloading();

                }
                    // Update the bullets count and display
    this.bulletsCount = this.maxBullets - this.bulletsShot;
    this.updateBulletsDisplay();

                
                       // Add an event listener for the "R" key to finish reloading
        const reloadListener = (event) => {
            if (event.key === 'R' || event.key === 'r') {
                // Reset bulletsShot count and set isReloading to false
                this.bulletsShot = 0;
                this.isReloading = false;
                // console.log('Reloaded');
                // Remove the event listener
                document.removeEventListener('keydown', reloadListener);
            }
        

        document.addEventListener('keydown', reloadListener, { once: true });
    }


        // Set the initial position of the bullet to the middle of the player's div
        const playerRect = this.element.getBoundingClientRect();
        bullet.style.left = `${playerRect.left + playerRect.width / 2}px`;
        bullet.style.top = `${playerRect.top + playerRect.height / 2}px`;
    
        // Calculate the angle between the player and the mouse click
// Calculate the angle between the player and the mouse click
const angle = Math.atan2(
    event.clientY - (playerRect.top + playerRect.height / 2),
    event.clientX - (playerRect.left + playerRect.width / 2)
);    
        // Set the initial speed of the bullet
        const bulletSpeed = 10;
    
// Move the bullet in the direction of the mouse click
const bulletMove = () => {
    const bulletRect = bullet.getBoundingClientRect();

    // Calculate the distance between the player's center and the mouse cursor
    const deltaX = event.clientX - (playerRect.left + playerRect.width / 2);
    const deltaY = event.clientY - (playerRect.top + playerRect.height / 2);

    // Normalize the distance to get a unit vector
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const normalizedDeltaX = deltaX / distance;
    const normalizedDeltaY = deltaY / distance;

    // Update bullet position based on normalized direction and speed
    bullet.style.left = `${bulletRect.left + bulletSpeed * normalizedDeltaX}px`;
    bullet.style.top = `${bulletRect.top + bulletSpeed * normalizedDeltaY}px`;

    // Check if the bullet is still within the window
    if (
        bulletRect.left < window.innerWidth &&
        bulletRect.right > 0 &&
        bulletRect.top < window.innerHeight &&
        bulletRect.bottom > 0
    ) {
        // Continue moving the bullet
        requestAnimationFrame(bulletMove);
    } else {
        // Remove the bullet when it goes out of bounds
        bullet.remove();
    }
};

// Start moving the bullet
requestAnimationFrame(bulletMove);
    }
    
    
    
}

class Car {
    constructor() {
        if (currentPage !== 'bar_interior' && currentPage !== 'casino_interior') {
            this.element = document.createElement('div');
        this.element.classList.add('car');
        this.element.id = 'car';
        this.element.style.position = 'absolute';
            this.element.style.width = '150px';
            this.element.style.height = '75px';
        this.speed = 3;
        this.angle = 0;  // Initial angle in radians
        document.body.appendChild(this.element);
    }}


    setAngle(newAngle) {
        this.angle = newAngle;
        this.element.style.transform = `rotate(${this.angle}deg)`;
    }

    move() {
        // Convert angle to radians
        const angleInRadians = this.angle * (Math.PI / 180);

        // Calculate new position based on angle
        const newX = this.element.offsetLeft + this.speed * Math.cos(angleInRadians);
        const newY = this.element.offsetTop + this.speed * Math.sin(angleInRadians);

        // Check if the new position is within the window boundaries
        if (
            newX >= 0 &&
            newY >= 0 &&
            newX + this.element.offsetWidth <= window.innerWidth &&
            newY + this.element.offsetHeight <= window.innerHeight
        ) {
            this.element.style.left = `${newX}px`;
            this.element.style.top = `${newY}px`;
        }
    }



    update() {
        // Update the car's position based on its angle
        this.move();
    }
}

class Building {
    constructor(id, x, y, width, height) {
        this.id = id;
        this.element = document.createElement('div');
        this.element.classList.add('building');
        this.element.id = id;
        this.element.style.position = 'absolute';
        this.element.style.left = `${x}px`;
        this.element.style.top = `${y}px`;
        this.element.style.width = `${width}px`;
        this.element.style.height = `${height}px`;
        this.element.style.backgroundColor = 'brown';

        this.overlay=document.createElement('div');
        this.overlay.classList.add('overlay');

        this.element.appendChild(this.overlay);
        document.body.appendChild(this.element);
    }

    getBoundingClientRect() {
        return this.element.getBoundingClientRect();
    }
}

class Bullet {
    constructor(x, y, speed, direction) {
        this.element = document.createElement('div');
        this.element.className = 'bullet';
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.direction = direction;
        document.body.appendChild(this.element);
    }

    update() {
        this.x += this.speed * this.direction.x;
        this.y += this.speed * this.direction.y;
        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }
}

class Enemy {
    constructor() {
        this.element = document.createElement('div');
        this.element.className = 'enemy';
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.speed = 1;
        this.direction = { x: 1, y: 1 };
        document.body.appendChild(this.element);
    }
    remove() {
        // Remove the enemy element from the DOM
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }
    update() {
        // Move randomly
        if (Math.random() < 0.02) {
            this.direction.x = Math.random() > 0.3 ? 1 : -1;
        }
        if (Math.random() < 0.02) {
            this.direction.y = Math.random() > 0.3 ? 1 : -1;
        }

        this.x += this.speed * this.direction.x;
        this.y += this.speed * this.direction.y;

        // Wrap around screen
        if (this.x < 0) this.x = window.innerWidth;
        if (this.x > window.innerWidth) this.x = 0;
        if (this.y < 0) this.y = window.innerHeight;
        if (this.y > window.innerHeight) this.y = 0;

        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }
}

// Function to create buildings based on the page
function createBuildings(page) {
    switch (page) {
        case 'home':
            return [
                new Building('building1', 100, 100, 100, 150),
                new Building('building2', 300, 200, 120, 180)
                // Add more buildings for the 'home' page as needed
            ];
            case 'bar_interior':
                return [
                    new Building('bar-door', 0, 300, 15, 80),
                    // Add more buildings for the 'home' page as needed
                ];
                case 'casino_interior':
                    return [
                        new Building('casino-door', 0, 300, 15, 80),
                        new Building('poker-table', 500, 400, 343, 174),
                        new Building('blackjack-table', 800, 50, 359/1.5, 237/1.5)

                        // Add more buildings for the 'home' page as needed
                    ];
        case 'interior':
            return [
                new Building('building3', 200, 160, 160, 240),
                new Building('building4', 400, 160, 300, 400),
                new Building('building6', 850, 500, 600, 300),
                new Building('building5', 1300, 120, 300, 200)


                // Add more buildings for the 'interior' page as needed
            ];
        default:
            return []; // Default to an empty array if no specific buildings are defined
    }
}

// Get the page value from body.dataset
const currentPage = document.body.dataset.page;
//spawn buildings array specific to that room
const buildings = createBuildings(currentPage);
const player = new Player();
const bullets = [];
const enemies = [];
const keysPressed = {};
const reload_note=document.querySelector('.reloadText');

// Example: Check for collision with enemies and eat them
function checkCollisionWithEnemies() {
    for (const enemy of enemies) {
        const playerRect = player.element.getBoundingClientRect();
        const enemyRect = enemy.element.getBoundingClientRect();

        if (
            playerRect.left < enemyRect.right &&
            playerRect.right > enemyRect.left &&
            playerRect.top < enemyRect.bottom &&
            playerRect.bottom > enemyRect.top
        ) {
            // Handle collision with the enemy (e.g., eat the enemy)
            player.eatEnemy();

            // Remove the enemy from the screen (or handle it accordingly)
            enemy.remove();
        }
    }
}

// Create enemies
if(currentPage=='casino_interior'){
for (let i = 0; i < 10; i++) {
    enemies.push(new Enemy());
}}else if(currentPage==='bar_interior'){
    for (let i = 0; i < 5; i++) {
        enemies.push(new Enemy());
}}else{
    for (let i = 0; i < 30; i++) {
        enemies.push(new Enemy());
    }
}


function handlePlayerMovement() {
    const directionX = (keysPressed['ArrowRight'] ? 1 : 0) + (keysPressed['ArrowLeft'] ? -1 : 0);
    const directionY = (keysPressed['ArrowDown'] ? 1 : 0) + (keysPressed['ArrowUp'] ? -1 : 0);

    player.move(directionX, directionY);
}

function enemyHit(enemy) {
    // Decrease enemy health
    enemy.health = (enemy.health || 0) - 1;

    // Check if enemy is "dead"
    if (enemy.health <= 0) {
        console.log('Target Eliminated');
        // Remove the enemy
        enemies.splice(enemies.indexOf(enemy), 1);
    }
}


// // Example: Update the game loop to continuously check collisions and update player
// function updateGame() {
//     player.update();

//     // ... (other updates)

//     // Check for collisions with enemies and update player
//     checkCollisionWithEnemies();

//     requestAnimationFrame(updateGame);
// }

// // Start the game loop
// updateGame();


// Game loop
function gameLoop() {
    // Update player
    player.update();

    // Update bullets
    for (const bullet of bullets) {
        bullet.update();
    }

    // Update enemies
    for (const enemy of enemies) {
        enemy.update();

       // Check collision with bullets
for (const bullet of bullets) {
    const bulletRect = bullet.element.getBoundingClientRect();
    const enemyRect = enemy.element.getBoundingClientRect();

    console.log('Bullet Rect:', bulletRect);
    console.log('Enemy Rect:', enemyRect);

    if (
        bulletRect.left < enemyRect.right &&
        bulletRect.right > enemyRect.left &&
        bulletRect.top < enemyRect.bottom &&
        bulletRect.bottom > enemyRect.top
    ) {
        // Bullet hit the enemy
        bullets.splice(bullets.indexOf(bullet), 1);
        enemyHit(enemy);
    }
}
    }

        checkCollisionWithEnemies();


    // Request the next animation frame
    requestAnimationFrame(gameLoop);
}


// Start the game loop
gameLoop();

                // Existing code for the player movement event listener
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
                        case 'Space':
                            // Create a bullet and add it to the bullets array
                            const bullet = new Bullet(player.x, player.y, 5, { x: 1, y: 0 });
                            bullets.push(bullet);
                            break;
                            case 'c':
                                // Toggle between being in the car and on foot
                                player.toggleCar();
                                break;
                    }
                });

                document.addEventListener('keydown', (event) => {
                    // Check if the player is in the car
                    if (player.inCar) {
                        switch (event.key) {
                            case 'ArrowLeft':
                                player.car.setAngle(player.car.angle - 15); // Adjust the angle as needed
                                break;
                            case 'ArrowRight':
                                player.car.setAngle(player.car.angle + 15); // Adjust the angle as needed
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


// Add an event listener to continuously shoot bullets while the mouse click is held down
document.addEventListener('mousedown', (event) => {
    player.shootBullet(event);

    // Create an interval to continuously shoot bullets while the mouse click is held down
    const shootInterval = setInterval(() => {
        player.shootBullet(event);
    }, 100); // Adjust the interval as needed

    // Add an event listener to clear the interval when the mouse click is released
    document.addEventListener('mouseup', () => {
        clearInterval(shootInterval);
    }, { once: true });

});
