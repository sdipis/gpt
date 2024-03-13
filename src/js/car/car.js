const currentPage = document.body.dataset.page;

export default class Car {
    constructor() {
        if (currentPage !== 'bar_interior' && currentPage !== 'casino_interior') {
            this.element = document.createElement('div');
            this.element.classList.add('car');
            this.element.id = 'car';
            this.element.style.position = 'absolute';
            this.element.style.width = '150px';
            this.element.style.height = '70px';
            this.speed = 1.5;
            this.angle = 0;  // Initial angle in radians
            this.isDriftingLeft = false; // Flag to indicate if the car is drifting left
            this.isDriftingRight = false; // Flag to indicate if the car is drifting right
            this.currentArrowKey = null; // Currently pressed arrow key
            document.body.appendChild(this.element);

            // Event listeners for keydown and keyup events
            document.addEventListener('keydown', this.handleKeyDown.bind(this));
            document.addEventListener('keyup', this.handleKeyUp.bind(this));
        }
    }
    

    setPosition(x, y, spawnAngle = 0) {
        if (this.element) { // Check if the element exists before setting its style
            this.element.style.left = `${x}px`;
            this.element.style.top = `${y}px`;
            this.setAngle(spawnAngle);
        }
    }

    setAngle(newAngle) {
        if (this.element) { // Check if the element exists before setting its style
            this.angle = newAngle;
            this.element.style.transform = `rotate(${this.angle}deg)`;
        }
    }


handleKeyDown(event) {
    switch (event.key) {
        case ' ':
            // Spacebar is pressed, enable drifting
            this.isDrifting = true;
            break;
        case 'ArrowLeft':
            // Turning left
            this.isTurningLeft = true;
            break;
        case 'ArrowRight':
            // Turning right
            this.isTurningRight = true;
            break;
    }
}

handleKeyUp(event) {
    switch (event.key) {
        case ' ':
            // Spacebar is released, disable drifting
            this.isDrifting = false;
            break;
        case 'ArrowLeft':
            // Stop turning left
            this.isTurningLeft = false;
            break;
        case 'ArrowRight':
            // Stop turning right
            this.isTurningRight = false;
            break;
    }
}

move() {
    // Convert angle to radians
    const angleInRadians = this.angle * (Math.PI / 180);

    // Calculate lateral movement based on angle for drifting effect
    const lateralMovement = this.isDrifting ? 0.05 * (this.isTurningLeft ? -1 : 1) : 0;

    // Gradually adjust the angle for drifting
    const driftFactor = 25; // Adjust as needed
    this.angle += lateralMovement * driftFactor;

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
        this.element.style.transform = `rotate(${this.angle}deg)`;
    }
}


    update() {
        // Update the car's position based on its angle and drifting state
        this.move();
    }
}
