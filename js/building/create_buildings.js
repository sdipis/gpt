import Building from '../class/buildings.js';

const currentPage = document.body.dataset.page;
const buildings = createBuildings(currentPage);
const player = document.getElementById('player'); // Assuming you have a player element with id 'player'

//declare building size + locations here
function createBuildings(page) {
    switch (page) {
        case 'home':
            return [
                new Building('building1', 100, 100, 100, 150),
                new Building('building2', 300, 200, 120, 180)
                // Add more buildings for the 'home' page as needed
            ];
            case 'bar_interior':
                return [
                    new Building('bar-door', 0, 300, 15, 80),
                    new Building('pool-table',
                    1000, 150, 250, 174),
                    new Building('casino-chairs', 
                    850, 400, 106*1.9, 97*1.9),
                    new Building('casino-chairs', 
                    550, 550, 106*1.9, 97*1.9),
                    new Building('casino-chairs', 
                    550, 200, 106*1.9, 97*1.9),
                    new Building('casino-chairs', 
                    250, 450, 106*1.9, 97*1.9),
                ];
                case 'casino_interior':
                    return [
                        new Building('casino-door', 
                        0, 300, 15, 80),

                        new Building('poker-table', 
                        250, 60, 345*.85, 174*.85),

                        new Building('blackjack-table', 
                        600, 300, 240*.75, 160*.75),

                        // new Building('dice-table', 
                        // 300, 260, 120, 80),

                        new Building('roulette-table', 
                        300, 520, 340, 174),

                        new Building('casino-bar', 
                        810, 0, 450, 80),

                        new Building('bar-right', 
                        1260, 0, 100, 100),

                        new Building('casino-chairs', 
                        950, 400, 90*1.9, 87*1.9),


                        new Building('casino-chairs', 
                        1100, 150, 90*1.9, 87*1.9),

                        new Building('slot-machine',
                        650, 0, 80, 80),





                        // Add more buildings for the 'home' page as needed
                    ];
        case 'interior':
            return [
                new Building('toll_1b'), //toll 1_b

                new Building('building3', 180, 180, 77.3*2.5, 132.14*2.5), //gas
                    // new Building('gas_dumpster', 160, 300, 50, 80), //

                new Building('building4', 400, 180, 244*1.5, 206*1.5), //bar
                    new Building('bar_parking', 740, 180, 150, 210), //bar
                    new Building('bar_carpet_outside', 500, 160, 120, 20), //bar

                new Building('building6', 1000, 500, 600, 1000) //casino
                // new Building('building5', 1300, 180, 300, 200) //pot shop

            ];
            case 'interior_2':
                return [
                    new Building('casino_right', 0, 500, 600, 1000), 
                    new Building('pot_right', 0, 180, 300, 200), 

                    new Building('toll_2a'), // to T1B
                    new Building('toll_2b') // to T3A
                ];

                case 'interior_3':
                    return [
                        new Building('home', 700, 200, 220, 320), //casino
                        new Building('garden', 600, 200, 100, 320), //casino

                        new Building('toll_3a') // to T2B
                    ];
        default:
            return []; // Default to an empty array if no specific buildings are defined
    }
}

export default buildings;
