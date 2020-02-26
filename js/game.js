// define variables
var game;
var player;
var platforms;
var badges;
var items;
var cursors;
var jumpButton;
var text;
var winningMessage;
var lostMessage;
var won = false;
var currentScore = 0
var winningScore = 100;

// add collectable items to the game
function addItems() {
  items = game.add.physicsGroup();
  // Coin
  createItem(60, 40, 'coin');
  createItem(190, 40, 'coin');
  createItem(430, 40, 'coin');
  createItem(490, 40, 'coin');
  createItem(550, 40, 'coin');
  createItem(760, 80, 'coin');
  createItem(760, 140, 'coin');
  createItem(760, 320, 'coin');
  createItem(525, 210, 'coin');
  createItem(20, 170, 'coin');
  createItem(185, 335, 'coin');
  createItem(55, 335, 'coin');
  createItem(575, 405, 'coin');
  createItem(125, 485, 'coin');
  createItem(200, 485, 'coin');
  createItem(275, 485, 'coin');
  createItem(375, 300, 'coin');
  createItem(375, 350, 'coin');
  createItem(375, 400, 'coin');
  createItem(750, 490, 'coin');

  // Poison
  createItem(120, 340, 'poison');
  createItem(0, 390, 'poison');
  createItem(335, 350, 'poison');
  createItem(340, 570, 'poison');
  createItem(400, 570, 'poison');
  createItem(460, 570, 'poison');
  createItem(520, 570, 'poison');
  createItem(580, 570, 'poison');
  createItem(640, 570, 'poison');
  createItem(690, 570, 'poison');
  createItem(760, 415, 'poison');
}

// add platforms to the game
function addPlatforms() {
  platforms = game.add.physicsGroup();
  // logo
  platforms.create(745, 0, 'logo');
  // platforms
  platforms.create(70, 117, 'platform');
  platforms.create(440, 100, 'platform');
  platforms.create(150, 210, 'platform');
  platforms.create(755, 200, 'platform');
  platforms.create(30, 400, 'platform');
  platforms.create(495, 470, 'platform');
  platforms.create(755, 380, 'platform');
  platforms.create(120, 550, 'platform');
  platforms.create(450, 286, 'platform');
  platforms.create(750, 560, 'platform');
  platforms.setAll('body.immovable', true);
}

// create a single animated item and add to screen
function createItem(left, top, image) {
  var item = items.create(left, top, image);
  item.animations.add('spin');
  item.animations.play('spin', 10, true);
}

// when the player collects an item on the screen
function itemHandler(player, item) {
  item.kill();
  if(item.key === 'coin') {
    currentScore = currentScore + 5;
    if(currentScore === winningScore) {
      won = true;
    }
  } else if(item.key === 'poison'){
    alert("Oh Poison!!! Try Again:)");
    location.reload();
  }
}

// setup game when the web page loads
window.onload = function () {
  game = new Phaser.Game(800, 620, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
  
  // before the game begins
  function preload() {
    game.stage.backgroundColor = '#cfcfcf';
    
    //Load images
    game.load.image('platform', 'images/platform_1.png');
    game.load.image('platform2', 'images/platform_2.png');
    game.load.image('logo', 'images/logo.png');
    
    //Load spritesheets
    game.load.spritesheet('player', 'images/chalkers.png', 48, 62);
    game.load.spritesheet('coin', 'images/coin.png', 36, 44);
    game.load.spritesheet('badge', 'images/badge.png', 42, 54);
    game.load.spritesheet('poison', 'images/poison.png', 32, 32);
  }

  // initial game set up
  function create() {
    player = game.add.sprite(50, 600, 'player');
    player.animations.add('walk');
    player.anchor.setTo(0.5, 1);
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.body.gravity.y = 850;

    addItems();
    addPlatforms();

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    text = game.add.text(12, 7, "Score: " + currentScore, { font: "normal 22px Tahoma", fill: "232323" });
    winningMessage = game.add.text(game.world.centerX, 205, "", { font: "bold 35px Tahoma", fill: "green" });
    winningMessage.anchor.setTo(0.5, 1);
    lostMessage = game.add.text(game.world.centerX, 205, "", { font: "normal 30px Tahoma", fill: "tomato" });
    lostMessage.anchor.setTo(0.5, 1);
  }

  // while the game is running
  function update() {
    text.text = "SCORE: " + currentScore;
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.overlap(player, items, itemHandler);
    player.body.velocity.x = 0;

    // is the left cursor key presssed?
    if (cursors.left.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.x = -300;
      player.scale.x = - 1;
    }
    // is the right cursor key pressed?
    else if (cursors.right.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.x = 300;
      player.scale.x = 1;
    }
    // player doesn't move
    else {
      player.animations.stop();
    }
    
    if (jumpButton.isDown && (player.body.onFloor() || player.body.touching.down)) {
      player.body.velocity.y = -400;
    }
    // when the player winw the game
    if (won) {
      winningMessage.text = "YOU WIN!!!";
      $('#startConfetti').trigger('click');
    }
  }

  function render() {

  }

};