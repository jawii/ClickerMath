var ClickerMath = ClickerMath || {};
 

ClickerMath.GameState = {

  //initiate game settings
  init: function() {

    this.totalX = 0;
    this.xNow = 0;

    this.clickGain = 1;
    this.xGainPerSecond = 0;

    this.easyTaskPrice = 50;
    this.easyTaskReward = 100;
    this.easyTasksSolved = 0;

    this.normalTaskPrice = 200;
    this.normalTaskReward = 1000;
    this.normalTasksSolved = 0;

    this.hardTaskPrice = 500;
    this.hardTaskReward = 2500;
    this.hardTasksSolved = 0;

    this.asianTaskPrice = 1000;
    this.asianTaskReward = 10000;
    this.asianTasksSolved = 0;

    this.studentPrice = 20;
    this.studentGain = 1;
    this.studentPriceGrow = 20;

    this.profPrice = 50;
    this.profGain = 5;
    this.profPriceGrow = 20;

    this.xFarmPrice = 400;
    this.xFarmGain = 10;
    this.xFarmPriceGrow = 20;




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
    this.xAmountText = this.game.add.text(400, 40, this.xNow, this.xAmountStyle);
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
    this.xAmountText.text = Math.floor(this.xNow);
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
    this.xNow += this.xGainPerSecond/10;
  },

  xIconClicked: function(sprite, pointer){
    //console.log(arguments);

    //update xamounts
    this.totalX += this.clickGain;
    this.xNow += this.clickGain;

    //update text
    this.xAmountText.text = Math.floor(this.xNow);
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
    this.easyTaskButton.data.price = this.easyTaskPrice;
    this.easyTaskButton.data.reward = this.easyTaskReward;
    this.easyTaskButton.data.solved = this.easyTasksSolved;

    this.createStoreButton(this.easyTaskButton, eqBtnData.easyButtonColor, eqBtnData.buttonTop, eqBtnData.buttonHeight, this.storeButtons, this.taskButtonHandler);
    this.normalTaskButton = this.add.graphics(0, 0); 
    this.normalTaskButton.data.price = this.normalTaskPrice;
    this.normalTaskButton.data.reward = this.normalTaskReward;
    this.normalTaskButton.data.solved = this.normalTasksSolved;
    this.createStoreButton(this.normalTaskButton, eqBtnData.normalButtonColor, eqBtnData.buttonTop + eqBtnData.buttonHeight * 1, eqBtnData.buttonHeight, this.storeButtons, this.taskButtonHandler);
    this.hardTaskButton = this.add.graphics(0, 0); 
    this.hardTaskButton.data.price = this.hardTaskPrice;
    this.hardTaskButton.data.reward = this.hardTaskReward;
    this.hardTaskButton.data.solved = this.hardTasksSolved;                    
    this.createStoreButton(this.hardTaskButton, eqBtnData.hardButtonColor, eqBtnData.buttonTop + eqBtnData.buttonHeight * 2, eqBtnData.buttonHeight, this.storeButtons, this.taskButtonHandler);          
    this.asianTaskButton = this.add.graphics(0, 0); 
    this.asianTaskButton.data.price = this.asianTaskPrice;
    this.asianTaskButton.data.reward = this.asianTaskReward;
    this.asianTaskButton.data.solved = this.asianTasksSolved;
    this.createStoreButton(this.asianTaskButton, eqBtnData.asianButtonColor, eqBtnData.buttonTop + eqBtnData.buttonHeight * 3, eqBtnData.buttonHeight, this.storeButtons, this.taskButtonHandler);


    //HELPER BUTTONS
    var hlBtnData = {
      buttonTop: 530,
      buttonHeight: 70
    };

    this.studentHelperButton = this.add.graphics(0, 0);   
    this.studentHelperButton.data.price = this.studentPrice;
    this.studentHelperButton.data.gain = this.studentGain;
    this.createStoreButton(this.studentHelperButton, 0xC2D5DA, hlBtnData.buttonTop + hlBtnData.buttonHeight * 0, hlBtnData.buttonHeight, this.storeButtons, this.helperButtonHandler);
    
    this.profHelperButton = this.add.graphics(0, 0); 
    this.profHelperButton.data.price = this.profPrice;
    this.profHelperButton.data.gain = this.profGain; 
    this.createStoreButton(this.profHelperButton, 0x88AEB7, hlBtnData.buttonTop + hlBtnData.buttonHeight * 1, hlBtnData.buttonHeight, this.storeButtons, this.helperButtonHandler);
    
    this.xFarmHelperButton = this.add.graphics(0, 0);    
    this.xFarmHelperButton.data.price = this.xFarmPrice;
    this.xFarmHelperButton.data.gain = this.xFarmGain;
    this.createStoreButton(this.xFarmHelperButton, 0x45818E, hlBtnData.buttonTop + hlBtnData.buttonHeight * 2, hlBtnData.buttonHeight, this.storeButtons, this.helperButtonHandler);
  

    //TEXTS AND ICONS
    var taskTextStyle = {
      font: "20px Bungee",
      fill: "black"
    };
    var priceTextStyle = {
      font: "22px Bungee",
      fill: "black"
    };
    this.storeTextGroup = this.game.add.group();

    this.buyTaskText = this.game.add.text(1040, 110, "Buy Equations", buyTaskTextStyle);
    this.buyTaskText.anchor.setTo(0.5);
    this.storeTextGroup.add(this.buyTaskText);

    this.buyHelpersText = this.game.add.text(1040, 495, "Buy Helpers", buyTaskTextStyle);
    this.buyHelpersText.anchor.setTo(0.5);
    this.storeTextGroup.add(this.buyHelpersText);



    //TASK TEXTS
    this.easyTaskText = this.game.add.text();
    this.easyTaskIcon = this.game.add.sprite();
    this.easyTaskPriceText = this.game.add.text();
    this.easyTaskPriceIcon = this.game.add.sprite();
    this.easyTaskRewardText = this.game.add.text();
    this.createTaskArea(this.easyTaskRewardText, this.easyTaskReward, this.easyTaskPrice, this.easyTaskText, this.easyTaskIcon, this.easyTaskPriceText, this.easyTaskPriceIcon, 945, 160, 850, 175, 980, "Easy", "easy");
    
    this.normalTaskText = this.game.add.text();
    this.normalTaskIcon = this.game.add.sprite();
    this.normalTaskPriceText = this.game.add.text();
    this.normalTaskPriceIcon = this.game.add.sprite();
    this.normalTaskRewardText = this.game.add.text();
    this.createTaskArea(this.normalTaskRewardText, this.normalTaskReward, this.normalTaskPrice, this.normalTaskText, this.normalTaskIcon, this.normalTaskPriceText, this.normalTaskPriceIcon, 962, 240, 850, 255, 980, "Normal", "normal");
    
    this.hardTaskText = this.game.add.text();
    this.hardTaskIcon = this.game.add.sprite();
    this.hardTaskPriceText = this.game.add.text();
    this.hardTaskPriceIcon = this.game.add.sprite();
    this.hardTaskRewardText = this.game.add.text();
    this.createTaskArea(this.hardTaskRewardText, this.hardTaskReward, this.hardTaskPrice, this.hardTaskText, this.hardTaskIcon, this.hardTaskPriceText, this.hardTaskPriceIcon, 945, 320, 850, 340, 980, "Hard", "hard");
    
    this.asianTaskText = this.game.add.text();
    this.asianTaskIcon = this.game.add.sprite();
    this.asianTaskPriceText = this.game.add.text();
    this.asianTaskPriceIcon = this.game.add.sprite();
    this.asianTaskRewardText = this.game.add.text();
    this.createTaskArea(this.asianTaskRewardText, this.asianTaskReward, this.asianTaskPrice, this.asianTaskText, this.asianTaskIcon, this.asianTaskPriceText, this.asianTaskPriceIcon, 945, 400, 850, 420, 980, "Asian", "asian");
    

    //HELPERS TEXT & ICONS
    this.buyStudentText = this.game.add.text();
    this.studentPriceText = this.game.add.text();
    this.studentPriceIcon = this.game.add.sprite();
    this.createHelperText(this.studentGain, this.buyStudentText, this.studentPriceText, this.studentPriceIcon, this.storeTextGroup, this.studentPrice, 800, 550 + 75 * 0, "Student", 1000, 580 + 74 * 0);
    
    this.buyProfessorText = this.game.add.text();
    this.professorPriceText = this.game.add.text();
    this.professorPriceIcon = this.game.add.sprite();
    this.createHelperText(this.profGain, this.buyProfessorText, this.professorPriceText, this.professorPriceIcon, this.storeTextGroup, this.profPrice, 800 + 15, 550 + 75 * 1, "Professor", 1000, 580 + 74 * 1);
    
    this.buyXFarmText = this.game.add.text();
    this.xFarmPriceText = this.game.add.text();
    this.xFarmPriceIcon = this.game.add.sprite();
    this.createHelperText(this.xFarmGain, this.buyXFarmText, this.xFarmPriceText, this.xFarmPriceIcon, this.storeTextGroup, this.xFarmPrice, 800 - 15, 550 + 75 * 2, "xFarm", 1000, 580 + 74 * 2);

    this.game.world.bringToTop(this.storeTextGroup);

  },
  openUpgrades: function(){
    //clear previous opener
    this.storeTextGroup.destroy(true);
    this.storeButtons.destroy(true);

    this.openStoreButton.alpha = 0.5;
    this.openUpgradeButton.alpha = 1;

    console.log("Upgrade section opened");
  },
  taskButtonHandler: function(button){
    console.log("TaskButton presssed");
    console.log(button);
  },

  helperButtonHandler: function(button){
    // console.log("HelperButton pressed");
    console.log(button);
    console.log(button.graphicsData[0].fillColor);

    var price = button.data.price;
    var gain = button.data.gain;

    //if enough money, add gain to gainpersecond
    if(price <= this.xNow){
      this.xNow -= price;
      this.xGainPerSecond += gain;
    }
    else{
      var tween = this.game.add.tween(button).to({tint: 0xff0000}, 500, null, true);
      tween.onComplete.add(function(){
        button.tint = 0xffffff;
      }, this);

    }

  },
  createStoreButton: function(button, buttonColor, buttonTop, buttonHeight, group, buttonHandler){
                        
    button.lineStyle(2, 0x000000, 1);            
    button.beginFill(buttonColor, 1);            
    button.drawRect(800, buttonTop, 480, buttonHeight);                      
    button.endFill(); 
    button.alpha = 1;
    button.inputEnabled = true;     

    button.events.onInputDown.add(buttonHandler, this);
    button.events.onInputOver.add(function(){
      button.tint = 0.5 * 0xffffff;
    }, this)
    button.events.onInputOut.add(function(){
      button.tint = 0xffffff;
    }, this)

    group.add(button);

  },
  createHelperText: function(gain, text, priceText, Icon, group, price, textX, textY, key, priceX, priceY){
    var priceTextStyle = {
      font: "22px Bungee",
      fill: "black"
    };
      var taskTextStyle = {
      font: "20px Bungee",
      fill: "black"
    };
    var gainTextStyle = {
      font: "20px Bungee",
      fill: "black"
    };

    text = this.game.add.text(textX + 175, textY, key, taskTextStyle);
    text.anchor.setTo(0.5);
    this.storeTextGroup.add(text);
    //price
    priceText = this.game.add.text(priceX, priceY, price, priceTextStyle);
    priceText.anchor.setTo(0.5);
    this.storeTextGroup.add(priceText);
    //icon
    Icon = this.game.add.sprite(priceText.right + 20, priceText.y, "xIcon");
    Icon.anchor.setTo(0.5);
    Icon.scale.setTo(0.3);
    group.add(Icon);

    //X Gain
    var gainText = this.game.add.text(1150, text.y, "XGAIN", gainTextStyle);
    gainText.anchor.setTo(0.5);
    var gainAmountText = this.game.add.text(gainText.x + 30, gainText.y + 30,"+"+ gain + "  X/second", gainTextStyle);
    gainAmountText.anchor.setTo(0.5);
    // var gainIcon = this.game.add.sprite(gainAmountText.right + 20, gainAmountText.y - 10, "xIcon");
    // gainIcon.anchor.setTo(0.5);
    // gainIcon.scale.setTo(0.3);

    group.add(gainText);
    group.add(gainAmountText);
    // group.add(gainIcon);


  },
  createTaskArea: function(rewardAmountText, reward, amount, text, icon, priceText, priceIcon, textX, textY, IconX, IconY, priceX, textString, iconString){

    var taskTextStyle = {
      font: "20px Bungee",
      fill: "black"
    };
    var priceTextStyle = {
      font: "22px Bungee",
      fill: "black"
    };
    var rewardTextStyle = {
      font: "20px Bungee",
      fill: "black"
    };

    text = this.game.add.text(textX, textY, textString, taskTextStyle);  
    Icon = this.game.add.sprite(IconX, IconY, iconString);   
    priceText = this.game.add.text(priceX, text.y + 30, amount, priceTextStyle);
    priceIcon = this.game.add.sprite(priceText.right, priceText.y, "xIcon");

    //reward text
    var rewardText = this.game.add.text(1150, text.y, "Reward", rewardTextStyle);
    rewardText.anchor.setTo(0.5);
    rewardAmountText = this.game.add.text(rewardText.x + 20, rewardText.y + 30, reward, rewardTextStyle);
    rewardAmountText.anchor.setTo(0.5);
    var rewardIcon = this.game.add.sprite(rewardAmountText.right + 20, rewardAmountText.y, "xIcon");

    priceIcon.anchor.setTo(0.5);
    rewardIcon.anchor.setTo(0.5);
    priceText.anchor.setTo(0.5);
    text.anchor.setTo(0.5);
    Icon.anchor.setTo(0.5);
    Icon.scale.setTo(1.3);
    rewardIcon.scale.setTo(0.3);
    priceIcon.scale.setTo(0.3);
    this.storeTextGroup.add(priceText);
    this.storeTextGroup.add(priceIcon);
    this.storeTextGroup.add(text);
    this.storeTextGroup.add(Icon);
    this.storeTextGroup.add(rewardText);
    this.storeTextGroup.add(rewardAmountText);
    this.storeTextGroup.add(rewardIcon);

    //reward text
  }
};
