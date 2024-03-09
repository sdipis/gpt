
  //‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾//
 //          Car (truck)           //
//________________________________//
export class Car {
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