var ClickerMath = ClickerMath || {};
 

ClickerMath.GameState = {

  //initiate game settings
  init: function() {

    this.totalX = 100000;
    this.xData = {
      xNow: 100000,
    };

    this.clickGain = 1;
    this.xGainPerSecond = 0;

    this.easyTaskData = {
      available: false,
      price: 50,
      reward: 500,
      solved: 0,
      priceText: this.game.add.text(),
      solvedAmountText: this.game.add.text(),
      rewardText: this.game.add.text(),
      icon: this.game.add.sprite(null, null, "easy"),
    };

    this.normalTaskData = {
      available: false,
      price: 200,
      reward: 2000,
      solved: 0,
      priceText: this.game.add.text(),
      rewardText: this.game.add.text(),
      solvedAmountText: this.game.add.text(),
      icon: this.game.add.sprite(null, null, "normal"),
    };

    this.hardTaskData = {
      available: false,
      price: 500,
      reward: 5000,
      solved: 0,
      priceText: this.game.add.text(),
      rewardText: this.game.add.text(),
      solvedAmountText: this.game.add.text(),
      icon: this.game.add.sprite(null, null, "hard"),
    };

    this.asianTaskData = {
      available: false,
      price: 1000,
      reward: 10000,
      solved: 0,
      priceText: this.game.add.text(),
      rewardText: this.game.add.text(),
      solvedAmountText: this.game.add.text(),
      icon: this.game.add.sprite(null, null, "asian")
    };


    //HELPERS
    this.studentData = {
      amountText: this.game.add.text(),
      amount: 0,
      price: 20,
      gain: 0.5,
      priceGrow: 20,
      priceText: this.game.add.text(),
      iconKey: "student",
      iconScale: {
        x: 0.2,
        y: 0.2
      },
      spawnArea: {
        x1: 50,
        y1: 650,
        x2: 283,
        y2: 750
      },
      emitter: this.game.add.emitter(0, 0, 0)
    };

    this.profData = {
      amountText: this.game.add.text(),
      amount: 0,
      price: 50,
      gain: 1,
      priceGrow: 50,
      priceText: this.game.add.text(),
      iconKey: "professor",
      iconScale: {
        x: 0.2,
        y: 0.2
      },
      spawnArea: {
        x1: 283,
        y1: 650,
        x2: 516,
        y2: 750
      },
      emitter: this.game.add.emitter(0, 0, 0)
    };

    this.xFarmData = {
      amountText: this.game.add.text(),
      amount: 0,
      price: 400,
      gain: 2,
      priceGrow: 400,
      priceText: this.game.add.text(),
      iconKey: "xFarm",
      iconScale: {
        x: 0.6,
        y: 0.6
      },
      spawnArea: {
        x1: 516,
        y1: 650,
        x2: 750,
        y2: 750
      },
      emitter: this.game.add.emitter(0, 0, 0)
    };

    this.upgradeDatas = {
      unlockEasyLevelData : {
        price: 200,
        keyGroup: "task",
        key: "easy",
        requirements: ["this.profData.amount >= 1"],
        reward: ["ClickerMath.GameState.easyTaskData.available = true"],
        infoText: "This is my infoText. This unlocks the easy tasks!"
      },

      studentGainPlus: {
        price: 100000,
        keyGroup: "helper",
        key: "studentUpgrade",
        requirements: ["this.profData.amount >= 1"],
        reward: ["ClickerMath.GameState.studentData.gain += 0.2"],
        infoText: "This is my infoText. This unlocks the easy tasks!"
      },

      unlockNormalLevelData : {
        price: 500,
        keyGroup: "task",
        key: "normal",
        requirements: ["this.profData.amount >= 2"],
        reward: ["ClickerMath.GameState.normalTaskData.available = true"],
        infoText: "This unlocks the normal level tasks!"
      },

      unlockHardLevelData : {
        price: 1000,
        keyGroup: "task",
        key: "hard",
        requirements: ["this.studentData.amount >= 3"],
        reward: ["ClickerMath.GameState.hardTaskData.available = true"],
        infoText: "Unlocks the hard tasks!"
      },

      profGainPlus: {
        price: 100,
        keyGroup: "helper",
        key: "professorUpgrade",
        requirements: ["this.profData.amount >= 1"],
        reward: ["ClickerMath.GameState.studentData.gain += 0.2"],
        infoText: "Professors make more x (+0.2) per second!"
      },

      xFarmGainPlus: {
        price: 1090,
        keyGroup: "helper",
        key: "xFarmUpgrade",
        requirements: ["this.profData.amount >= 1"],
        reward: ["ClickerMath.GameState.studentData.gain += 0.2"],
        infoText: "xFarms gais + 1"
      }
      
    };
    


    this.guiLineData = {
      lineWidth: 2,
      lineColor: 0x000000,
      lineAlpha: 0.6
    };

    this.xAmountStyle = {
      font: "40px aldrichregular",
      fill: "black"
    };

    this.xIconClickPointStyle = {
      font: "30px aldrichregular",
      fill: "green"
    };

    this.taskTextStyle = {
      font: "60px aldrichregular",
      fill: "black"
    };
    this.taskAnswerTextStyle = {
      font: "30px aldrichregular",
      fill: "black"
    }
    this.taskAnswerBtn = {
      fillColor: 0x3D85C6
    }

    //BOOLEANS
    this.storeOpen = false;
    this.taskInitialized = false;

    //groups
    this.helperGroup = this.game.add.group();


    //create upgrades group
    this.upgradesGroup = this.game.add.group();
    this.upgradesGroup.name = "All upgrades"
    this.createUpgrades();

  },

  //load the game assets before the game starts
  preload: function() {

    //graphics
    this.graphics = this.game.add.graphics(0.0); 

    //init tasks
    this.easyTasks = this.initTasks("easyTasks");
    this.normalTasks = this.initTasks("normalTasks");
    this.hardTasks = this.initTasks("hardTasks");
    this.asianTasks = this.initTasks("asianTasks");
  },
  //executed after everything is loaded
  create: function() {

    //physics for emitters
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.stage.backgroundColor = "#E5EEF7";
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
    this.xAmountText = this.game.add.text(400, 40, this.xData.xNow, this.xAmountStyle);
    this.xAmountText.anchor.setTo(0.5);

    this.xAmountIcon = this.game.add.sprite(this.xAmountText.right + 30, this.xAmountText.y, "xIcon");
    this.xAmountIcon.anchor.setTo(0.5);
    this.xAmountIcon.scale.setTo(0.5);

    //set emitters
    this.setHelperEmitters(this.studentData);
    this.setHelperEmitters(this.profData);
    this.setHelperEmitters(this.xFarmData);

    //create the X
    this.createClickableX();
    

    //create answer coordinates
    this.answerCoords = this.createAnswerCoordinates();

    //create timer for per second update
    this.game.time.events.loop(Phaser.Timer.SECOND/10, this.updateXPerSecond, this);

    this.loadGuiLines();

    this.loadStoreAndplacedUpgrades();

    //open store at start
    this.openStore();
  },
  update: function() {

    //update current x and total x
    //this.xAmountText.text = Math.floor(this.xData.xNow);
    this.xAmountIcon.x = this.xAmountText.right + 30; 

    this.xAmountText.text = parseInt(this.xData.xNow, 10);
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
  createClickableX: function(){
    //clickable x
    this.X = this.game.add.sprite(400, 350, "X");
    this.X.anchor.setTo(0.5);
    this.X.scale.setTo(0.5);
    this.X.inputEnabled = true;
    this.X.input.pixelPerfectClick = true;

    var xTween = this.game.add.tween(this.X).from({alpha: 0}, 500, null, true, 0, 0, false)

    //create event if x clickable
    this.X.events.onInputUp.add(this.xIconClicked, this);
  },
  updateXPerSecond: function(){

    this.totalX += this.xGainPerSecond/10;
    this.xData.xNow += this.xGainPerSecond/10;
  },
  xIconClicked: function(sprite, pointer){
    //console.log(arguments);

    //update xamounts
    this.totalX += this.clickGain;
    this.xData.xNow += this.clickGain;

    //update text
    this.xAmountText.text = Math.floor(this.xData.xNow);
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
  loadStoreAndplacedUpgrades: function(){
    var storeHeadLineStyle = {
      font: "35px aldrichregular",
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
    this.openStoreButton.events.onInputDown.add(function(){
      if(!this.storeOpen){
        this.openStore();
      }
      
    }, this);

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

    //open upgrade area if store is open         
    this.openUpgradeButton.events.onInputDown.add(function(){

      if(this.storeOpen){
        // console.log("Upgrades group in button signal: " + this.upgradesGroup.children.length);
          this.openUpgrades();     
      }
      
    }, this, 1);
  },
  openStore: function(){

    this.storeOpen = true;
    //clear previous opener
    this.openUpgradeButton.alpha = 0.5;
    this.openStoreButton.alpha = 1;

    // console.log("Store - section opened");
    this.upgradesGroup.visible = false;

    //alive upgrades, set reset them
    this.upgradesGroup.forEach(function(upgrade){
      if(upgrade.alive){
        upgrade.kill();
      }
    }, this)

    var buyTaskTextStyle = {
      font: "30px aldrichregular",
      fill: "black"
    };

    //buttons for tasks
    this.storeButtons = this.game.add.group();

    var eqBtnData = {
      buttonTop: 140,
      buttonHeight: 80,
      easyButtonColor: 0xD7E5F3,
      normalButtonColor:0xC0D7EC,
      hardButtonColor:0x9CC1E1,
      asianButtonColor:0x649DD1
    }
    //taskbuttons
    this.easyTaskButton = this.add.graphics(0, 0); 
    this.easyTaskButton.data.available = this.easyTaskData.available;
    this.createStoreButton(this.easyTaskButton, eqBtnData.easyButtonColor, eqBtnData.buttonTop, eqBtnData.buttonHeight, this.storeButtons, "taskButton");
    
    this.normalTaskButton = this.add.graphics(0, 0); 
    this.normalTaskButton.data.available = this.normalTaskData.available;
    this.createStoreButton(this.normalTaskButton, eqBtnData.normalButtonColor, eqBtnData.buttonTop + eqBtnData.buttonHeight * 1, eqBtnData.buttonHeight, this.storeButtons, "taskButton");
    
    this.hardTaskButton = this.add.graphics(0, 0);   
    this.hardTaskButton.data.available = this.hardTaskData.available;                 
    this.createStoreButton(this.hardTaskButton, eqBtnData.hardButtonColor, eqBtnData.buttonTop + eqBtnData.buttonHeight * 2, eqBtnData.buttonHeight, this.storeButtons, "taskButton");          
    
    this.asianTaskButton = this.add.graphics(0, 0); 
    this.asianTaskButton.data.available = this.asianTaskData.available;
    this.createStoreButton(this.asianTaskButton, eqBtnData.asianButtonColor, eqBtnData.buttonTop + eqBtnData.buttonHeight * 3, eqBtnData.buttonHeight, this.storeButtons, "taskButton");


    //HELPER BUTTONS
    var hlBtnData = {
      buttonTop: 530,
      buttonHeight: 70
    };

    this.studentHelperButton = this.add.graphics(0, 0);   
    this.createStoreButton(this.studentHelperButton, 0xD7E5F3, hlBtnData.buttonTop + hlBtnData.buttonHeight * 0, hlBtnData.buttonHeight, this.storeButtons, "helperButton");
    
    this.profHelperButton = this.add.graphics(0, 0); 
    this.createStoreButton(this.profHelperButton, 0x9CC1E1, hlBtnData.buttonTop + hlBtnData.buttonHeight * 1, hlBtnData.buttonHeight, this.storeButtons, "helperButton");
    
    this.xFarmHelperButton = this.add.graphics(0, 0);    
    this.createStoreButton(this.xFarmHelperButton, 0x649DD1, hlBtnData.buttonTop + hlBtnData.buttonHeight * 2, hlBtnData.buttonHeight, this.storeButtons, "helperButton");
  

    //TEXTS AND ICONS
    var taskTextStyle = {
      font: "20px aldrichregular",
      fill: "black"
    };
    var priceTextStyle = {
      font: "22px aldrichregular",
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
    this.easyTaskPriceIcon = this.game.add.sprite();
    this.createTaskArea(this.easyTaskData, this.easyTaskPriceIcon, 945, 160, 850, 175, 980, "Easy");
    
    this.normalTaskText = this.game.add.text();
    this.normalTaskPriceIcon = this.game.add.sprite();
    this.createTaskArea(this.normalTaskData, this.normalTaskPriceIcon, 962, 240, 850, 255, 980, "Normal");
    
    this.hardTaskText = this.game.add.text();
    this.hardTaskPriceIcon = this.game.add.sprite();
    this.createTaskArea(this.hardTaskData, this.hardTaskPriceIcon, 945, 320, 850, 340, 980, "Hard");
    
    this.asianTaskText = this.game.add.text();
    this.asianTaskPriceIcon = this.game.add.sprite();
    this.createTaskArea(this.asianTaskData, this.asianTaskPriceIcon, 945, 400, 850, 420, 980, "Asian");
    

    //HELPERS TEXT & ICONS
    this.buyStudentText = this.game.add.text();
    this.studentPriceIcon = this.game.add.sprite();
    this.createHelperText(this.studentData, this.buyStudentText, this.studentPriceIcon, this.storeTextGroup, 800, 550 + 75 * 0, "Student", 1000, 580 + 74 * 0, 850, 565);
    
    this.buyProfessorText = this.game.add.text();
    this.professorPriceIcon = this.game.add.sprite();
    this.createHelperText(this.profData, this.buyProfessorText, this.professorPriceIcon, this.storeTextGroup, 800 + 15, 550 + 75 * 1, "Professor", 1000, 580 + 74 * 1, 850, 635);
    
    this.buyXFarmText = this.game.add.text();
    this.xFarmPriceIcon = this.game.add.sprite();
    this.createHelperText(this.xFarmData, this.buyXFarmText, this.xFarmPriceIcon, this.storeTextGroup, 800 - 15, 550 + 75 * 2, "xFarm", 1000, 580 + 74 * 2, 850, 705);

    this.game.world.bringToTop(this.storeTextGroup);

  },
  openUpgrades: function(){
    
    this.upgradesGroup.visible = true;

    //store open false
    this.storeOpen = false;

    //clear previous opener
    this.storeTextGroup.kill(true);
    this.storeButtons.kill(true);

    this.openStoreButton.alpha = 0.5;
    this.openUpgradeButton.alpha = 1;

    //get the upgrade coordinates
    var coords = this.createUpgradePositions();

    //check which upgrades fills the requirements and then draw them 
    //check what upgrades will be removed
    var indexes = [];

    //for (var i = 0, len = group.children.length; i < len; i++) {  console.log(group.children[i]);}
    this.upgradesGroup.forEach(function(upgrade){
      var available = true;
      var requirementsArr = upgrade.data.requirements;
      var len = requirementsArr.length;
      for (var i = 0; i < len; i++) {
          // console.log(requirementsArr[i])
          //if all true then add upgrade to on the list
          if(!eval(requirementsArr[i])){
            available = false;
          }
      }
      if(available){
          indexes.push(upgrade.z);
      }
    }, this);
    
    // console.log(indexes);
    var pos;
    //remove those from upgradesgroup and add to upgrade area
    for(var j = 0 ; j < indexes.length ; j++){
      var child = this.upgradesGroup.getAt(indexes[j]);
      // console.log(child);
      var pos = coords.shift();
      child.drawUpgrade(pos[0], pos[1]);
      child.alive = true;
    }
  },

  taskButtonHandler: function(button){

    //detect which button is pressed and get the task
    var task;
    var taskData;
    //groups for text to bring them top
    var taskTextGroup = this.game.add.group();
    var taskGroup = this.game.add.group();

    if(button == this.easyTaskButton){
      //get random task
      task = this.easyTasks[Math.floor(Math.random() * this.easyTasks.length)];
      taskData = this.easyTaskData;
    }
    else if(button == this.normalTaskButton){
      task = this.normalTasks.pop();
      taskData = this.normalTaskData;
    }
    else if(button == this.hardTaskButton){
      task = this.hardTasks.pop();
      taskData = this.hardTaskData;
    }
    else if(button == this.asianTaskButton){
      task = this.asianTasks.pop();
      taskData = this.asianTaskData;
    }  
    //check if enough money
    if(taskData.price <= this.xData.xNow){
      //kill clickable x and dont take anymore button presses for tasks
      this.taskInitialized = true;

      //tween task icon alpha
      var iconTween = this.game.add.tween(taskData.icon.scale).to({x: 1.5, y: 1.5}, 350, null, true, 0, 0, true);

      //tween x out
      var xTween = this.game.add.tween(this.X).to({alpha: 0.0}, 1000, null, true, 0, 0, false);
      xTween.onComplete.add(function(){
        this.X.destroy();
        //reduce price
        this.xData.xNow -= taskData.price;
        //init task
        this.initTaskToGame(task, taskData, taskGroup, taskTextGroup);
      }, this);   
    }
    else{
      this.tweenTint(button, button.graphicsData[0].fillColor, 0xff0000, 100);
    }    
  },

  helperButtonHandler: function(button){
    var helper;
    var data;
    if(button == this.studentHelperButton){
      helper = this.studentData;
    }
    else if (button == this.profHelperButton){
      helper = this.profData;
    }
    else if (button == this.xFarmHelperButton){
      helper = this.xFarmData;
    }
    //if enough money, add gain to gainpersecond
    if(helper.price <= this.xData.xNow){
      this.xData.xNow -= helper.price;
      //update price and amount
      helper.price += helper.priceGrow;
      helper.amount += 1;
      this.updateGainPerSeconds();
      helper.priceText.setText(helper.price, true);
      helper.amountText.setText("#" + helper.amount, true);

      //put the sprite on gameboard
      //get random integers 
      var x = this.game.rnd.integerInRange(helper.spawnArea.x1, helper.spawnArea.x2);
      var y = this.game.rnd.integerInRange(helper.spawnArea.y1, helper.spawnArea.y2);
      var sprite = this.game.add.sprite(x, y, helper.iconKey);
      sprite.anchor.setTo(0.5);
      sprite.scale.setTo(helper.iconScale.x * 0.5, helper.iconScale.y * 0.5);

      //tween sprite to own area
      var tween = this.game.add.tween(sprite).from({y: 800, x: x}, 2000, null, true);

      tween.onComplete.add(function(){
        //change emitter rate
        //flow( [lifespan] [, frequency] [, quantity] [, total] [, immediate])
        helper.emitter.flow(2000, 2000, helper.amount * helper.gain, -1);
      }, this);
    }
    else{
      this.tweenTint(button, button.graphicsData[0].fillColor, 0xff0000, 100);
    }

  },

  updateGainPerSeconds: function(){
    this.xGainPerSecond = this.studentData.amount * this.studentData.gain;
    this.xGainPerSecond += this.profData.amount * this.profData.gain;
    this.xGainPerSecond += this.xFarmData.amount * this.xFarmData.gain;

  },
  createStoreButton: function(button, buttonColor, buttonTop, buttonHeight, group, buttonHandler){

    var buttonFinalColor;
    var buttonAlpha = 1;

    button.lineStyle(2, 0x000000, 1);            
    button.beginFill(buttonColor, buttonAlpha);            
    button.drawRect(800, buttonTop, 480, buttonHeight);                      
    button.endFill(); 
    button.inputEnabled = true;  

    button.events.onInputDown.add(function(){
      
        if(buttonHandler === "taskButton"){
            if(!this.taskInitialized && button.data.available){
              this.taskButtonHandler(button);
            }
        }
        else{
          this.helperButtonHandler(button)
        }
      
    }, this);

    button.events.onInputOver.add(function(){
      button.tint = 0.5 * 0xffffff;
    }, this);

    button.events.onInputOut.add(function(){  
      button.tint = 0xffffff;
    }, this);

    group.add(button);

  },
  createHelperText: function(data, text, Icon, group, textX, textY, key, priceX, priceY, iconX, iconY){
    var priceTextStyle = {
      font: "20px aldrichregular",
      fill: "black"
    };
      var taskTextStyle = {
      font: "22px aldrichregular",
      fill: "black"
    };
    var gainTextStyle = {
      font: "22px aldrichregular",
      fill: "black"
    };

    //create icon
    var iconSprite = this.game.add.sprite(iconX, iconY, data.iconKey);
    iconSprite.anchor.setTo(0.5);
    iconSprite.scale.setTo(data.iconScale.x, data.iconScale.y);
    this.storeTextGroup.add(iconSprite);
    text = this.game.add.text(textX + 175, textY, key, taskTextStyle);
    text.anchor.setTo(0.5);
    this.storeTextGroup.add(text);
    //price
    data.priceText.setStyle(priceTextStyle);
    data.priceText.x = priceX; 
    data.priceText.y = priceY;
    data.priceText.setText(data.price);
    data.priceText.anchor.setTo(0.5);
    this.storeTextGroup.add(data.priceText, true);
    //icon
    Icon = this.game.add.sprite(data.priceText.right + 20, data.priceText.y, "xIcon");
    Icon.anchor.setTo(0.5);
    Icon.scale.setTo(0.3);
    group.add(Icon);
    //X Gain
    var gainText = this.game.add.text(1150, text.y, "XGAIN", gainTextStyle);
    gainText.anchor.setTo(0.5);
    var gainAmountText = this.game.add.text(gainText.x + 30, gainText.y + 30,"+"+ Math.round(data.gain * 100)/100 + "  X/second", gainTextStyle);
    gainAmountText.anchor.setTo(0.5);
    group.add(gainText);
    group.add(gainAmountText);

    //amount text
    data.amountText.x = iconSprite.x + 50;
    data.amountText.y = iconSprite.y + 20;
    data.amountText.setText("#" + data.amount, true);
    data.amountText.anchor.setTo(0.5);
    data.amountText.setStyle(gainTextStyle);
    group.add(data.amountText);

  },
  createTaskArea: function(data, priceIcon, textX, textY, IconX, IconY, priceX, textString){

    var taskTextStyle = {
      font: "20px aldrichregular",
      fill: "black"
    };
    var priceTextStyle = {
      font: "22px aldrichregular",
      fill: "black"
    };
    var rewardTextStyle = {
      font: "20px aldrichregular",
      fill: "black"
    };

    //text for level
    // text = this.game.add.text(textX, textY, textString, taskTextStyle); 
    data.priceText.x = textX;
    data.priceText.y = textY;
    data.priceText.setText(textString);
    data.priceText.anchor.setTo(0.5);
    this.storeTextGroup.add(data.priceText);

    //icon
    Icon = this.game.add.sprite(IconX, IconY, data.iconKey);
    data.icon.x = IconX;
    data.icon.y = IconY;
    data.icon.anchor.setTo(0.5);
    data.icon.scale.setTo(1.3);
    this.storeTextGroup.add(data.icon);   

    //task price
    var priceText = this.game.add.text(priceX, data.priceText.y + 30, data.price, priceTextStyle);
    priceText.anchor.setTo(0.5); 
    this.storeTextGroup.add(priceText);

    //price icon
    priceIcon = this.game.add.sprite(priceText.right + 20, priceText.y, "xIcon");
    priceIcon.anchor.setTo(0.5);
    priceIcon.scale.setTo(0.3);
    this.storeTextGroup.add(priceIcon); 

    //reward text
    var rewardText = this.game.add.text(1150, data.priceText.y, "Reward", rewardTextStyle);
    rewardText.anchor.setTo(0.5);
    this.storeTextGroup.add(rewardText);

    //rewardAMount
    data.rewardText.x = rewardText.x + 20;
    data.rewardText.y = rewardText.y + 30;
    data.rewardText.setText(data.reward, true);
    data.rewardText.setStyle(rewardTextStyle);
    data.rewardText.anchor.setTo(0.5);
    this.storeTextGroup.add(data.rewardText);  

    //solved amount text
    data.solvedAmountText.x = Icon.x + 50;
    data.solvedAmountText.y = Icon.y + 20;
    data.solvedAmountText.setText("#" + data.solved, true);
    data.solvedAmountText.anchor.setTo(0.5);
    data.solvedAmountText.setStyle(rewardTextStyle);
    this.storeTextGroup.add(data.solvedAmountText);

    //reward icon
    var rewardIcon = this.game.add.sprite(data.rewardText.right + 20, data.rewardText.y, "xIcon");
    rewardIcon.anchor.setTo(0.5);    
    rewardIcon.scale.setTo(0.3);  
    this.storeTextGroup.add(rewardIcon);

    //create this if button is not purchased
    if(!data.available){
        var availableTextStyle = {
        font: "bold 35px aldrichregular",
        fill: "red"
        };

      var notAvailableText = this.game.add.text(IconX + 200, IconY, "Not available!", availableTextStyle);
      notAvailableText.anchor.setTo(0.5);
      notAvailableText.angle = 5;
      this.storeTextGroup.add(notAvailableText);

      //set alphas
      data.priceText.alpha = 0.2;
      Icon.alpha = 0.2;
      priceText.alpha = 0.2;
      data.rewardText.alpha = 0.1;
      data.solvedAmountText.alpha = 0.2;
      rewardIcon.alpha = 0.2;
      priceIcon.alpha = 0.2;
      rewardText.alpha = 0.2;
    }
    else{
      //set alphas
      data.priceText.alpha = 1;
      Icon.alpha = 1;
      priceText.alpha = 1;
      data.rewardText.alpha = 1;
      data.solvedAmountText.alpha = 1;
      rewardIcon.alpha = 1;
      priceIcon.alpha = 1;
      rewardText.alpha = 1;

    }
  },

  tweenTint: function(obj, startColor, endColor, time) {    
    // create an object to tween with our step value at 0    
    var colorBlend = {step: 0};    
    // create the tween on this object and tween its step property to 100    
    var colorTween = this.game.add.tween(colorBlend).to({step: 100}, time);        
    // run the interpolateColor function every time the tween updates, feeding it the    
    // updated value of our tween each time, and set the result as our tint    
    colorTween.onUpdateCallback(function() {      
      obj.tint = Phaser.Color.interpolateColor(startColor, endColor, 100, colorBlend.step);       
      });        
    // set the object to the start color straight away    
    obj.tint = startColor;            
    // start the tween    
    colorTween.start();
    colorTween.onComplete.add(function(){
      obj.tint = 0xffffff;
    }, this);
  },

  setHelperEmitters: function(helperData){
    helperData.emitter.makeParticles('xIcon');
    helperData.emitter.centerX = (helperData.spawnArea.x1 + helperData.spawnArea.x2)/2;
    helperData.emitter.centerY = (helperData.spawnArea.y1 + helperData.spawnArea.y2)/2;
    helperData.emitter.setScale(0.3, 0.3, 0.3, 0.3, 0, null, true);
    helperData.emitter.setAlpha(0.6, 1, 0, null, true);

    //helperData.emitter.gravity = -100;
  },

  initTasks: function(taskKey){

    var tasks = [];

    var taskData = JSON.parse(this.game.cache.getText(taskKey))
    for (var key of Object.keys(taskData)) {
        tasks.push(taskData[key]);
      }   

    //randomize tasks
    return this.randomizeArray(tasks)
  },

  randomizeArray: function(array){
    //randomize order

    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
    }

    return array
  },

  createAnswerCoordinates: function(){
    var coords = [];
    var xWidth = 200;
    var yWidth = 100;
    var xTopLeft = 0;
    var yTopLeft = 200;

    for (var i = 1; i <=3 ; i++){  
      for(var j = 1; j <=3 ; j ++){ 
        coords.push([xTopLeft + i * xWidth, yTopLeft + j * yWidth]);
      }
    }
    coords = this.randomizeArray(coords);

    return coords;
  },

  answerButtonHover: function(button){
    button.tint = 0.5 * 0xffffff;
    // console.log(arguments);
  },

  answerButtonOut: function(button){

    button.tint = 0xffffff;
  },

  answerCheck: function(button, pointer, text, taskData, taskCorrectAnswer, taskGroup, textGroup){
    button.alpha = 0.5;
    var textStyle = {
      font: "60px aldrichregular",
      fill: "black"
    }
    var text; 

    var answerCorrect;

    if(text.text === taskCorrectAnswer){

      answerCorrect = true;
      
      taskData.solved += 1;
      taskData.solvedAmountText.setText("#" + taskData.solved, true);
      textStyle.fill = "green";
      text = "Correct!";   
      var emitter = this.game.add.emitter(400, 250, taskData.reward)
      emitter.makeParticles('xIcon');
      emitter.setScale(0.3, 0.3, 0.3, 0.3, 0, null, true);
      emitter.setAlpha(0.2, 1, 0, null, true);
      emitter.setXSpeed(-20, 20);
      emitter.setYSpeed(-250, -100);
      emitter.width = 150;

    }
    else{

      answerCorrect = false;
      textStyle.fill = "red";
      text = "Wrong!"
    }
    //tweening tweening tweening
    var text = this.game.add.text(400, 300, text, textStyle);
    text.anchor.setTo(0.5);

    var textTween = this.game.add.tween(text).from({alpha: 0}, 2800, null, true, 0, 0, false);
    var textTweenRotate = this.game.add.tween(text).from({angle: 360}, 750, null, true, 0, 0, false)
    textTweenRotate.onComplete.add(function(){
      //create rewards tweening towards xIconAmount
      
      //flow( [lifespan] [, frequency] [, quantity] [, total] [, immediate])
      if(answerCorrect){
        emitter.flow(750, 100, 5, 80, false);
        //add reward
        this.xRizeTween(taskData.reward, 1200)
        //this.xData.xNow += taskData.reward;
        this.totalX += taskData.reward;
      }
      
    }, this);

    //destroy taskgroups
    taskGroup.destroy();
    textGroup.destroy();

    

    //after compliments, clear all
    textTween.onComplete.add(function(){
      //destroy text
      text.destroy();
      //create coords again
      this.answerCoords = this.createAnswerCoordinates()
    }, this);

    //wait a second
    this.game.time.events.add(Phaser.Timer.SECOND * 4, function(){
      //can buy now more tasks and creates the X again
      this.createClickableX();
      this.taskInitialized = false;
    }, this);
    
  },

  initTaskToGame: function(task, taskData, taskGroup, textGroup){

    //create task text 
    var taskText = this.game.add.text(400, 200, task["task"], this.taskTextStyle);;
    taskText.anchor.setTo(0.5);
    textGroup.add(taskText);
    //create task answers
    var answers = [];
    taskCorrectAnswer = task["answer"]
    answers.push(taskCorrectAnswer);
    for(var i = 1; i <= 8 ; i++){
      answers.push(task["wrongAnswer" + i]);
    }

    for(var j = 1; j <= 9 ; j ++){
      //set the task coords and text
      var coords = this.answerCoords.pop();
      var answerText = answers.pop();
      var text = this.game.add.text(coords[0], coords[1], answerText, this.taskAnswerTextStyle);
      text.anchor.setTo(0.5);
      textGroup.add(text);

      //task answers input
      var answerButton = this.add.graphics(0, 0); 
      taskGroup.add(answerButton);
      answerButton.lineStyle(1.5, 0x000000, 0.5);            
      answerButton.beginFill(this.taskAnswerBtn.fillColor, 1);            
      answerButton.drawRect(coords[0] - 80, coords[1] - 20, 180, 40);                      
      answerButton.endFill(); 
      answerButton.alpha = 1;
      answerButton.inputEnabled = true;     

      answerButton.events.onInputDown.add(this.answerCheck, this, 0, text, taskData, taskCorrectAnswer, taskGroup, textGroup);

      answerButton.events.onInputOver.add(this.answerButtonHover, this);

      answerButton.events.onInputOut.add(this.answerButtonOut, this);

      
    }
    this.game.world.bringToTop(textGroup);

    var groupTween = this.game.add.tween(textGroup).from({alpha: 0}, 500, null, true, 0, 0, false);

  },

  xRizeTween: function(reward, time){
    //create object score for tweening
    
    var tween = this.game.add.tween(this.xData).to( { xNow: this.xData.xNow + reward }, time, Phaser.Easing.Linear.None);
    tween.start()
  },

  createUpgrades: function(){

    for (const key of Object.keys(this.upgradeDatas)) {
      var task = new ClickerMath.Upgrade(this, 0, 0, this.upgradeDatas[key]);
      this.upgradesGroup.add(task);
      // console.log(task.data);
    }
    this.game.world.bringToTop(this.upgradesGroup);

    // console.log(this.upgradesGroup);  
  },

  createUpgradePositions: function(){

    var coords = [];
    var xWidth = 150;
    var yWidth = 175;
    var xTopLeft = 900;
    var yTopLeft = 175;

    for (var i = 0; i <=2 ; i++){  
      for(var j = 0; j <=3 ; j ++){ 
        coords.push([xTopLeft + i * xWidth, yTopLeft + j * yWidth]);
      }
    }
    return coords;

  }

};
