import Building from '../class/buildings.js';
const currentPage = document.body.dataset.page;
const buildings = createBuildings(currentPage);

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
                    // Add more buildings for the 'home' page as needed
                ];
                case 'casino_interior':
                    return [
                        new Building('casino-door', 0, 300, 15, 80),
                        new Building('poker-table', 500, 400, 343, 174),
                        new Building('blackjack-table', 800, 50, 359/1.5, 237/1.5)

                        // Add more buildings for the 'home' page as needed
                    ];
        case 'interior':
            return [
                new Building('building3', 200, 180, 160, 240), //gas
                new Building('building4', 400, 180, 300, 400), //bar
                new Building('building6', 1000, 500, 600, 1000), //casino
                new Building('building5', 1300, 180, 300, 200), //pot shop
                new Building('toll_1b') //toll 1_b
            ];
            case 'interior_2':
                return [
                    new Building('casino_right', 0, 500, 600, 1000), //casino
                    new Building('pot_right', 0, 180, 300, 200), //casino

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
