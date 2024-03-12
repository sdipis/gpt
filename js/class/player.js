import Car from '../car/car.js';
import buildings from '../building/building.js';
import { reload_note } from '../combat/bullet.js';
// import Enemy from './enemy.js';
  //‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾//
 //            Player              //
//________________________________//
export default class Player {
    constructor(currentPage) {
        this.car = new Car();
        this.element = document.getElementById('player');
        // if(currentPage==='interior'){
        this.car.setPosition(680, 240, 90);
        // this.setPosition(100, 300);
        // this.enemies = [];

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
            // TOLL PORTS
            case 'toll_1b':
                console.log('T1B -> T2A');
                // Implement logic to navigate to the corresponding room or change the location
                // For example, redirect to the main room (gta.html)
                window.location.href = 'interior_2.html';   
                break;
            case 'toll_2a':
                console.log('T2A -> T1B');
                window.location.href = 'interior.html';   
                break;
                case 'toll_2b':
                    console.log('T2A -> T1B');
                    window.location.href = 'interior_3.html';   
                    break;
                    case 'toll_3a':
                        console.log('T2A -> T1B');
                        window.location.href = 'interior_2.html';   
                        break;
            
            
            
            
                default:
                console.log(`Unknown buildingId: ${buildingId}`);
                break;
        }
    }


          //‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾\\
         //                       \\
        //   BUILDING COLLISION    \\
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

                //toll ports
                if (building.id === 'toll_1b') {this.teleportToRoom(building.id);} // blackjack start
                if (building.id === 'toll_2a') {this.teleportToRoom(building.id);} // blackjack start
                if (building.id === 'toll_2b') {this.teleportToRoom(building.id);} // blackjack start
                if (building.id === 'toll_3a') {this.teleportToRoom(building.id);} // blackjack start



                // console.log(`Player collided with building ${building.id}`);
            }
        }
    }
    
    
}