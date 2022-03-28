// game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI elements
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

// assign UI max and min 
minNum.textContent = min;
maxNum.textContent = max;

// play again event listener
game.addEventListener('mousedown', function(e) { // activating event handler 
    if(e.target.className === 'play-again') { // grapping the play again button
        window.location.reload(); // makes everything inside the wrapper div reload
    }
});


// listen for guess - function takes in a value as number with parse
guessBtn.addEventListener('click', function() {
    let guess = parseInt(guessInput.value);
    console.log(guess)

    // validate not blank and within 1-10
    if(isNaN(guess) || guess < min || guess > max) { // guees is equal to number or less than 1 or more than 10 
        setMessage(`Please enter a number between ${min} and ${max}`, '');
    }

    // check to see if it is the winning number
    if(guess === winningNum) {
        // game over - won
       gameOver(true, `${winningNum} is correct !!! YOU WIN!`);
    
    } else {
        // if its the wrong number
        guessesLeft -= 1;

        if(guessesLeft === 0) {
            // game over - lost
            gameOver(false, `GAME OVER, Try again! YOU CAN DO IT the correct number was 
            ${winningNum}`)
        } else {
            // game continues -answer wrong

            // make input border red to show a wrong answer
            guessInput.style.borderColor = 'red';

            //clear typed input
            guessInput.value = '';
            // telling user that this is not correct
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
        }
    }

});

// game over
function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';

     // disable input
     guessInput.disabled = true;
     // make input border green to show a win 
     guessInput.style.borderColor = color;
     // set text color
     message.style.color = color;
     // set winning message
     setMessage(msg);

     // play again ??
     guessBtn.value = 'Play Again';
     guessBtn.className += 'play-again';
 
}

// get winning number
function getRandomNum(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

// setting the message
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}
