var ClickerMath = ClickerMath || {};
 

ClickerMath.GameState = {

  //initiate game settings
  init: function() {

    this.totalX = 0;

    this.totalXData = {
      x: 400,
      y: 100,
      style: {
        font: "40px Arial",
        fill: "black"
      }
    };




  },
  //load the game assets before the game starts
  preload: function() {

    //background
   

    
  },
  //executed after everything is loaded
  create: function() {
    this.game.stage.backgroundColor = "#fff";

    this.totalXtext = this.game.add.text(this.totalXData.x, this.totalXData.y, "X : s", this.totalXData.style);
    this.totalXtext.anchor.setTo(0.5);
    
   


  },
  update: function() {
    
  },
  render: function(){
    //this.game.debug.spriteInfo(this.playerTwoTurret, 300, 32);
    //this.game.debug.spriteCoords(this.playerTwoTurret, 300, 150);
    //this.game.debug.spriteBounds(this.playerTwoTurret);
    //this.game.debug.text('Anchor X: ' + this.playerTwoTurret.anchor.x.toFixed(1) + ' Y: ' + this.playerTwoTurret.anchor.y.toFixed(1), 32, 32);
    //var point = new Phaser.Point(x, y);
    //this.game.debug.geom(point, 'rgb(0,255,0)');    
    //this.game.debug.text('Anchor X: ' + this.playerTwoTurret.anchor.x.toFixed(1) + ' Y: ' + this.playerTwoTurret.anchor.y.toFixed(1), 32, 32);
    //this.weaponOne.debug()
  }
};