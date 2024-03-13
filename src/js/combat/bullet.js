// bullets.js
const bullets = [];
const reload_note = document.querySelector('.reloadText');

export default class Bullet {
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

    remove() {
        // Remove the bullet from the DOM and bullets array
        this.element.remove();
        const index = bullets.indexOf(this);
        if (index !== -1) {
            bullets.splice(index, 1);
        }
    }
}

export { bullets, reload_note };