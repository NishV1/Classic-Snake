// Get the canvas element and its context
let canvas = document.getElementById('game');
let context = canvas.getContext('2d');

// Define the size of each square (box) on the canvas
let box = 32;
let score = 0;
let timer = 0;

// Initialize the snake as an array of objects with x and y coordinates
let snake = [];
snake[0] = { x: 8 * box, y: 8 * box };

// Set the initial direction of the snake
let direction = "right";

setInterval(function(){
    timer++;
},1000);

// Create the food object with random x and y coordinates
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

// Create the obstacle object with random x and y coordinates
let obstacle = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function drawTimer(){
    context.fillStyle = "white";
    context.font = "16px Arial";
    context.fillText("Time: " + timer, box, 2 * box);
}

// Function to draw the game background
function createBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

// Function to draw the snake
function createSnake() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

// Function to draw the food
function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

// Function to draw the obstacle
function drawObstacle() {
    context.fillStyle = "black";
    context.fillRect(obstacle.x, obstacle.y, box, box);
}

// Function to draw the score
function drawScore() {
    context.fillStyle = "white";
    context.font = "16px Arial";
    context.fillText("Score: " + score, box, box);
}

// Event listener for arrow keys to change the direction of the snake
document.addEventListener('keydown', update);

function update(event) {
    if (event.keyCode == 37 && direction != "right") direction = "left";
    if (event.keyCode == 38 && direction != "down") direction = "up";
    if (event.keyCode == 39 && direction != "left") direction = "right";
    if (event.keyCode == 40 && direction != "up") direction = "down";
}

// Function to start and update the game
// Function to start and update the game
function startGame() {
    // If the snake hits the border, it appears on the opposite side
    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;

    // Check if the snake has hit itself or the obstacle
    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y || 
            snake[0].x == obstacle.x && snake[0].y == obstacle.y) {
            clearInterval(game);
            alert('Game Over :(');
            // Reset the game
            snake = [{x:8 * box, y: 8 * box}];
            direction = "right";
        }
    }

    // Draw the game elements
    createBG();
    createSnake();
    drawFood();
    drawObstacle();
    drawScore();
    drawTimer();

    // Get the current head position of the snake
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Determine the new head position based on the direction
    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    // Check if the snake has eaten the food
    if (snakeX == food.x && snakeY == food.y) {
        // If yes, increment the score and generate a new food position
        score++;
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    } else {
        // If not, remove the tail
        snake.pop();
    }

    // Create the new head and add it to the beginning of the snake array
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

// Start and update the game every 100ms
let game = setInterval(startGame, 100);