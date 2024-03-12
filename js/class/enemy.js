  //‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾//
 //             Enemy              //
//________________________________//

export default class Enemy {
    constructor() {
        this.element = document.createElement('div');
        this.element.className = 'enemy';
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.speed = 1;
        this.direction = { x: 1, y: 1 };
        document.body.appendChild(this.element);

    }
    stop() {
        //make them stop when yoy hit them with your car
        this.speed=0;
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