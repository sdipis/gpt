import Car from './car.js';
const currentPage = document.body.dataset.page;

// NPC CARS

export default class NpcCar extends Car {
    constructor(initialX, initialY) {
        super();
        if (currentPage !== 'bar_interior' && currentPage !== 'casino_interior') {
            console.log('constructor called in NpcCar');

            this.speed = 2;
            this.element.id = "npcCar";
            this.element.style.left = `${initialX}px`;
            this.element.style.top = `${initialY}px`;
            this.element.classList.add('npcCar');
        } else {
            // If it's the wrong page, set the element to null to prevent further operations
            this.element = null;
        }
    }

    getCollisionRect() {
        if (this.element) { // Ensure the element exists before getting its bounding box
            return this.element.getBoundingClientRect();
        }
        return null;
    }

    // Override the update() method so the car moves forward
    update() {
        if (this.element) { // Ensure the element exists before updating its position
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
}