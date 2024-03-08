class Building {
    constructor(id, x, y, width, height) {
        this.id = id;
        this.element = document.createElement('div');
        this.element.id = id;
        this.element.style.position = 'absolute';
        this.element.style.left = `${x}px`;
        this.element.style.top = `${y}px`;
        this.element.style.width = `${width}px`;
        this.element.style.height = `${height}px`;
        this.element.style.backgroundColor = 'brown';
        document.body.appendChild(this.element);
    }

    getBoundingClientRect() {
        return this.element.getBoundingClientRect();
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
        case 'interior':
            return [
                new Building('building3', 200, 160, 80, 120),
                new Building('building4', 300, 160, 150, 200),
                new Building('building5', 400, 500, 800, 900)

                // Add more buildings for the 'interior' page as needed
            ];
        default:
            return []; // Default to an empty array if no specific buildings are defined
    }
}

// Get the page value from body.dataset
const currentPage = document.body.dataset.page;

// Define the buildings array based on the page
const buildings = createBuildings(currentPage);


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
        this.speed = 2;
        this.direction = { x: 1, y: 1 };
        document.body.appendChild(this.element);
    }

    update() {
        // Move randomly
        if (Math.random() < 0.02) {
            this.direction.x = Math.random() > 0.5 ? 1 : -1;
        }
        if (Math.random() < 0.02) {
            this.direction.y = Math.random() > 0.5 ? 1 : -1;
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

class Player {
    constructor() {
        this.element = document.getElementById('player');
        this.x = 0;
        this.y = 0;
        this.speed = 5;
        this.update();


    }

    move(directionX, directionY) {
        this.x += this.speed * directionX;
        this.y += this.speed * directionY;

        this.checkCollision();
        this.update();
    }

    teleportToRoom(buildingId) {
        switch (buildingId) {
            case 'building2':
    console.log('Teleporting to Room 2');
    // Implement logic to navigate to the corresponding room or change the location
    // For example, redirect to the main room (gta.html)
    window.location.href = 'interior.html';
    break;
            case 'door':
                console.log('Teleporting through the door');
                // Implement logic to navigate to the corresponding room or change the location
                // For example, redirect to the interior room (interior.html)
                window.location.href = 'interior.html';
                break;
            // Add more cases for other buildings as needed
            default:
                console.log(`Unknown buildingId: ${buildingId}`);
                break;
        }
    }
    // shoot() {
    //     // Create a bullet and add it to the bullets array
    //     // const bullet = new Bullet(this.x, this.y, 1, { x: 1, y: 0 });
    //     bullets.push(bullet);
    // }

    
    update() {
        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }



    checkCollision() {
        const playerRect = this.element.getBoundingClientRect();
    
        // Example: Check collision with each building
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
                console.log(`Player collided with building ${building.id}`);
            }
        }
    }

       // New method to handle mouse clicks
       shootBullet(event) {
        // Create a new bullet element
        const bullet = document.createElement('div');
        bullet.className = 'bullet';
        document.body.appendChild(bullet);

        // Set the initial position of the bullet to match the player's position
        bullet.style.left = `${this.x}px`;
        bullet.style.top = `${this.y}px`;

        // Calculate the angle between the player and the mouse click
        const angle = Math.atan2(event.clientY - this.y, event.clientX - this.x);

        // Set the initial speed of the bullet
        const bulletSpeed = 10;

        // Move the bullet in the direction of the mouse click
        const bulletMove = () => {
            const bulletRect = bullet.getBoundingClientRect();

            // Update bullet position based on angle and speed
            bullet.style.left = `${bulletRect.left + bulletSpeed * Math.cos(angle)}px`;
            bullet.style.top = `${bulletRect.top + bulletSpeed * Math.sin(angle)}px`;

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
        // document.addEventListener('click', () => this.shoot());

    }
    
}

    

const player = new Player();
const bullets = [];
const enemies = [];

// Create enemies
for (let i = 0; i < 10; i++) {
    enemies.push(new Enemy());
}

const keysPressed = {};

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
}


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

    // Request the next animation frame
    requestAnimationFrame(gameLoop);
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

// Start the game loop
gameLoop();

// Existing code for the player movement event listener
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            player.move(0, -1);
            break;
        case 'ArrowDown':
            player.move(0, 1);
            break;
        case 'ArrowLeft':
            player.move(-1, 0);
            break;
        case 'ArrowRight':
            player.move(1, 0);
            break;
        case 'Space':
            // Create a bullet and add it to the bullets array
            const bullet = new Bullet(player.x, player.y, 5, { x: 1, y: 0 });
            bullets.push(bullet);
            break;
    }
});

document.addEventListener('click', (event) => {
    // Handle mouse clicks for shooting bullets
    player.shootBullet(event);
    console.log('bang');
});
