import Car from './car.js';
const currentPage = document.body.dataset.page;

export default class Ufo extends Car {
    constructor() {
        if (currentPage !== 'bar_interior' && currentPage !== 'casino_interior') {
            this.element = document.createElement('div');
            this.element.classList.add('car');
            this.element.id = 'car';
            this.element.style.position = 'absolute';
            this.element.style.width = '150px';
            this.element.style.height = '70px';
            this.speed = 2;
            this.angle = 0;  // Initial angle in radians
            this.isDrifting = false; // Flag to indicate if the car is drifting
            document.body.appendChild(this.element);

            // Event listener for keydown and keyup events
            document.addEventListener('keydown', this.handleKeyDown.bind(this));
            document.addEventListener('keyup', this.handleKeyUp.bind(this));
        }
    }

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

    handleKeyDown(event) {
        if (event.key === ' ') {
            // Spacebar is pressed, enable drifting
            this.isDrifting = true;
        }
    }

    handleKeyUp(event) {
        if (event.key === ' ') {
            // Spacebar is released, disable drifting
            this.isDrifting = false;
        }
    }
    move() {
        // Convert angle to radians
        const angleInRadians = this.angle * (Math.PI / 180);
    
        // Calculate lateral movement based on angle for drifting effect
        const lateralMovement = this.isDrifting ? this.speed * 0.1 : 0;
    
        // Update the angle based on lateral movement
        const updatedAngle = this.angle + lateralMovement;
    
        // Calculate new position based on updated angle
        const newX = this.element.offsetLeft + this.speed * Math.cos(updatedAngle);
        const newY = this.element.offsetTop + this.speed * Math.sin(updatedAngle);
    
        // Check if the new position is within the window boundaries
        if (
            newX >= 0 &&
            newY >= 0 &&
            newX + this.element.offsetWidth <= window.innerWidth &&
            newY + this.element.offsetHeight <= window.innerHeight
        ) {
            this.element.style.left = `${newX}px`;
            this.element.style.top = `${newY}px`;
            this.setAngle(updatedAngle);
        }
    }

    update() {
        // Update the car's position based on its angle and drifting state
        this.move();
    }
}
