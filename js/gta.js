


  //‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾//
 //            Player              //
//________________________________//
class Player {
    constructor() {
        this.car = new Car();
        this.car.setPosition(680, 240, 90); // Set the initial position (example: x=200, y=300) and angle (45 degrees)
        this.element = document.getElementById('player');
        this.x = 0;
        this.y = 0;
        this.speed = 10;
        this.inCar = false;
        this.size= 20;
        this.bulletsShot = 0;
        this.maxBullets = 50;
        this.isReloading = false;
        this.update();
        this.updateBulletsDisplay();

        this.carPositionChangeListener = () => {
            // Update the player's position to match the car's position
            if (this.isInCar) {
                const carRect = this.car.element.getBoundingClientRect();
                this.x = carRect.left;
                this.y = carRect.top;
                this.update();
            }
        };
        //car position listener
        document.addEventListener('carPositionChange', this.carPositionChangeListener);

        this.pixelSpawnIntervalId = null; //for smoking joint (j)
            document.addEventListener('keydown', (event) => {
                if (event.key === 'j') {
                    this.startPixelSpawning(); //start spawning pixels when user
                                              //presses 'j'
                }
            });

    } 
    
        //‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾\\
       //                         \\
      //       Eat NPC Logic       \\
     //                             \\
    //_______________________________\\

    eatEnemy() {
        // Increase player's size and speed when an enemy is eaten
        this.size += 5; //how much #player grows when 1 NPC is eaten
        this.speed += 0.1; //how much speed is added when 1 NPC is eaten

        //apply the size to the html elements
        this.element.style.height = `${this.size}px`;
        this.element.style.width = `${this.size}px`;

        // console.log(`Player size: ${this.size}, Player speed: ${this.speed}`);
    }

        //‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾\\
       //                         \\
      //        Smoke Joint        \\
     //                             \\
    //_______________________________\\

     //start smoke spawn
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
        }, 3500);
    }

    // stop smoke spawn
    stopPixelSpawning() {
        clearInterval(this.pixelSpawnIntervalId);
    }

    // spawn smoke
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

        //‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾\\
       //                         \\
      //       Gun + Bullets       \\
     //                             \\
    //_______________________________\\

    updateBulletsDisplay() {
        document.getElementById('bulletsCount').textContent = this.bulletsCount;
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
    
        //increment bullets shot (10 in a clip) set in player constructor
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
                    
                        this.bulletsShot = 0; //reset bullet count on reload
                        this.isReloading = false; //sets flag to false to finish reload
                        // console.log('Reloaded');
                        // Remove the event listener
                        document.removeEventListener('keydown', reloadListener);
                        /* The event listener is removed after reload, so player
                        can't abuse it by spamming it/ holding it down        */
            }
        
        // once:true makes the event only happen once, and then the listener is removed
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

    startReloading() {
        // Set isReloading to true
        this.isReloading = true;
    
        // Add an event listener for the "R" key to finish reloading
        const reloadListener = (event) => {
            if (event.key === 'R' || event.key === 'r') {
                // Reset bulletsShot count and set isReloading to false
                this.bulletsShot = 0;
                this.isReloading = false;
    
                // Reset bullets count to full and update display
                this.bulletsCount = this.maxBullets; //this number is set in player constructor
                this.updateBulletsDisplay();
    
                console.log('Reload complete. Ready to shoot!');
                reload_note.style.display="none";

                // Remove the event listener
                document.removeEventListener('keydown', reloadListener);
            }
        };
    
        document.addEventListener('keydown', reloadListener, { once: true });
    }

        //‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾\\
       //                       \\
      //        Car Logic        \\
     //                           \\
    //_____________________________\\

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

        //‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾\\
       //                       \\
      //     Player Logic        \\
     //                           \\
    //_____________________________\\

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


          //‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾\\
         //                       \\
        //        COLLISION        \\
       //   + set teleport in here  \\
      //                             \\
     //_______________________________\\

    checkCollision() {

        // define player collision box
        const playerRect = this.element.getBoundingClientRect();

        // buildings collision logic
        for (const building of buildings) {
            // define each building with a collision box
            const buildingRect = building.getBoundingClientRect();
            
            if (
                playerRect.left < buildingRect.right &&
                playerRect.right > buildingRect.left &&
                playerRect.top < buildingRect.bottom &&
                playerRect.bottom > buildingRect.top
            ) {

                // Room 1
                if (building.id === 'building2') {this.teleportToRoom(building.id);} // Room 2 enter

                // Room 2
                if (building.id === 'building4') {this.teleportToRoom(building.id);} //bar enter
                if (building.id === 'bar-door') {this.teleportToRoom(building.id);} // bar exit
                if (building.id === 'building6') {this.teleportToRoom(building.id);} // casino enter
                if (building.id === 'casino-door') {this.teleportToRoom(building.id);} // casino exit
                if (building.id === 'blackjack-table') {this.teleportToRoom(building.id);} // blackjack start

                // console.log(`Player collided with building ${building.id}`);
            }
        }
    }
    
    
}
// end of Player Class
//





  //‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾//
 //             Enemy              //
//________________________________//
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
// end of Enemy Class
//





  //‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾//
 //          Car (truck)           //
//________________________________//
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

    setPosition(x, y, spawnAngle = 0) {
        // Set the initial position and angle of the car
        this.element.style.left = `${x}px`;
        this.element.style.top = `${y}px`;
        this.setAngle(spawnAngle);
    }

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
// end of Car Class
//
  //‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾//
 //          NPC CARS              //
//________________________________//
class NpcCar extends Car {
    constructor(initialX, initialY) {
        // Call the constructor of the parent class
        super();

        // Set a specific speed for the NPC car
        this.speed = 2;
        this.element.style.height = '60px';
        this.element.style.left = '120px';
        this.element.style.left = `${initialX}px`;
        this.element.style.top = `${initialY}px`;
        this.element.classList.add('npcCar')
    }

    // Override the update method to make the NPC car move forward
    update() {
        // Calculate new position based on the current angle
        const newX = this.element.offsetLeft + this.speed;

        // Check if the new position is within the window boundaries
        if (newX + this.element.offsetWidth <= window.innerWidth) {
            this.element.style.left = `${newX}px`;
        } else {
            // Reset position to the left of the screen when it goes off-screen
            this.element.style.left = `0px`;
        }
    }
}





  //‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾//
 //         Building               //
//________________________________//
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
// end of Building Class
//




  //‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾//
 //          Bullets               //
//________________________________//
class Bullet {
    constructor(x, y, speed, direction, lifespan) {
        this.element = document.createElement('div');
        this.element.className = 'bullet';
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.direction = direction;
        this.lifespan = lifespan;
        this.fireRate = 20;

        document.body.appendChild(this.element);
    }

    update() {
        this.x += this.speed * this.direction.x;
        this.y += this.speed * this.direction.y;
        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;

        this.lifespan--;

        if (this.lifespan <= 0) {
            this.remove();
        }
    }
    
}


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





  //‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾//
 //          Initialize            //
//________________________________//
const bullets = [];
const currentPage = document.body.dataset.page;
const buildings = createBuildings(currentPage);
const player = new Player();
const npcCarInitialX = 20;
const npcCarInitialY = 0;
const sundayDriver = new NpcCar(npcCarInitialX, npcCarInitialY);const enemies = [];
const keysPressed = {};
const reload_note=document.querySelector('.reloadText');

  //‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾//
 //        Buildings Create        //
//________________________________//

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
                new Building('building3', 200, 180, 160, 240), //gas
                new Building('building4', 400, 180, 300, 400), //bar
                new Building('building6', 1000, 600, 600, 300), //casino
                new Building('building5', 1300, 180, 300, 200) //pot shop


                // Add more buildings for the 'interior' page as needed
            ];
        default:
            return []; // Default to an empty array if no specific buildings are defined
    }
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
        12 //patrons will spawn in the outside portions
        ; i++) {
        enemies.push(new Enemy());
    }
}



                 //‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾//
                //       Player Movement          //
               //________________________________//


                function handlePlayerMovement() {
                const directionX = (keysPressed['ArrowRight'] ? 1 : 0) + (keysPressed['ArrowLeft'] ? -1 : 0);
                const directionY = (keysPressed['ArrowDown'] ? 1 : 0) + (keysPressed['ArrowUp'] ? -1 : 0);
                player.move(directionX, directionY);
                }

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
                                player.car.setAngle(player.car.angle - 15); // Adjust the angle as needed
                                break;
                            case 'ArrowRight':
                                player.car.setAngle(player.car.angle + 15); // Adjust the angle as needed
                                break;
                        }
                    }
                }); //controls for while in truck
                
                document.addEventListener('keydown', (event) => {
                keysPressed[event.key] = true;
                handlePlayerMovement();
                });
                
                document.addEventListener('keyup', (event) => {
                keysPressed[event.key] = false;
                handlePlayerMovement();
                });

  //‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾//
 //           Eat NPC              //
//________________________________//

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


   //‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾//
  //           Game Loop            //
 //________________________________//
/* This is the main brain of the   /
   the operations.               */

function gameLoop() {
    // Update player
    player.update();
    sundayDriver.update();


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
    
    // Check collision with enemies
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
                enemyHit(enemy);
                console.log('enemy hit');
                break; // Exit the inner loop once a collision is detected
            }
        }
    }

        // Update bullets
        for (const bullet of bullets) {
            bullet.update();
        }
    //car collisions

    function checkCarCollision() {
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

    // Update enemies
    for (const enemy of enemies) {
        enemy.update();}

        checkCollisionWithEnemies();
        checkCarCollision();


    // Request the next animation frame
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();