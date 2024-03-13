# Glitch Pause Traverse

<img width="1439" alt="title" src="https://github.com/sdipis/L_Akbari_S_Dipierdomenico_HW2/assets/72488439/80dc0aac-bda9-4150-b4dc-d868b39ab704">
<img width="1439" alt="main world" src="https://github.com/sdipis/L_Akbari_S_Dipierdomenico_HW2/assets/72488439/6b767395-d845-4298-bd09-e2ddac6bd23e">

Small web game built using OOP by L. Akbari and S. Dipi

## Credits
### Music
Royalty free g funk from youtube
- Title music: https://www.youtube.com/watch?v=YUEG_n2_yq0
- Game theme: https://www.youtube.com/watch?v=HHdnbQwi9JA

## Bugs

Multiple sets of collisions are broken. From adding/editing stuff wrecklessly

These collisions functions are scattered through the player class, car class, and main js file (gta.js) 

eatEnemy()
Player can eatEnemies, but the collisions are broken right now.

## Player
1. Player class is animated
2. You can shoot spit balls if you click on screen. Aim with mouse
3. Change colour of player with paint brush icon in HUD
4. Player can smoke a joint if you press J

## Enemy
1. They walk around aimlessly
2. there are collisions (broken right now) with player/ players car/ bullets (spitballs)

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

### Uses

The buildings are used as actual buildings shown in gameworld. But they can be used as objects as well. The teleport "doors", casino "game tables" and more are just buildings.

### Casino
1. Walk around the casino
2. Walk into one of the tables to trigger the game, play slots and blackjack!

   <img width="1439" alt="casino" src="https://github.com/sdipis/L_Akbari_S_Dipierdomenico_HW2/assets/72488439/000ce8bb-891f-4b03-a088-02c9adc5fc2b">

#### Slots
- play slots by walking into the slot machine (yellow box) in casino
<img width="1439" alt="slots" src="https://github.com/sdipis/L_Akbari_S_Dipierdomenico_HW2/assets/72488439/6e1fc383-a7a7-48c0-a507-af89e428b604">

#### Blackjack
- Play blackjack by walking into the blackjack table in casino

#### Roulette
- under construction

#### Poker
- under construction

### Bar
1. Nothing in the bar yet except a pool table and some chairs

<img width="1439" alt="bar" src="https://github.com/sdipis/L_Akbari_S_Dipierdomenico_HW2/assets/72488439/c6a52604-9ee1-4eb2-babc-8739960315a4">

### Music
Royalty free G-Funk: https://www.youtube.com/watch?v=D4ZsLQqR64U

## Todo

### Player

- Fix collisions
- Add item class + inventory system
- Add global chips function so your chips work with any of the casino games and show up in the players inventory
- Global player position system (so if you teleport from room to room, you land where you should land on other side)
- Player health system
- Advanced player movement (jumping and falling)
- Add sound FX to movements/ functions
- Incoporate the changeColour into the player constructor

### NPC
- NPC emotions (shoot bullets and they run away) (police chase you if you shoot bullets or run over NPCs)
- Add random events for NPCs
- Add more classes of NPCs (dog walkers, skateboarders, etc)
- Add more casino games
- Variances of NpcCars

### Game world
- Day/ night cycle
- weather cycles


### Car
- Fix car controls, they have been shitty ever since drifting was added
- Add sound effects
- Add visual effects (smoke from tires when drifting)
- Upgrades (go to the mechanic and upgrade your engine for more speed, or maybe add a sweet body kit + custom paint job)
