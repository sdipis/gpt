import Car from '../car/car.js';
import buildings from '../building/create_buildings.js';
import { reload_note } from '../combat/bullet.js';
import Ufo from '../car/ufo.js';

// import Enemy from './enemy.js';

  //‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾//
 //            Player              //
//________________________________//
export default class Player {
    constructor(currentPage) {
        this.car = new Car();
        this.element = document.getElementById('player');
        // if(currentPage==='interior'){
        this.car.setPosition(700, 360, 45);
        // this.spaceship=new Ufo();
        // this.spaceship.setPosition(1200, 240, 90);

        // this.setPosition(100, 300);
        // this.enemies = [];
        this.x = 0;
        this.y = 0;
        this.speed = 10;
        this.inCar = false;
        this.inUfo = false;

        this.size= 20;
        this.bulletsShot = 0;
        this.maxBullets = 50;
        this.isReloading = false;
        this.inventory=[];
        const inventoryData = this.inventory.map(item => ({ name: item.name, description: item.description, imgSrc: item.imgSrc }));
        this.hasWeapon=false;
        this.update();
        this.updateBulletsDisplay();



                // // Retrieve stored player position or set default position
                // const storedPosition = localStorage.getItem('playerPosition');
                // if (storedPosition) {
                //     const playerPosition = JSON.parse(storedPosition);
                //     this.spawn(playerPosition.x, playerPosition.y, playerPosition.angle);
                // } else {
                //     this.spawn(680, 240, 90); // Default spawn position
                // }

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

        //ufo listener
        this.ufoPositionListener = () => {
            // Update the player's position to match the car's position
            if (this.isInUfo) {
                const ufoRect = this.spaceship.element.getBoundingClientRect();
                this.x = ufoRect.left;
                this.y = ufoRect.top;
                this.update();
            }
        };
        //car position listener
        document.addEventListener('ufoPositionChange', this.ufoPositionListener);

        this.pixelSpawnIntervalId = null; //for smoking joint (j)
            document.addEventListener('keydown', (event) => {
                if (event.key === 'j') {
                    this.startPixelSpawning(); //start spawning pixels when user
                                              //presses 'j'
                }
            });

    } 

    // getPosition() {
    //     return {
    //         x: this.x,
    //         y: this.y,
    //         angle: this.angle
    //     };
    // }

    // spawn(x, y, angle) {
    //     this.x = x;
    //     this.y = y;
    //     this.angle = angle;

    //     this.update();
    // }


        //‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾\\
       //                         \\
      //       Player Items        \\
     //                             \\
    //_______________________________\\



// Inside your Player class
addToInventory(item) {
    this.inventory.push(item);
    // Optionally, you can update the UI to reflect the change in the inventory
}

//update inventory when user picks up an item
//this also has event listeners for clicking on the item while in inventory to use it
updateInventoryDisplay() {
    console.log('updating inventory');
    const inventoryContainer = document.querySelector('.inventoryScreen');
    inventoryContainer.innerHTML = ''; // Clear existing inventory items

    // Loop through the player's inventory and create HTML elements for each item
    this.inventory.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('inventory-item');
        itemElement.innerHTML = `
            <img src="${item.imgSrc}" alt="${item.name}">
        `;
        // Add an event listener to each item element
        itemElement.addEventListener('click', () => {
            // Remove the clicked item from the inventory
            this.removeFromInventory(item);
            // Update the inventory display
            this.updateInventoryDisplay();
            // Apply the effects of the item to the player
            this.applyItemEffects(item);
        });

        inventoryContainer.appendChild(itemElement);
    });
}

removeFromInventory(itemToRemove) {
    this.inventory = this.inventory.filter(item => item !== itemToRemove);
}

applyItemEffects(item) {
    // Check the properties of the item and apply effects accordingly
    console.log(item)

    switch (item.name) {
        case 'Red Shoes':
            this.element.style.fill = '#F91001';
            this.element.speed += 10;
            console.log('Player Speed: '+this.speed);
            break;
        case 'Blue Shoes':
            this.element.style.stroke = '#00affa';
            console.log(item,' consumed');
            break;
        case 'Beer Bottle':
            document.querySelector('body').style.filter = 'blur(2px)';
            setTimeout(document.querySelector('body').style.filter = 'blur(2px)', 5);
            console.log(item,' consumed');
            break;
        case 'Baseball Bat':
            console.log('using bat');
            //set flag to true so user can swing the bat if he has it
            this.hasWeapon=true;
            console.log('Player has a ',item)
        break;
        default:
            console.log(item, 'unknown effects');
            break;
    }
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
        pixel.classList.add('pixel');
        pixel.style.position = 'absolute';
        pixel.style.width = '5px';
        pixel.style.height = '5px';
        pixel.style.backgroundColor = 'white';
        pixel.style.left = `${this.x}px`;
        pixel.style.top = `${this.y}px`;

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
    };

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
    };

        //‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾\\
       //                       \\
      //      Car/Ufo Logic      \\
     //                           \\
    //_____________________________\\
toggleUfo(){
    this.inUfo = !this.inUfo;
        // Add logic here to handle the visual changes or other actions when entering/exiting the car
        if (this.inUfo) {
            console.log('Entering the UFO');
            // Add visual changes or other actions when entering the car
            this.element.style.display = 'none';  // Hide the player when in the car
        } else {
            console.log('Exiting the UFO');
            // Add visual changes or other actions when exiting the car
            this.element.style.display = 'block';  // Show the player when exiting the car
        }
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
    
    update() {
        if (this.inCar) {
            // Update the player's position to match the car's position
            const carRect = this.car.element.getBoundingClientRect();
            this.x = carRect.left;
            this.y = carRect.top;
            this.car.update(); // Call the update method of the car
        }

        if (this.inUfo){
                        // Update the player's position to match the car's position
            const ufoRect = this.spaceship.element.getBoundingClientRect();
            this.x = ufoRect.left;
            this.y = ufoRect.top;
            this.spaceship.update(); // Call the update method of the car
        }

        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }

        //‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾\\
       //                       \\
      //     Player Logic        \\
     //                           \\
    //_____________________________\\

    //  move(directionX, directionY) {
    //     if (this.inCar) {
    //         // Move the car
    //         this.car.move(directionX, directionY);
    //         this.car.update();
            
    //     } else {
    //         // Calculate the new position based on the direction
    //         this.x += this.speed * directionX;
    //         this.y += this.speed * directionY;
    
    //         // Check for collisions
    //         this.checkCollision();
    //     }
    
    //     // Update the player's position
    //     this.update();
    // }
    

    teleportToRoom(buildingId) {
        switch (buildingId) {
            case 'building4':
                console.log('Entering the bar');
                this.navigateToRoom('../rooms/bar.html');
                break;
            case 'building6':
                console.log('Entering the casino');
                this.navigateToRoom('../rooms/casino.html');
                break;
            case 'building2':
                console.log('Teleporting to Main');
                this.navigateToRoom('../rooms/interior.html');
                break;
            case 'door':
                console.log('Teleporting through the door');
                this.navigateToRoom('../rooms/interior.html');
                break;
            case 'bar-door':
            case 'casino-door':
                console.log('Teleporting outside');
                this.navigateToRoom('../rooms/interior.html');
                break;
            case 'blackjack-table':
                console.log('Starting Blackjack');
                this.navigateToRoom('../rooms/games/blackjack.html');
                break;
            case 'poker-table':
                console.log('Starting Roulette');
                this.navigateToRoom('../rooms/games/roulette.html');
                break;
            case 'roulette-table':
                console.log('Starting Poker');
                this.navigateToRoom('../rooms/games/poker.html');
                break;
            case 'slot-machine':
                console.log('Starting Slots');
                this.navigateToRoom('../rooms/games/slots.html');
                break;
            case 'toll_1b':
                console.log('T1B -> T2A');
                // pass inventory items
                sessionStorage.setItem('inventory', JSON.stringify(this.inventoryData));
                this.navigateToRoom('../rooms/interior_2.html');
                break;
            case 'toll_2a':
                console.log('T2A -> T1B');
                this.navigateToRoom('../rooms/interior.html');
                break;
            case 'toll_2b':
            case 'toll_3a':
                console.log('T2A -> T1B');
                this.navigateToRoom('../rooms/interior_3.html');
                break;
            default:
                console.log(`Unknown buildingId: ${buildingId}`);
                break;
        }
    }
    
    navigateToRoom(roomPath) {
        window.location.href = roomPath;
    }

    move(directionX, directionY) {
        if (this.inCar) {
            // Move the car
            this.car.move(directionX, directionY);
            this.car.update();
        } else {
            // Calculate the intended movement
            const dx = this.speed * directionX;
            const dy = this.speed * directionY;
    
            // Save the current position as the previous position
            const previousX = this.x;
            const previousY = this.y;
    
            // Calculate the new position based on the direction
            this.x += dx;
            this.y += dy;
    
            // Check for collisions
            this.checkCollision(dx, dy);
    
            // If a collision occurred, adjust the player's position accordingly
            if (this.collidedWithBuilding) {
                // Revert the player's position to the previous position
                this.x = previousX;
                this.y = previousY;
                this.collidedWithBuilding = false; // Reset collision flag
            }
        }
    
        // Update the player's position
        this.update();
    }
    
    checkCollision(dx, dy) {
        // Define player collision box after movement
        const playerRect = this.element.getBoundingClientRect();
    
        // Calculate player's new position after movement
        const newPlayerRect = {
            left: playerRect.left + dx,
            right: playerRect.right + dx,
            top: playerRect.top + dy,
            bottom: playerRect.bottom + dy
        };
    
        // Reset collision flag
        this.collidedWithBuilding = false;
    
        // Buildings collision logic
        for (const building of buildings) {
            // Check if collision is enabled for the building
            if (!building.collisionEnabled) continue;
    
            // Define each building with a collision box
            const buildingRect = building.getBoundingClientRect();
            
            if (
                newPlayerRect.left < buildingRect.right &&
                newPlayerRect.right > buildingRect.left &&
                newPlayerRect.top < buildingRect.bottom &&
                newPlayerRect.bottom > buildingRect.top
            ) {
                // Handle collision logic here
                console.log(`Player collided with building ${building.id}`);
    
                // Set collision flag
                this.collidedWithBuilding = true;
                return; // Exit collision detection loop
            }
        }
    }
    
    
    
    
}
