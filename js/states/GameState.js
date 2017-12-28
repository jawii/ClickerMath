var ClickerMath = ClickerMath || {};
 

ClickerMath.GameState = {

  //initiate game settings
  init: function() {

    this.totalX = 0;
    this.Xnow = 0;

    this.clickGain = 1;
    this.xGainPerSecond = 0;

    this.easyTaskPrice = 50;
    this.easyTaskReward = 100;
    this.easyTasksSolved = 0;

    this.studentPrice = 20;
    this.studentGain = 1;
    this.studentPriceGrow = 20;




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

    console.log("Store - section opened");
    var buyTaskTextStyle = {
      font: "30px Bungee",
      fill: "black"
    };
    this.storeTextGroup = this.game.add.group();

    this.buyTaskText = this.game.add.text(1040, 110, "Buy Equations", buyTaskTextStyle);
    this.buyTaskText.anchor.setTo(0.5);
    this.storeTextGroup.add(this.buyTaskText);

    //buttons for tasks
    this.storeButtons = this.game.add.group();

    var eqBtnData = {
      buttonTop: 140,
      buttonHeight: 80,
      easyButtonColor: 0x93C47D,
      normalButtonColor:0x769D64,
      hardButtonColor:0x5E7E50,
      asianButtonColor:0x4B6540
    }
    //taskbuttons
    this.easyTaskButton = this.add.graphics(0, 0);                     
    this.easyTaskButton.lineStyle(2, 0x000000, 1);            
    this.easyTaskButton.beginFill(eqBtnData.easyButtonColor, 1);            
    this.easyTaskButton.drawRect(800, eqBtnData.buttonTop, 480, eqBtnData.buttonHeight);                      
    this.easyTaskButton.endFill(); 
    this.easyTaskButton.alpha = 1;
    this.easyTaskButton.inputEnabled = true;           
    this.easyTaskButton.events.onInputDown.add(this.taskButtonHandler, this);
    this.easyTaskButton.events.onInputOver.add(function(){
      this.easyTaskButton.tint = 0.5 * 0xffffff;
    }, this)
    this.easyTaskButton.events.onInputOut.add(function(){
      this.easyTaskButton.tint = 0xffffff;
    }, this)
    this.storeButtons.add(this.easyTaskButton);


    this.normalTaskButton = this.add.graphics(0, 0);                     
    this.normalTaskButton.lineStyle(2, 0x000000, 1);            
    this.normalTaskButton.beginFill(eqBtnData.normalButtonColor, 0.8);            
    this.normalTaskButton.drawRect(800, eqBtnData.buttonTop + eqBtnData.buttonHeight, 480, eqBtnData.buttonHeight);                      
    this.normalTaskButton.endFill(); 
    this.normalTaskButton.alpha = 1;
    this.normalTaskButton.inputEnabled = true;           
    this.normalTaskButton.events.onInputDown.add(this.taskButtonHandler, this);
    this.normalTaskButton.events.onInputOver.add(function(){
      this.normalTaskButton.tint = 0.5 * 0xffffff;
    }, this)
    this.normalTaskButton.events.onInputOut.add(function(){
      this.normalTaskButton.tint = 0xffffff;
    }, this)
    this.storeButtons.add(this.normalTaskButton);

    this.hardTaskButton = this.add.graphics(0, 0);                     
    this.hardTaskButton.lineStyle(2, 0x000000, 1);            
    this.hardTaskButton.beginFill(eqBtnData.hardButtonColor, 0.8);            
    this.hardTaskButton.drawRect(800, eqBtnData.buttonTop + eqBtnData.buttonHeight * 2, 480, eqBtnData.buttonHeight);                      
    this.hardTaskButton.endFill(); 
    this.hardTaskButton.alpha = 1;
    this.hardTaskButton.inputEnabled = true;           
    this.hardTaskButton.events.onInputDown.add(this.taskButtonHandler, this);
    this.hardTaskButton.events.onInputOver.add(function(){
      this.hardTaskButton.tint = 0.5 * 0xffffff;
    }, this)
    this.hardTaskButton.events.onInputOut.add(function(){
      this.hardTaskButton.tint = 0xffffff;
    }, this)
    this.storeButtons.add(this.hardTaskButton);

    this.asianTaskButton = this.add.graphics(0, 0);                     
    this.asianTaskButton.lineStyle(2, 0x000000, 1);            
    this.asianTaskButton.beginFill(eqBtnData.asianButtonColor, 0.8);            
    this.asianTaskButton.drawRect(800, eqBtnData.buttonTop + eqBtnData.buttonHeight * 3, 480, eqBtnData.buttonHeight);                      
    this.asianTaskButton.endFill(); 
    this.asianTaskButton.alpha = 1;
    this.asianTaskButton.inputEnabled = true;           
    this.asianTaskButton.events.onInputDown.add(this.taskButtonHandler, this);
    this.asianTaskButton.events.onInputOver.add(function(){
      this.asianTaskButton.tint = 0.5 * 0xffffff;
    }, this)
    this.asianTaskButton.events.onInputOut.add(function(){
      this.asianTaskButton.tint = 0xffffff;
    }, this)
    this.storeButtons.add(this.asianTaskButton);
    

    //HELPER BUTTONS

    var hlBtnData = {
      buttonTop: 530,
      buttonHeight: 70
    }

    this.profHelperButton = this.add.graphics(0, 0);                     
    this.profHelperButton.lineStyle(2, 0x000000, 1);            
    this.profHelperButton.beginFill(0x45818E, 0.8);            
    this.profHelperButton.drawRect(800, hlBtnData.buttonTop + hlBtnData.buttonHeight * 0, 480, hlBtnData.buttonHeight);                      
    this.profHelperButton.endFill(); 
    this.profHelperButton.alpha = 1;
    this.profHelperButton.inputEnabled = true;           
    this.profHelperButton.events.onInputDown.add(this.helperButtonHandler, this);
    this.profHelperButton.events.onInputOver.add(function(){
      this.profHelperButton.tint = 0.5 * 0xffffff;
    }, this)
    this.profHelperButton.events.onInputOut.add(function(){
      this.profHelperButton.tint = 0xffffff;
    }, this)
    this.storeButtons.add(this.profHelperButton);    

    this.studentHelperButton = this.add.graphics(0, 0);                     
    this.studentHelperButton.lineStyle(2, 0x000000, 1);            
    this.studentHelperButton.beginFill(0x376772, 0.8);            
    this.studentHelperButton.drawRect(800, hlBtnData.buttonTop + hlBtnData.buttonHeight * 1, 480, hlBtnData.buttonHeight);                      
    this.studentHelperButton.endFill(); 
    this.studentHelperButton.alpha = 1;
    this.studentHelperButton.inputEnabled = true;           
    this.studentHelperButton.events.onInputDown.add(this.helperButtonHandler, this);
    this.studentHelperButton.events.onInputOver.add(function(){
      this.studentHelperButton.tint = 0.5 * 0xffffff;
    }, this)
    this.studentHelperButton.events.onInputOut.add(function(){
      this.studentHelperButton.tint = 0xffffff;
    }, this)
    this.storeButtons.add(this.studentHelperButton);

    this.xFarmHelperButton = this.add.graphics(0, 0);                     
    this.xFarmHelperButton.lineStyle(2, 0x000000, 1);            
    this.xFarmHelperButton.beginFill(0x2C525B, 0.8);            
    this.xFarmHelperButton.drawRect(800, hlBtnData.buttonTop + hlBtnData.buttonHeight * 2, 480, hlBtnData.buttonHeight);                      
    this.xFarmHelperButton.endFill(); 
    this.xFarmHelperButton.alpha = 1;
    this.xFarmHelperButton.inputEnabled = true;           
    this.xFarmHelperButton.events.onInputDown.add(this.helperButtonHandler, this);
    this.xFarmHelperButton.events.onInputOver.add(function(){
      this.xFarmHelperButton.tint = 0.5 * 0xffffff;
    }, this)
    this.xFarmHelperButton.events.onInputOut.add(function(){
      this.xFarmHelperButton.tint = 0xffffff;
    }, this)
    this.storeButtons.add(this.xFarmHelperButton);

    var taskTextStyle = {
      font: "20px Bungee",
      fill: "black"
    };
    var priceTextStyle = {
      font: "20px Bungee",
      fill: "yellow"
    };
    this.easyTaskText = this.game.add.text(800 + 60, 175, "Easy", taskTextStyle);
    this.easyTaskText.anchor.setTo(0.5);
    this.storeTextGroup.add(this.easyTaskText);

    this.normalTaskText = this.game.add.text(800 + 60, 250, "Normal", taskTextStyle);
    this.normalTaskText.anchor.setTo(0.5);
    this.storeTextGroup.add(this.normalTaskText);

    this.hardTaskText = this.game.add.text(800 + 60, 325, "Hard", taskTextStyle);
    this.hardTaskText.anchor.setTo(0.5);
    this.storeTextGroup.add(this.hardTaskText);

    this.asianTaskText = this.game.add.text(800 + 60, 400, "Asian", taskTextStyle);
    this.asianTaskText.anchor.setTo(0.5);
    this.storeTextGroup.add(this.asianTaskText);




    this.buyHelpersText = this.game.add.text(1040, 495, "Buy Helpers", buyTaskTextStyle);
    this.buyHelpersText.anchor.setTo(0.5);
    this.storeTextGroup.add(this.buyHelpersText);

    this.buyStudentText = this.game.add.text(800 + 175, 550, "Student", taskTextStyle);
    this.buyStudentText.anchor.setTo(0.5);
    this.storeTextGroup.add(this.buyStudentText);
    //price
    this.studentPrice = this.game.add.text(940, 580, this.studentPrice, priceTextStyle);
    this.studentPrice.anchor.setTo(0.5);
    this.storeTextGroup.add(this.studentPrice);
    

    this.buyProfessorsText = this.game.add.text(800 + 185, 625, "Professor", taskTextStyle);
    this.buyProfessorsText.anchor.setTo(0.5);
    this.storeTextGroup.add(this.buyProfessorsText);

    this.buyXfarmText = this.game.add.text(800 + 170, 690, "X - farm", taskTextStyle);
    this.buyXfarmText.anchor.setTo(0.5);
    this.storeTextGroup.add(this.buyXfarmText);

    this.game.world.bringToTop(this.storeTextGroup);

  },
  openUpgrades: function(){
    //clear previous opener
    this.storeTextGroup.kill(true);
    this.storeButtons.kill(true);

    this.openStoreButton.alpha = 0.5;
    this.openUpgradeButton.alpha = 1;

    console.log("Upgrade section opened");
  },
  taskButtonHandler: function(){
    console.log("TaskButton presssed");
  },

  helperButtonHandler: function(){
    console.log("HelperButton pressed");
  }
};