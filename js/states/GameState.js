var ClickerMath = ClickerMath || {};
 

ClickerMath.GameState = {

  //initiate game settings
  init: function() {

    this.totalX = 0;
    this.Xnow = 0;

    this.clickGain = 0;
    this.xGainPerSecond = 5203;



    this.guiLineData = {
      lineWidth: 2,
      lineColor: 0x000000,
      lineAlpha: 0.8
    };

    this.xAmountStyle = {
      font: "24px Bungee",
      fill: "black"
    };

    this.xIconClickPointStyle = {
      font: "20px Bungee",
      fill: "green"
    }




  },
  //load the game assets before the game starts
  preload: function() {

    //graphics
    this.graphics = this.game.add.graphics(0.0);
   

    
  },
  //executed after everything is loaded
  create: function() {
    this.game.stage.backgroundColor = "#bababa";

    // //create background
    // var myBitmap = this.game.add.bitmapData(1280, 800);
    // var grd = myBitmap.context.createLinearGradient(0,400, 800, 400);
    // grd.addColorStop(0,"gray");
    // grd.addColorStop(1,"blue");
    // myBitmap.context.fillStyle = grd;
    // myBitmap.context.fillRect(0, 0, 1280, 800);
    // this.backgroundSprite = this.game.add.sprite(0, 0, myBitmap);
    // this.backgroundSprite.alpha = 0.5;
    // this.game.world.sendToBack(this.backgroundSprite);

    //x number now
    this.xAmountText = this.game.add.text(400, 40, this.Xnow, this.xAmountStyle);
    this.xAmountText.anchor.setTo(0.5);

    this.xAmountIcon = this.game.add.sprite(this.xAmountText.right + 30, this.xAmountText.y, "xIcon");
    this.xAmountIcon.anchor.setTo(0.5);
    this.xAmountIcon.scale.setTo(0.5);


    
    //clickable x
    this.X = this.game.add.sprite(400, 400, "X");
    this.X.anchor.setTo(0.5);
    this.X.scale.setTo(0.5);
    this.X.inputEnabled = true;
    this.X.input.pixelPerfectClick = true;

    //create event if x clickable
    this.X.events.onInputUp.add(this.xIconClicked, this);

    //create timer for per second update
    this.game.time.events.loop(Phaser.Timer.SECOND/10, this.updateXPerSecond, this);

    this.loadGuiLines();

    this.loadStoreAndUpgradeArea();

    //open store at start
    this.openStore();


  },
  update: function() {

    //update current x and total x
    this.xAmountText.text = Math.floor(this.Xnow);
    this.xAmountIcon.x = this.xAmountText.right + 30;

    
  },
  render: function(){
    //this.game.debug.spriteInfo(this.playerTwoTurret, 300, 32);
    //this.game.debug.spriteCoords(this.playerTwoTurret, 300, 150);
    //this.game.debug.spriteBounds(this.playerTwoTurret);
    //this.game.debug.text('Anchor X: ' + this.playerTwoTurret.anchor.x.toFixed(1) + ' Y: ' + this.playerTwoTurret.anchor.y.toFixed(1), 32, 32);
    this.game.debug.text('Total X: ' + Math.floor(this.totalX), 32, 32, {fill: "red"});
    this.game.debug.text('Gain Per Second: ' + this.xGainPerSecond, 32, 64, {fill: "red"});
    //var point = new Phaser.Point(x, y);
    //this.game.debug.geom(point, 'rgb(0,255,0)');    
    //this.game.debug.text('Anchor X: ' + this.playerTwoTurret.anchor.x.toFixed(1) + ' Y: ' + this.playerTwoTurret.anchor.y.toFixed(1), 32, 32);
    this.game.debug.text("Time: " + this.game.time.events.duration.toFixed(0), 32, 90,{fill: "red"});
  },
  updateXPerSecond: function(){

    this.totalX += this.xGainPerSecond/10;
    this.Xnow += this.xGainPerSecond/10;
  },

  xIconClicked: function(sprite, pointer){
    //console.log(arguments);

    //update xamounts
    this.totalX += this.clickGain;
    this.Xnow += this.clickGain;

    //update text
    this.xAmountText.text = Math.floor(this.Xnow);
    this.xAmountIcon.x = this.xAmountText.right + 30

    //tween x
    var tween = this.game.add.tween(this.X.scale).to({x: 0.49, y: 0.49}, 50, null, true, 0, 0, false);
    tween.onComplete.add(function(){
      this.X.scale.setTo(0.5);
      }, this);

    //tween score to pointer
    var xPoint = pointer.x;
    var yPoint = pointer.y;
    var scoreText = this.game.add.text(xPoint, yPoint, "+ " + this.clickGain, this.xIconClickPointStyle);
    scoreText.anchor.setTo(0.5);
    var tween2 = this.game.add.tween(scoreText).to({alpha: 0},500, null, true);

    //tween score to somewhere
    var randDirectionX = this.game.rnd.integerInRange(-10, 10);
    var randDirectionY = this.game.rnd.integerInRange(-10, 10);  
    var tween3 = this.game.add.tween(scoreText).to({x: scoreText.x + randDirectionX, y: scoreText.y + randDirectionY }, 500, Phaser.Easing.Circular.Out, true);
    tween3.onComplete.add(function(){
        scoreText.destroy();
      }, this);
  },

  loadGuiLines: function(){
    //gui lines
    this.graphics.beginFill();
    this.graphics.lineStyle(this.guiLineData.lineWidth, this.guiLineData.lineColor, this.guiLineData.lineAlpha);

    //divide the game area and store and upgrade
    this.graphics.moveTo(800,0);
    this.graphics.lineTo(800, 800);
    //store line vertical line
    this.graphics.moveTo(1040,0);
    this.graphics.lineTo(1040, 80);
    //store horizontal line
    this.graphics.moveTo(800, 80);
    this.graphics.lineTo(1280, 80);

    //outherright line
    this.graphics.moveTo(1280, 0);
    this.graphics.lineTo(1280, 800);

    //bottomline
    this.graphics.moveTo(1280, 800);
    this.graphics.lineTo(0, 800);

    //left line
    this.graphics.moveTo(0, 800);
    this.graphics.lineTo(0, 0);

    //upline
    this.graphics.moveTo(0, 0);
    this.graphics.lineTo(1280, 0);


    this.graphics.endFill();
  },

  loadStoreAndUpgradeArea: function(){
    var storeHeadLineStyle = {
      font: "35px Bungee",
      fill: "black"
    }

    
    //STORE
    //create as graphics
    this.openStoreButton = this.add.graphics(0, 0);            
    // draw a rectangle            
    this.openStoreButton.lineStyle(2, 0x000000, 1);            
    this.openStoreButton.beginFill(0x00FF00, 0.8);            
    this.openStoreButton.drawRect(800, 0, 240, 80);                      
    this.openStoreButton.endFill();   
    //store Text
    this.storeText = this.game.add.text(920, 40, "Store", storeHeadLineStyle);
    this.storeText.anchor.setTo(0.5);     
    this.storeText.alpha = 0.9;    
    //input        
    this.openStoreButton.inputEnabled = true;           
    this.openStoreButton.events.onInputDown.add(this.openStore, this);

    //STORE
    //create as graphics
    this.openUpgradeButton = this.add.graphics(0, 0);            
    // draw a rectangle            
    this.openUpgradeButton.lineStyle(2, 0x000000, 1);            
    this.openUpgradeButton.beginFill(0x00FF00, 0.8);            
    this.openUpgradeButton.drawRect(1040, 0, 240, 80);                      
    this.openUpgradeButton.endFill();   
    //upgradetext Text
    this.UpgradeText = this.game.add.text(1160, 40, "Upgrades", storeHeadLineStyle);
    this.UpgradeText.anchor.setTo(0.5);
    this.UpgradeText.alpha = 0.9;           
    //input        
    this.openUpgradeButton.inputEnabled = true;           
    this.openUpgradeButton.events.onInputDown.add(this.openUpgrades, this);
  },

  openStore: function(){
    //clear previous opener
    this.openUpgradeButton.alpha = 0.5;
    this.openStoreButton.alpha = 1;

    console.log("Store - section ppened");

    var buyTaskTextStyle = {
      font: "20px Bungee",
      fill: "black"
    }

    this.buyTaskText = this.game.add.text(1040, 110, "Buy Tasks", buyTaskTextStyle);
    this.buyTaskText.anchor.setTo(0.5);4

  },
  openUpgrades: function(){
    //clear previous opener
    this.openStoreButton.alpha = 0.5;
    this.openUpgradeButton.alpha = 1;


    console.log("Upgrade section opened")
  }
};