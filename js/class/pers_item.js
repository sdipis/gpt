import Item from './item.js';

export default class Pers_Item extends Item {
    constructor(player, name, description, imgSrc, initialX, initialY) {
        super(player, name, description, imgSrc, initialX, initialY);
        this.player = player;
        this.isInInventory = false;
        this.createHTML();
    }

    // Override the method that handles item usage
    use() {
        // Implement the logic for using the persistent item here
        // For example, if it's a consumable item, it may affect the player's stats but doesn't disappear
        // If it's not a consumable, you might have different logic based on your game's requirements
        // For now, let's just log a message
        console.log(`${this.name} is being used.`);
    }

    // Override the method that handles item removal from inventory
    removeFromInventory() {
        // Since this is a persistent item, it never gets removed from inventory
        // You may implement some logic here if you need to handle certain cases differently
        // For now, let's just log a message
        console.log(`${this.name} is persistent and cannot be removed from inventory.`);
    }
}
