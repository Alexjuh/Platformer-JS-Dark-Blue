var game = new Phaser.Game(700,700,Phaser.AUTO, '',{
});

var player;
var walls;
var cursors;
var stars;
var diamonds;
var enemies;
var takeStar;
var restart;

var score = 0;
var scoreText;

var mainState = {

  preload:function(){
    game.load.image('player','assets/player.png');
    game.load.image('wall','assets/wall.png');
    game.load.image('star','assets/star.png');
    game.load.image('enemy','assets/enemy.png');
    game.load.image('diamond','assets/diamond.png');
  },

  create:function(){
    game.stage.backgroundColor = '#3598db';
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.enableBody = true;

    player = game.add.sprite(70,630,'player');
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 600;
    player.body.collideWorldBounds = true;

    walls = game.add.group();
    stars = game.add.group();
    enemies = game.add.group();
    diamonds = game.add.group();

    var level = [
      'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      '!             !                x',
      '!        o   k                 x',
      '!                 o            x',
      '!             !                x',
      '!   k   xxxxx  x               x',
      'x                 x         xx x',
      'x!!!!!!!!!!!   !!!!!!!!!!!!!!! x',
      'x                              x',
      'xxxxxxxxxxxx  xxxxxxxxxxxxxxxxxx',
      'x                              x',
      'x  k                           x',
      'x          xxxxxxxxxxxxxxxxxx  x',
      'x!!!               x!          x',
      'x       x        o x! xxxxxxxxxx',
      'x                  x!          x',
      'xxxxxxxxx    !!!!  xxxxxxxxx  ox',
      'x k          !  !  xxxxxxxxxx!xx',
      'x           x!  !            ! x',
      'x        x   !o !              x',
      'x!!!x   o    !  !  o           x',
      'x                              x',
      'x  xxxxxxxxxxxxxxxxxxxx        x',
      'x                              x',
      'x     k                      xxx',
      'x                 o            x',
      'x  x!!!!!x!!x!!!xxxx!          x',
      'x              x         xxo   x',
      'x            o x               x',
      'xxxxxxxxxxxxxxxx o  xxxxxxxx!!!x',
      'x                              x',
      'xxxxxxxxxxxxxxxxx!!!!xxxxxxxxxxx',
    ];

    for (var i = 0; i < level.length; i++){
      for (var j = 0; j < level[i].length; j++){
        if(level[i][j] == 'x'){
          var wall = game.add.sprite(30+20*j,30+20*i, 'wall');
          walls.add(wall);
          wall.body.immovable = true;
        }
        else if(level[i][j]=='o'){
          var star = game.add.sprite(30+20*j,30+20*i,'star');
          stars.add(star);
        }
        else if(level[i][j]=='k'){
          var diamond = game.add.sprite(30+20*j,30+20*i,'diamond');
          diamonds.add(diamond);
        }
        else if(level[i][j]=='!'){
          var enemy = game.add.sprite(30+20*j,30+20*i,'enemy');
          enemies.add(enemy);
        }
      }
    }

    scoreText = game.add.text(16,16,'Score: 0',{
      fontsize: '32px', fill: '#FFF'
    });

    cursors = game.input.keyboard.createCursorKeys();
  },

  update:function(){
    var hitWall = game.physics.arcade.collide(player,walls);

    if(cursors.left.isDown){
      player.body.velocity.x = -200;
    }else if(cursors.right.isDown){
      player.body.velocity.x = 200;
    }else{
      player.body.velocity.x = 0;
    }

    if (cursors.up.isDown && player.body.touching.down && hitWall){
      player.body.velocity.y = -280;}

    game.physics.arcade.collide(player,walls);
    game.physics.arcade.overlap(player, stars, takeStar, null, this);
    game.physics.arcade.overlap(player, diamonds, takeDiamond, null, this);
    game.physics.arcade.overlap(player, enemies, restart, null, this);

    function takeStar(player,star){
      star.kill();
      score += 1;
      scoreText.text = 'Score: ' + score;
    }

    function takeDiamond(player,diamond){
      diamond.kill();
      score += 4;
      scoreText.text = 'Score: ' + score;
    }

    function restart(){
      game.state.start('main');
      score = 0;
    }
  }
};

game.state.add('main',mainState);
game.state.start('main');
