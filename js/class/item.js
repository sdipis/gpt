// import Player from '../class/player.js';

export default class Item {
    constructor(player, name, description, imgSrc, initialX, initialY) {
        this.player=player;
        this.name = name;
        this.description = description;
        this.imgSrc = imgSrc;
        this.initialX = initialX;
        this.initialY = initialY;
        this.element = null;
        this.isInInventory = false;
        this.createHTML();

    }

    createHTML() {
        this.element = document.createElement('div');
        this.element.classList.add('item');
        this.element.innerHTML = `
            <img src="${this.imgSrc}" alt="${this.name}">
        `;
        // Set initial position based on initialX and initialY
        this.element.style.position = 'absolute';
        this.element.style.left = `${this.initialX}px`;
        this.element.style.top = `${this.initialY}px`;

        this.element.addEventListener('click', () => {
            this.pickUp();
        });
    }
// removeFromInventory(itemToRemove) {
//     this.inventory = this.inventory.filter(item => item !== itemToRemove);
// }

pickUp() {
    //pick up the item into inventory
    if (!this.isInInventory) {
        console.log(`Picked up ${this.name}`);
        this.element.remove();
        this.isInInventory = true;

        // Add the item to the player's inventory
        this.player.addToInventory(this);

        // Update the inventory display
        this.player.updateInventoryDisplay();

    }
}

}
