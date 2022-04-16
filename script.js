// Handles selections made by the user on the DOM
const gameSelections = (() => {
    const human = document.querySelector('.human-human');
    const computer = document.querySelector('.human-ai');

    human.addEventListener('click', humanSelection);
    computer.addEventListener('click', computerSelection);

    function humanSelection() {
        humanGameBoard();
        human.classList.add('selected');
        computer.classList.remove('selected');
    }

    function computerSelection() {
        computerGameBoard();
        computer.classList.add('selected');
        human.classList.remove('selected');
    }
})();

// Handles game winning/drawing conditions
const gameLogic = (() => {
    const winningCombos = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];

})();

// Handles the game grid with a human vs human selection
const humanGameBoard = () => {
    const cellBlocks = document.querySelectorAll('.game-cell');
    const gameGrid = document.querySelector('#game-grid');

    let circleTurn;
    const circleClass = 'circle';
    const xClass = 'x';
    
    gameGrid.classList.add(xClass);

    cellBlocks.forEach(cell => {
        cell.addEventListener('click', handleClick, { once: true})
    });

    function handleClick(e) {
        const cell = e.target;
        currentClass = circleTurn ? circleClass : xClass;
        // place mark
        placeMarker(cell, currentClass);
        // check for win

        // check for draw

        // switch turns
        switchTurns();
        boardHoverClass();
        console.log(currentClass);
        return currentClass;
    };

    function placeMarker(cell, currentClass) {
        cell.classList.add(currentClass);
    };

    function switchTurns() {
        circleTurn = !circleTurn;
    };

    function boardHoverClass() {
        gameGrid.classList.remove(xClass);
        gameGrid.classList.remove(circleClass);
        if(circleTurn) {
            gameGrid.classList.add(circleClass);
        } else {
            gameGrid.classList.add(xClass);
        };
    }

};

const computerGameBoard = () => {

};