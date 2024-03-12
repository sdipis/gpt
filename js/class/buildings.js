
//‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾//
 //         Building               //
//________________________________//
export default class Building {
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