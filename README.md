# Glitch Pause Traverse

Small web game built using OOP by L. Akbari and S. Dipi

Vehicle collisions are broken. 
1. Player -> npc 
2. npccar -> player
3. bullets -> npc

eatEnemy()
Player can eatEnemies, but the collisions are also broken now.

Routing is broken ever since I implemented parcel. You can't teleport between rooms anymore, even though the urls are changing. I dont have the time to fix this. This is now a single page game. You can just walk around interior.html and get in the car.

## Car
1. car class in 'car/car.js'

Press C to get in/out of car
Press space to drift the car
Steer with arrow keys

### NpcCar
1. NpcCar extends car class to create an npc vehicle that drives on it's own

## Buildings

1. declare the spawn position (x,y) and size (x,y) of buildings in each room. They are declared in 'building/create_buildings.js'
- Set the ID of the building in "createBuildings()" as well
- If you spawn a building without position coordinates, you can set them with CSS
2. add case in 'teleportToRoom()' found in 'classes/player.js'
3. add handling logic for collision with building in 'checkCollision()' found in 'classes/player.js'

### Casino
1. Walk around the casino
2. Walk into one of the tables to trigger the game, play slots and blackjack!

### Uses

The buildings are used as actual buildings shown in gameworld. But they can be used as objects as well. The teleport "doors", casino "game tables" and more are just buildings.


### Music
Royalty free G-Funk: https://www.youtube.com/watch?v=D4ZsLQqR64U
