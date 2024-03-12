import Car from './car.js';
const currentPage = document.body.dataset.page;


  //‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾//
 //          NPC CARS              //
//________________________________//

export default class NpcCar extends Car {
    constructor(initialX, initialY) {
        super();
        if (currentPage !== 'bar_interior' && currentPage !== 'casino_interior') {
        console.log('contructor called in NpcCar');

        this.speed = 2;
        this.element.id="npcCar";
        this.element.style.left = `${initialX}px`;
        this.element.style.top = `${initialY}px`;
        this.element.classList.add('npcCar')
        }
        
    }

    getCollisionRect() {
        return this.element.getBoundingClientRect();
        //return bounding box for collisions
      }

      //over ride the update() method so the car moves forward on it's own
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
