// Global properties
// const MyApp = {
//     gridListener: function() {
//         const circleClass = 'circle';
//         const xClass = 'x';
//         const cellBlocks = document.querySelectorAll('.game-cell');
//         let handleClickPub = Object.create(humanGameBoard());

//         cellBlocks.forEach(cell => {
//             cell.classList.remove(xClass);
//             cell.classList.remove(circleClass);
//             cell.removeEventListener('click', handleClickPub.handleClick);
//             cell.addEventListener('click', handleClickPub.handleClick, { once: true});
//         });
//     },

//     removeGridListener: function() {
//         const circleClass = 'circle';
//         const xClass = 'x';
//         const cellBlocks = document.querySelectorAll('.game-cell');
//         let handleClickPub = Object.create(humanGameBoard());

//         cellBlocks.forEach(cell => {
//             cell.classList.remove(xClass);
//             cell.classList.remove(circleClass);
//             cell.removeEventListener('click', handleClickPub.handleClick);
//         });
//     }
// }

// Handles selections made by the user on the DOM
const gameSelections = (() => {
    const human = document.querySelector('.human-human');
    const computer = document.querySelector('.human-ai');
    const resetBtn = document.querySelector('.reset-game');

    resetBtn.addEventListener('click', () => window.location.reload());

    human.addEventListener('click', humanSelection);
    computer.addEventListener('click', computerSelection);

    function humanSelection() {
        human.classList.add('selected');
        computer.classList.remove('selected');
        selectedGameMode();
        resetBtn.style.display = 'block'
    }

    function computerSelection() {
        computer.classList.add('selected');
        human.classList.remove('selected');
        selectedGameMode();
    }
})();

const selectedGameMode = () => {
    const humanMode = document.querySelector('.human-human');
    const computerMode = document.querySelector('.human-ai');

    if(humanMode.classList.contains('selected')) { 
        humanGameBoard(); 
    }
    else if(computerMode.classList.contains('selected')) {
        computerGameBoard();
    }
}

// Handles game winning/drawing conditions
const gameLogic = (() => {
    const winningCombos = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];

    const cellBlocks = document.querySelectorAll('.game-cell');

    function checkWin(currentClass) {
        return winningCombos.some(combination => {
            return combination.every(index => {
                return cellBlocks[index].classList.contains(currentClass)
            })
        })
    }

    function isDraw() {
        return [...cellBlocks].every(cell => {
            return cell.classList.contains('x') || 
            cell.classList.contains('circle');
        })
    }

    return {
        checkWin,
        isDraw
    }

})();

// Handles the game grid with a human vs human selection
const humanGameBoard = () => {
    const cellBlocks = document.querySelectorAll('.game-cell');
    const gameGrid = document.querySelector('#game-grid');
    const roundMessage = document.querySelector('.round-update');
    const xScore = document.querySelector('.x-tally');
    const oScore = document.querySelector('.o-tally');

    let circleTurn;
    const circleClass = 'circle';
    const xClass = 'x';
    let currentClass;
    gameGrid.classList.add(xClass);

    cellBlocks.forEach(cell => {
        cell.classList.remove(xClass);
        cell.classList.remove(circleClass);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true});
    });

    function handleClick(e) {
        const cell = e.target;
        currentClass = circleTurn ? circleClass : xClass;
        // place mark
        placeMarker(cell, currentClass);
        // check for win 
        if(gameLogic.checkWin(currentClass)) {
            roundOver(false);
        } else if(gameLogic.isDraw()) {
            roundOver(true);
            console.log('tie');
        } else {
        switchTurns();
        boardHoverClass();
        }
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
    
    function roundOver(draw) {
        if(draw) {
            roundMessage.textContent = 'Draw!';
            humanGameBoard();

        } else {
            roundMessage.textContent = `${circleTurn ? 'Circle\'s win this round!' : 'X\'s win this round!'}`;
            circleTurn ? oScore.textContent++ : xScore.textContent++;
            humanGameBoard();
        }
    }

};


const computerGameBoard = () => {
    
};