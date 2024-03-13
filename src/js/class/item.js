const player = document.querySelector('#player');

export default class Item {
    constructor(name, x, y) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.isPickedUp = false;
    }

    draw(context) {
        if (!this.isPickedUp) {
            context.fillStyle = 'green'; // Adjust the color of the item
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    getBoundingBox() {
        return {
            left: this.x,
            right: this.x + this.width,
            top: this.y,
            bottom: this.y + this.height,
        };
    }

    // Check if the player picked up the item
    checkPlayerCollision(player) {
        if (!this.isPickedUp) {
            const itemRect = this.getBoundingBox();
            const playerRect = player.getBoundingBox();

            if (
                itemRect.left < playerRect.right &&
                itemRect.right > playerRect.left &&
                itemRect.top < playerRect.bottom &&
                itemRect.bottom > playerRect.top
            ) {
                // Player picked up the item
                this.isPickedUp = true;
                // You can add additional logic here (e.g., add to inventory, update HUD)
                player.addItemToInventory(this);
                if (player.HUD && typeof player.HUD.updateInventory === 'function') {
                    player.HUD.updateInventory(this);
                }
            }
        }
    }
}
