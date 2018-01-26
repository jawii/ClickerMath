var ClickerMath = ClickerMath || {};
 

ClickerMath.GameState = {

  //initiate game settings
  init: function() {

    this.totalX = 0;
    this.xData = {
      xNow: 0,
    };

    this.clickGain = 1;
    this.xGainPerSecond = 0;

    this.easyTaskData = {
      available: false,
      price: 50,
      reward: 500,
      priceGrow: 10,
      solved: 0,
    };


    this.normalTaskData = {
      available: false,
      priceGrow: 20,
      price: 200,
      reward: 2000,
      solved: 0,
    };

    this.hardTaskData = {
      available: false,
      priceGrow: 100,
      price: 500,
      reward: 5000,
      solved: 0,
    };

    this.asianTaskData = {
      available: false,
      priceGrow: 500,
      price: 1000,
      reward: 10000,
      solved: 0,
    };


    //HELPERS
    this.studentData = {
      amount: 0,
      price: 10,
      gain: 1,
      priceGrow: 5,
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
      amount: 0,
      price: 20,
      gain: 2,
      priceGrow: 10,
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
      amount: 0,
      price: 100,
      gain: 5,
      priceGrow: 100,
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
      clickGain : {
        price: 50,
        keyGroup: "click",
        key: "xUpgrade",
        requirements: ["true"],
        reward: ["ClickerMath.GameState.clickGain += 1"],
        infoText: "Klikkaus +1."
      },

      clickGain2 : {
        price: 200,
        keyGroup: "click",
        key: "xUpgrade",
        requirements: ["ClickerMath.GameState.clickGain >= 2"],
        reward: ["ClickerMath.GameState.clickGain += 1"],
        infoText: "Klikkaus +1."
      },

      clickGain3 : {
        price: 1000,
        keyGroup: "click",
        key: "xUpgrade",
        requirements: ["ClickerMath.GameState.clickGain >= 3"],
        reward: ["ClickerMath.GameState.clickGain += 1"],
        infoText: "Klikkaus +1."
      },

      clickGain4 : {
        price: 5000,
        keyGroup: "click",
        key: "xUpgrade",
        requirements: ["ClickerMath.GameState.clickGain >= 4"],
        reward: ["ClickerMath.GameState.clickGain += 1"],
        infoText: "Klikkaus +1."
      },

      clickGain5 : {
        price: 5000,
        keyGroup: "click",
        key: "xUpgrade",
        requirements: ["ClickerMath.GameState.clickGain >= 5"],
        reward: ["ClickerMath.GameState.clickGain += 1"],
        infoText: "Click gain +1."
      },

      clickGain6 : {
        price: 5000,
        keyGroup: "click",
        key: "xUpgrade",
        requirements: ["ClickerMath.GameState.clickGain >= 6"],
        reward: ["ClickerMath.GameState.clickGain += 1"],
        infoText: "Click gain +1."
      },

      clickGain7 : {
        price: 10000,
        keyGroup: "click",
        key: "xUpgrade",
        requirements: ["ClickerMath.GameState.clickGain >= 7"],
        reward: ["ClickerMath.GameState.clickGain += 1"],
        infoText: "Click gain +1."
      },

      unlockEasyLevelData : {
        price: 50,
        keyGroup: "task",
        key: "easy",
        requirements: ["this.studentData.amount >= 1"],
        reward: ["ClickerMath.GameState.easyTaskData.available = true"],
        infoText: "Unlock easy level tasks."
      },

      unlockNormalLevelData : {
        price: 500,
        keyGroup: "task",
        key: "normal",
        requirements: ["this.profData.amount >= 2", "this.easyTaskData.solved > 4"],
        reward: ["ClickerMath.GameState.normalTaskData.available = true"],
        infoText: "Unlocks the normal level tasks!"
      },

      unlockHardLevelData : {
        price: 5000,
        keyGroup: "task",
        key: "hard",
        requirements: ["this.profData.amount >= 5", "this.normalTaskData.solved > 4"],
        reward: ["ClickerMath.GameState.hardTaskData.available = true"],
        infoText: "Unlocks the hard tasks!"
      },

      unlockAsianLevelData : {
        price: 10000,
        keyGroup: "task",
        key: "asian",
        requirements: ["this.xFarmData.amount >= 10", "this.hardTaskData.solved > 4"],
        reward: ["ClickerMath.GameState.asianTaskData.available = true"],
        infoText: "Unlocks the asian level tasks!"
      },

      easyTaskRewardRize : {
        price: 2000,
        keyGroup: "task",
        key: "easy",
        requirements: ["this.easyTaskData.solved >= 2"],
        reward: ["ClickerMath.GameState.easyTaskData.reward *= 2"],
        infoText: "Doubles Easy tasks rewards"
      },

      easyTaskRewardRize2 : {
        price: 4000,
        keyGroup: "task",
        key: "easy",
        requirements: ["this.easyTaskData.solved >= 5"],
        reward: ["ClickerMath.GameState.easyTaskData.reward *= 2"],
        infoText: "Doubles Easy tasks rewards"
      },

      easyTaskRewardRize3 : {
        price: 8000,
        keyGroup: "task",
        key: "easy",
        requirements: ["this.easyTaskData.solved >= 7"],
        reward: ["ClickerMath.GameState.easyTaskData.reward *= 2"],
        infoText: "Doubles Easy tasks rewards"
      },

      normalTaskRewardRize : {
        price: 4000,
        keyGroup: "task",
        key: "normal",
        requirements: ["this.normalTaskData.solved >= 2"],
        reward: ["ClickerMath.GameState.normalTaskData.reward *= 2"],
        infoText: "Doubles normal tasks reward."
      },

      normalTaskRewardRize2 : {
        price: 8000,
        keyGroup: "task",
        key: "normal",
        requirements: ["this.normalTaskData.solved >= 5"],
        reward: ["ClickerMath.GameState.normalTaskData.reward *= 2"],
        infoText: "Doubles normal tasks reward."
      },

      normalTaskRewardRize3 : {
        price: 16000,
        keyGroup: "task",
        key: "normal",
        requirements: ["this.normalTaskData.solved >= 7"],
        reward: ["ClickerMath.GameState.normalTaskData.reward *= 2"],
        infoText: "Doubles normal tasks reward."
      },

      hardTaskRewardRize : {
        price: 7500,
        keyGroup: "task",
        key: "hard",
        requirements: ["this.hardTaskData.solved >= 2"],
        reward: ["ClickerMath.GameState.hardTaskData.reward *= 2"],
        infoText: "Doubles hard tasks reward."
      },

      hardTaskRewardRize2 : {
        price: 15000,
        keyGroup: "task",
        key: "hard",
        requirements: ["this.hardTaskData.solved >= 5"],
        reward: ["ClickerMath.GameState.hardTaskData.reward *= 2"],
        infoText: "Doubles hard tasks reward."
      },

      hardTaskRewardRize3 : {
        price: 30000,
        keyGroup: "task",
        key: "hard",
        requirements: ["this.hardTaskData.solved >= 7"],
        reward: ["ClickerMath.GameState.hardTaskData.reward *= 2"],
        infoText: "Doubles hard tasks reward."
      },

      asianTaskRewardRize : {
        price: 5000,
        keyGroup: "task",
        key: "asian",
        requirements: ["this.asianTaskData.solved >= 2"],
        reward: ["ClickerMath.GameState.asianTaskData.reward *= 2"],
        infoText: "Doubles asian tasks reward."
      },

      asianTaskRewardRize2 : {
        price: 10000,
        keyGroup: "task",
        key: "asian",
        requirements: ["this.asianTaskData.solved >= 5"],
        reward: ["ClickerMath.GameState.asianTaskData.reward *= 2"],
        infoText: "Doubles asian tasks reward."
      },

      asianTaskRewardRize3 : {
        price: 10000,
        keyGroup: "task",
        key: "asian",
        requirements: ["this.asianTaskData.solved >= 7"],
        reward: ["ClickerMath.GameState.asianTaskData.reward *= 2"],
        infoText: "Doubles asian tasks reward."
      },


      studentGainPlus: {
        price: 100,
        keyGroup: "helper",
        key: "studentUpgrade",
        requirements: ["this.profData.amount >= 1", "this.easyTaskData.solved >= 1"],
        reward: ["ClickerMath.GameState.studentData.gain += 1"],
        infoText: "Each student gains one more X per second."
      },

      studentGainPlus2: {
        price: 200,
        keyGroup: "helper",
        key: "studentUpgrade",
        requirements: ["this.xFarmData.amount >= 5", "this.normalTaskData.solved >= 1"],
        reward: ["ClickerMath.GameState.studentData.gain += 1"],
        infoText: "Each student gains one more X per second."
      },

      studentGainPlus3: {
        price: 1000,
        keyGroup: "helper",
        key: "studentUpgrade",
        requirements: ["this.profData.amount >= 10", "this.hardTaskData.solved >= 1"],
        reward: ["ClickerMath.GameState.studentData.gain += 1"],
        infoText: "Each student gains one more X per second."
      },

      studentGainPlus4: {
        price: 5000,
        keyGroup: "helper",
        key: "studentUpgrade",
        requirements: ["this.profData.amount >= 15", "this.asianTaskData.solved >= 1"],
        reward: ["ClickerMath.GameState.studentData.gain += 1"],
        infoText: "Each student gains one more X per second."
      },

      studentGainPlus5: {
        price: 5000,
        keyGroup: "helper",
        key: "studentUpgrade",
        requirements: ["this.easyTaskData.solved >= 10"],
        reward: ["ClickerMath.GameState.studentData.gain += 5"],
        infoText: "Each student gains five more X in second."
      },

      studentGainPlus6: {
        price: 5000,
        keyGroup: "helper",
        key: "studentUpgrade",
        requirements: ["this.easyTaskData.solved >= 15"],
        reward: ["ClickerMath.GameState.studentData.gain += 5"],
        infoText: "Each student gains five more X per second."
      },

      studentGainPlus7: {
        price: 5000,
        keyGroup: "helper",
        key: "studentUpgrade",
        requirements: ["this.easyTaskData.solved >= 20"],
        reward: ["ClickerMath.GameState.studentData.gain += 5"],
        infoText: "Each student gains five more X per second."
      },

      studentGainPlus9: {
        price: 7500,
        keyGroup: "helper",
        key: "studentUpgrade",
        requirements: ["this.easyTaskData.solved >= 25"],
        reward: ["ClickerMath.GameState.studentData.gain *= 2"],
        infoText: "Doubles students gain!"
      },

      studentGainPlus10: {
        price: 10000,
        keyGroup: "helper",
        key: "studentUpgrade",
        requirements: ["this.easyTaskData.solved >= 30"],
        reward: ["ClickerMath.GameState.studentData.gain *= 2"],
        infoText: "Doubles students gain!"
      },

      studentGainPlus11: {
        price: 12500,
        keyGroup: "helper",
        key: "studentUpgrade",
        requirements: ["this.easyTaskData.solved >= 50"],
        reward: ["ClickerMath.GameState.studentData.gain *= 2"],
        infoText: "Doubles students gain!"
      },

      studentGainPlus12: {
        price: 15000,
        keyGroup: "helper",
        key: "studentUpgrade",
        requirements: ["this.easyTaskData.solved >= 60"],
        reward: ["ClickerMath.GameState.studentData.gain *= 2"],
        infoText: "Doubles students gain!"
      },

      studentGainPlus13: {
        price: 7500,
        keyGroup: "helper",
        key: "studentUpgrade",
        requirements: ["this.easyTaskData.solved >= 80"],
        reward: ["ClickerMath.GameState.studentData.gain *= 2"],
        infoText: "Doubles students gain!"
      },


      profGainPlus: {
        price: 500,
        keyGroup: "helper",
        key: "professorUpgrade",
        requirements: ["this.xFarmData.amount >= 1", "this.easyTaskData.solved >= 1"],
        reward: ["ClickerMath.GameState.profData.gain += 2"],
        infoText: "Professor makes two more X per second."
      },

      profGainPlus2: {
        price: 500,
        keyGroup: "helper",
        key: "professorUpgrade",
        requirements: ["this.xFarmData.amount >= 5", "this.normalTaskData.solved >= 1"],
        reward: ["ClickerMath.GameState.profData.gain += 2"],
        infoText: "Professor makes two more X per second!"
      },

      profGainPlus3: {
        price: 5000,
        keyGroup: "helper",
        key: "professorUpgrade",
        requirements: ["this.xFarmData.amount >= 10", "this.hardTaskData.solved >= 1"],
        reward: ["ClickerMath.GameState.profData.gain += 2"],
        infoText: "Professor makes two more X per second!"
      },

      profGainPlus4: {
        price: 10000,
        keyGroup: "helper",
        key: "professorUpgrade",
        requirements: ["this.xFarmData.amount >= 15", "this.asianTaskData.solved >= 1"],
        reward: ["ClickerMath.GameState.profData.gain += 2"],
        infoText: "Professor makes two more X per second!"
      },

      profGainPlus5: {
        price: 10000,
        keyGroup: "helper",
        key: "professorUpgrade",
        requirements: ["this.normalTaskData.solved >= 10"],
        reward: ["ClickerMath.GameState.profData.gain += 5"],
        infoText: "Professor makes five more X per second!"
      },

      profGainPlus6: {
        price: 10000,
        keyGroup: "helper",
        key: "professorUpgrade",
        requirements: ["this.normalTaskData.solved >= 15"],
        reward: ["ClickerMath.GameState.profData.gain += 5"],
        infoText: "Professor makes five more X per second!"
      },

      profGainPlus7: {
        price: 10000,
        keyGroup: "helper",
        key: "professorUpgrade",
        requirements: ["this.normalTaskData.solved >= 17"],
        reward: ["ClickerMath.GameState.profData.gain += 5"],
        infoText: "Each professor makes five more X per second!"
      },

      xFarmGainPlus: {
        price: 1000,
        keyGroup: "helper",
        key: "xFarmUpgrade",
        requirements: ["this.easyTaskData.solved >= 1"],
        reward: ["ClickerMath.GameState.xFarmData.gain += 5"],
        infoText: "xFarm makes five more X per second."
      },   

      xFarmGainPlus1: {
        price: 5000,
        keyGroup: "helper",
        key: "xFarmUpgrade",
        requirements: ["this.normalTaskData.solved >= 1"],
        reward: ["ClickerMath.GameState.xFarmData.gain += 5"],
        infoText: "xFarm makes five more X per second."
      },

      xFarmGainPlus2: {
        price: 10000,
        keyGroup: "helper",
        key: "xFarmUpgrade",
        requirements: ["this.hardTaskData.solved >= 1"],
        reward: ["ClickerMath.GameState.xFarmData.gain += 5"],
        infoText: "xFarm makes five more X per second."
      },  

      xFarmGainPlus3: {
        price: 15000,
        keyGroup: "helper",
        key: "xFarmUpgrade",
        requirements: ["this.asianTaskData.solved >= 1"],
        reward: ["ClickerMath.GameState.xFarmData.gain += 5"],
        infoText: "xFarm makes five more X per second."
      },   

      xFarmGainPlus4: {
        price: 15000,
        keyGroup: "helper",
        key: "xFarmUpgrade",
        requirements: ["this.asianTaskData.solved >= 5"],
        reward: ["ClickerMath.GameState.xFarmData.gain *= 2"],
        infoText: "Doubles xFarm Gain."
      },  

      xFarmGainPlus5: {
        price: 15000,
        keyGroup: "helper",
        key: "xFarmUpgrade",
        requirements: ["this.asianTaskData.solved >= 7"],
        reward: ["ClickerMath.GameState.xFarmData.gain *= 2"],
        infoText: "Doubles xFarm Gain."
      },    

      xFarmGainPlus6: {
        price: 15000,
        keyGroup: "helper",
        key: "xFarmUpgrade",
        requirements: ["this.asianTaskData.solved >= 10"],
        reward: ["ClickerMath.GameState.xFarmData.gain *= 2"],
        infoText: "Doubles xFarm Gain."
      },    

      xFarmGainPlus7: {
        price: 15000,
        keyGroup: "helper",
        key: "xFarmUpgrade",
        requirements: ["this.asianTaskData.solved >= 15"],
        reward: ["ClickerMath.GameState.xFarmData.gain *= 2"],
        infoText: "Doubles xFarm Gain."
      },      
    };
    
    this.guiLineData = {
      lineWidth: 2,
      lineColor: 0x000000,
      lineAlpha: 0.6
    };

    this.xAmountStyle = {
      font: "50px aldrichregular",
      fill: "black"
    };

    this.xIconClickPointStyle = {
      font: "36px aldrichregular",
      fill: "green"
    };

    this.taskTextStyle = {
      font: "40px aldrichregular",
      fill: "black"
    };
    this.taskAnswerTextStyle = {
      font: "26px aldrichregular",
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
    this.helperGroup.name = "Helpers group"

    //create upgrades group
    this.upgradesGroup = this.game.add.group();
    this.upgradesGroup.name = "All upgrades"
    this.createUpgrades();

    //performance
    this.cacheButtonsAsBitMaps = false; 
  },
  //load the game assets before the game starts
  preload: function() {

    //graphics
    this.graphics = this.game.add.graphics(0.0); 
    this.graphics.name = "Graphics"

    //init tasks
    //equation tasks
    // this.easyTasks = this.initTasks("easyEquationTasks");
    // this.normalTasks = this.initTasks("normalEquationTasks");
    // this.hardTasks = this.initTasks("hardEquationTasks");
    // this.asianTasks = this.initTasks("asianEquationTasks");

    //equation tasks
    this.easyTasks = this.initTasks("easyBasicTasks");
    this.normalTasks = this.initTasks("normalBasicTasks");
    this.hardTasks = this.initTasks("hardBasicTasks");
    this.asianTasks = this.initTasks("asianBasicTasks");



    //gameOn for GameComplete function
    this.gameOn = true;
  },
  //executed after everything is loaded
  create: function() {

    //physics for emitters
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.stage.backgroundColor = "#E5EEF7";
    // //create background
    var myBitmap = this.game.add.bitmapData(1280, 800);
    var grd = myBitmap.context.createLinearGradient(0,400, 1280, 400);
    grd.addColorStop(0,"#6AC1D4");
    grd.addColorStop(0.3125,"#D8EEF4");
    grd.addColorStop(0.625,"#6AC1D4");
    grd.addColorStop(0.8125, "#D8EEF4");
    grd.addColorStop(1, "#6AC1D4");
    myBitmap.context.fillStyle = grd;
    myBitmap.context.fillRect(0, 0, 1280, 800);
    this.backgroundSprite = this.game.add.sprite(0, 0, myBitmap);
    this.backgroundSprite.alpha = 0.5;
    this.game.world.sendToBack(this.backgroundSprite);

    //x number now
    this.xAmountText = this.game.add.text(400, 60, this.xData.xNow, this.xAmountStyle);
    this.xAmountText.anchor.setTo(0.5);

    this.xAmountIcon = this.game.add.sprite(this.xAmountText.right + 30, this.xAmountText.y, "xIcon");
    this.xAmountIcon.anchor.setTo(0.5);
    this.xAmountIcon.scale.setTo(0.5);

    //gain number
    this.gainNumberSecondText = this.game.add.text(400, 620, "Gain: " + this.xGainPerSecond + " X/second", this.xIconClickPointStyle);
    this.gainNumberSecondText.anchor.setTo(0.5);

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

    //infoTexts
    this.createInfoTexts();

    //copyright text
    var copyRigthTextStyle = {
      font: "20px aldrichregular",
      fill: "black"
    }
    var text = this.game.add.text(this.game.world.width - 200, 775, '\u00A9' + "Jaakko Kenttä", copyRigthTextStyle);
  },
  update: function() {
    //update current x and total x
    //this.xAmountText.text = Math.floor(this.xData.xNow);
    this.xAmountIcon.x = this.xAmountText.right + 30; 
    this.xAmountText.text = parseInt(this.xData.xNow, 10);
    this.gainNumberSecondText.text = "+" + this.xGainPerSecond + " X/sec"

    if(this.xData.xNow >= 1000000 && this.gameOn){
      this.gameOn = false;
      this.xGainPerSecond = 0;
      this.gameComplete();
    }
  },
  render: function(){
    //this.game.debug.spriteInfo(this.playerTwoTurret, 300, 32);
    //this.game.debug.spriteCoords(this.playerTwoTurret, 300, 150);
    //this.game.debug.spriteBounds(this.playerTwoTurret);
    //this.game.debug.text('Anchor X: ' + this.playerTwoTurret.anchor.x.toFixed(1) + ' Y: ' + this.playerTwoTurret.anchor.y.toFixed(1), 32, 32);
    // this.game.debug.text('Total X: ' + Math.floor(this.totalX), 32, 32, {fill: "red"});
    // this.game.debug.text('Gain Per Second: ' + this.xGainPerSecond, 32, 64, {fill: "red"});
    //var point = new Phaser.Point(x, y);
    //this.game.debug.geom(point, 'rgb(0,255,0)');    
    //this.game.debug.text('Anchor X: ' + this.playerTwoTurret.anchor.x.toFixed(1) + ' Y: ' + this.playerTwoTurret.anchor.y.toFixed(1), 32, 32);
    // this.game.debug.text("Time: " + this.game.time.events.duration.toFixed(0), 32, 90,{fill: "red"});
  },
  createClickableX: function(){
    //clickable x
    this.X = this.game.add.sprite(400, 350, "X");
    this.X.anchor.setTo(0.5);
    this.X.scale.setTo(0.5);
    this.X.inputEnabled = true;
    this.X.input.pixelPerfectClick = true;
    this.X.name = "The X icon";
    var xTween = this.game.add.tween(this.X).from({alpha: 0}, 500, null, true, 0, 0, false)
    xTween.name = "xTween alpha tween";

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

    //tween x
    var tween = this.game.add.tween(this.X.scale).to({x: 0.49, y: 0.49}, 50, null, true, 0, 0, false);
    tween.name = "xIcon clicked tween";
    tween.onComplete.add(function(){
      this.X.scale.setTo(0.5);
      }, this);

    //tween score to pointer
    var xPoint = pointer.x;
    var yPoint = pointer.y;
    var scoreText = this.game.add.text(xPoint, yPoint, "+ " + Math.ceil(this.clickGain), this.xIconClickPointStyle);
    scoreText.name = "xIcon clicked + amount";
    scoreText.anchor.setTo(0.5);
    var tween2 = this.game.add.tween(scoreText).to({alpha: 0},2000, null, true);
    tween2.name = "xIcon clickamount tween from alpha";

    //tween score to somewhere
    var randDirectionX = this.game.rnd.integerInRange(-20, 20);
    var randDirectionY = this.game.rnd.integerInRange(-20, 20);  
    var tween3 = this.game.add.tween(scoreText).to({x: scoreText.x + randDirectionX, y: scoreText.y + randDirectionY }, 2000, Phaser.Easing.Circular.Out, true);
    tween3.onComplete.add(function(){
        scoreText.destroy();
      }, this);
    tween3.name = "xIcon clickamount tween velocity";
  },
  loadGuiLines: function(){
    //gui lines
    this.graphics.beginFill();
    this.graphics.lineStyle(this.guiLineData.lineWidth, this.guiLineData.lineColor, this.guiLineData.lineAlpha);

    // //divide the game area and store and upgrade
    // this.graphics.moveTo(800,0);
    // this.graphics.lineTo(800, 800);
    // //store line vertical line
    // this.graphics.moveTo(1040,0);
    // this.graphics.lineTo(1040, 80);
    // //store horizontal line
    // this.graphics.moveTo(800, 80);
    // this.graphics.lineTo(1280, 80);

    // //outherright line
    // this.graphics.moveTo(1280, 0);
    // this.graphics.lineTo(1280, 800);

    // //bottomline
    // this.graphics.moveTo(1280, 800);
    // this.graphics.lineTo(0, 800);

    // //left line
    // this.graphics.moveTo(0, 800);
    // this.graphics.lineTo(0, 0);

    // //upline
    // this.graphics.moveTo(0, 0);
    // this.graphics.lineTo(1280, 0);


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
    this.openStoreButton.lineStyle(2, 0x000000, 0.6);            
    this.openStoreButton.beginFill(0x00FF00, 0.8);            
    this.openStoreButton.drawRoundedRect(800, 0, 240, 80, 5);                      
    this.openStoreButton.endFill();   
    //store Text
    this.storeText = this.game.add.text(920, 40, "Store", storeHeadLineStyle);
    this.storeText.name = "STORE text";
    this.storeText.anchor.setTo(0.5);     
    this.storeText.alpha = 1;    
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
    this.openUpgradeButton.drawRoundedRect(1040, 0, 240, 80, 5);                      
    this.openUpgradeButton.endFill();   
    //upgradetext Text
    this.UpgradeText = this.game.add.text(1160, 40, "Upgrades", storeHeadLineStyle);
    this.UpgradeText.name = "UPGRADE - text";
    this.UpgradeText.anchor.setTo(0.5);
    this.UpgradeText.alpha = 1;           
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



    //buttons for tasks
    this.storeAreaGroup = this.game.add.group();
    this.storeAreaGroup.name = "StoreButtons Group";

    var eqBtnData = {
      buttonTop: 140,
      buttonHeight: 80,
      easyButtonColor: 0xD7E5F3,
      normalButtonColor:0xC0D7EC,
      hardButtonColor:0x9CC1E1,
      asianButtonColor:0x649DD1
    }

    //TASK TEXTS
    // this.easyTaskText = this.game.add.text();
    this.easyTaskPriceIcon;
    if(!this.easyTaskData.priceText){this.easyTaskData.priceText = this.game.add.text()}
    if(!this.easyTaskData.solvedAmountText){this.easyTaskData.solvedAmountText = this.game.add.text()}
    if(!this.easyTaskData.rewardText){this.easyTaskData.rewardText = this.game.add.text()}
    if(!this.easyTaskData.icon){this.easyTaskData.icon = this.game.add.sprite(null, null, "easy")}
    this.easyTaskData.priceText.visible = true;
    this.easyTaskData.solvedAmountText.visible = true;
    this.easyTaskData.rewardText.visible = true;
    this.easyTaskData.icon.visible = true;
    this.createTaskArea(this.easyTaskData, this.easyTaskPriceIcon, 945, 160, 850, 175, 980, "Easy");
    

    this.normalTaskPriceIcon;
    if(!this.normalTaskData.priceText){this.normalTaskData.priceText = this.game.add.text()}
    if(!this.normalTaskData.solvedAmountText){this.normalTaskData.solvedAmountText = this.game.add.text()}
    if(!this.normalTaskData.rewardText){this.normalTaskData.rewardText = this.game.add.text()}
    if(!this.normalTaskData.icon){this.normalTaskData.icon = this.game.add.sprite(null, null, "normal")}
    this.normalTaskData.priceText.visible = true;
    this.normalTaskData.solvedAmountText.visible = true;
    this.normalTaskData.rewardText.visible = true;
    this.normalTaskData.icon.visible = true;
    this.createTaskArea(this.normalTaskData, this.normalTaskPriceIcon, 962, 240, 850, 255, 980, "Normal");
    

    this.hardTaskPriceIcon;
    if(!this.hardTaskData.priceText){this.hardTaskData.priceText = this.game.add.text()}
    if(!this.hardTaskData.solvedAmountText){this.hardTaskData.solvedAmountText = this.game.add.text()}
    if(!this.hardTaskData.rewardText){this.hardTaskData.rewardText = this.game.add.text()}
    if(!this.hardTaskData.icon){this.hardTaskData.icon = this.game.add.sprite(null, null, "hard")}
    this.hardTaskData.priceText.visible = true;
    this.hardTaskData.solvedAmountText.visible = true;
    this.hardTaskData.rewardText.visible = true;
    this.hardTaskData.icon.visible = true;
    this.createTaskArea(this.hardTaskData, this.hardTaskPriceIcon, 945, 320, 850, 340, 980, "Hard");
    
    
    this.asianTaskPriceIcon;
    if(!this.asianTaskData.priceText){this.asianTaskData.priceText = this.game.add.text()}
    if(!this.asianTaskData.solvedAmountText){this.asianTaskData.solvedAmountText = this.game.add.text()}
    if(!this.asianTaskData.rewardText){this.asianTaskData.rewardText = this.game.add.text()}
    if(!this.asianTaskData.icon){this.asianTaskData.icon = this.game.add.sprite(null, null, "asian")}
    this.asianTaskData.priceText.visible = true;
    this.asianTaskData.solvedAmountText.visible = true;
    this.asianTaskData.rewardText.visible = true;
    this.asianTaskData.icon.visible = true;
    this.createTaskArea(this.asianTaskData, this.asianTaskPriceIcon, 945, 400, 850, 420, 980, "Asian");
    

    //HELPERS TEXT & ICONS
    this.buyStudentText;
    this.studentPriceIcon;
    if(!this.studentData.amountText){this.studentData.amountText = this.game.add.text();}
    if(!this.studentData.priceText){this.studentData.priceText = this.game.add.text();}
    this.studentData.amountText.visible = true;
    this.studentData.priceText.visible = true;
    this.createHelperText(this.studentData, this.buyStudentText, this.studentPriceIcon, this.storeAreaGroup, 800, 550 + 75 * 0, "Student", 1000, 580 + 74 * 0, 850, 565);
    
    this.buyProfessorText;
    this.professorPriceIcon;
    if(!this.profData.amountText){this.profData.amountText = this.game.add.text();}
    if(!this.profData.priceText){this.profData.priceText = this.game.add.text();}
    this.profData.amountText.visible = true;
    this.profData.priceText.visible = true;
    this.createHelperText(this.profData, this.buyProfessorText, this.professorPriceIcon, this.storeAreaGroup, 800 + 15, 550 + 75 * 1, "Professor", 1000, 580 + 74 * 1, 850, 635);
    
    this.buyXFarmText;
    this.xFarmPriceIcon;
    if(!this.xFarmData.amountText){this.xFarmData.amountText = this.game.add.text();}
    if(!this.xFarmData.priceText){this.xFarmData.priceText = this.game.add.text();}
    this.xFarmData.amountText.visible = true;
    this.xFarmData.priceText.visible = true;
    this.createHelperText(this.xFarmData, this.buyXFarmText, this.xFarmPriceIcon, this.storeAreaGroup, 800 - 15, 550 + 75 * 2, "xFarm", 1000, 580 + 74 * 2, 850, 705);

    //
    //taskbuttons
    //
    //create group for buttons to display top
    this.easyTaskButton = this.game.add.graphics(0, 0);
    this.easyTaskButton.data.available = this.easyTaskData.available;
    this.easyTaskButton.name = "easy Task Button"

    // this.storeAreaGroup.add(this.easyTaskButton);
    this.createStoreButton(this.easyTaskButton, eqBtnData.easyButtonColor, eqBtnData.buttonTop, eqBtnData.buttonHeight, "taskButton");
    // this.easyTaskButton.cacheAsBitmap = true;
    
    this.normalTaskButton = this.game.add.graphics(0, 0);
    this.normalTaskButton.data.available = this.normalTaskData.available;
    this.normalTaskButton.name = "normal Task Button"
    // this.storeAreaGroup.add(this.normalTaskButton);
    this.createStoreButton(this.normalTaskButton, eqBtnData.normalButtonColor, eqBtnData.buttonTop + eqBtnData.buttonHeight * 1, eqBtnData.buttonHeight, "taskButton");
    
    this.hardTaskButton = this.game.add.graphics(0, 0); 
    this.hardTaskButton.data.available = this.hardTaskData.available;       
    this.hardTaskButton.name = "hard Task Button"  
    // this.storeAreaGroup.add(this.hardTaskButton);        
    this.createStoreButton(this.hardTaskButton, eqBtnData.hardButtonColor, eqBtnData.buttonTop + eqBtnData.buttonHeight * 2, eqBtnData.buttonHeight, "taskButton");          
    
    this.asianTaskButton = this.game.add.graphics(0, 0);
    this.asianTaskButton.data.available = this.asianTaskData.available;
    this.asianTaskButton.name = "asian Task Button"
    // this.storeAreaGroup.add(this.asianTaskButton);
    this.createStoreButton(this.asianTaskButton, eqBtnData.asianButtonColor, eqBtnData.buttonTop + eqBtnData.buttonHeight * 3, eqBtnData.buttonHeight, "taskButton");


    //HELPER BUTTONS
    var hlBtnData = {
      buttonTop: 530,
      buttonHeight: 70
    };

    this.studentHelperButton = this.game.add.graphics(0, 0);
    // this.storeAreaGroup.add(this.studentHelperButton);
    this.createStoreButton(this.studentHelperButton, 0xD7E5F3, hlBtnData.buttonTop + hlBtnData.buttonHeight * 0, hlBtnData.buttonHeight, "helperButton");
    
    this.profHelperButton = this.game.add.graphics(0, 0);
    // this.storeAreaGroup.add(this.profHelperButton);
    this.createStoreButton(this.profHelperButton, 0x9CC1E1, hlBtnData.buttonTop + hlBtnData.buttonHeight * 1, hlBtnData.buttonHeight, "helperButton");
    
    this.xFarmHelperButton = this.game.add.graphics(0, 0);
    // this.storeAreaGroup.add(this.xFarmHelperButton);
    this.createStoreButton(this.xFarmHelperButton, 0x649DD1, hlBtnData.buttonTop + hlBtnData.buttonHeight * 2, hlBtnData.buttonHeight, "helperButton");
  

    //TEXTS AND ICONS
    var taskTextStyle = {
      font: "20px aldrichregular",
      fill: "black"
    };
    var priceTextStyle = {
      font: "22px aldrichregular",
      fill: "black"
    }; 

    var buyTaskTextStyle = {
      font: "bold 34px aldrichregular",
      fill: "black"
      
    };

    //INFOTEXTS
    this.buyTaskText = this.game.add.text(1040, 110, "Buy Equations", buyTaskTextStyle);
    this.buyTaskText.name = "Buy Equations - text";
    this.buyTaskText.anchor.setTo(0.5);
    this.buyTaskText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
    this.storeAreaGroup.add(this.buyTaskText);

    this.buyHelpersText = this.game.add.text(1040, 495, "Buy Helpers", buyTaskTextStyle);
    this.buyHelpersText.anchor.setTo(0.5);
    this.buyHelpersText.name = "Buy Helpers - text";
    this.buyHelpersText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
    this.storeAreaGroup.add(this.buyHelpersText);

    
    this.game.world.bringToTop(this.easyTaskData.icon);
    this.game.world.bringToTop(this.easyTaskData.priceText);
    this.game.world.bringToTop(this.easyTaskData.rewardText);
    this.game.world.bringToTop(this.easyTaskData.rewardText);
    this.game.world.bringToTop(this.easyTaskData.solvedAmountText);

    this.game.world.bringToTop(this.normalTaskData.icon);
    this.game.world.bringToTop(this.normalTaskData.priceText);
    this.game.world.bringToTop(this.normalTaskData.rewardText);
    this.game.world.bringToTop(this.normalTaskData.rewardText);
    this.game.world.bringToTop(this.normalTaskData.solvedAmountText);

    this.game.world.bringToTop(this.hardTaskData.icon);
    this.game.world.bringToTop(this.hardTaskData.priceText);
    this.game.world.bringToTop(this.hardTaskData.rewardText);
    this.game.world.bringToTop(this.hardTaskData.rewardText);
    this.game.world.bringToTop(this.hardTaskData.solvedAmountText);

    this.game.world.bringToTop(this.asianTaskData.icon);
    this.game.world.bringToTop(this.asianTaskData.priceText);
    this.game.world.bringToTop(this.asianTaskData.rewardText);
    this.game.world.bringToTop(this.asianTaskData.rewardText);
    this.game.world.bringToTop(this.asianTaskData.solvedAmountText);


    this.game.world.bringToTop(this.studentData.amountText);
    this.game.world.bringToTop(this.studentData.priceText);

    this.game.world.bringToTop(this.profData.amountText);
    this.game.world.bringToTop(this.profData.priceText);

    this.game.world.bringToTop(this.xFarmData.amountText);
    this.game.world.bringToTop(this.xFarmData.priceText);

    // this.game.world.bringToTop();

    if(this.cacheButtonsAsBitMaps){
      this.easyTaskButton.cacheAsBitmap = true;
      this.normalTaskButton.cacheAsBitmap = true;
      this.hardTaskButton.cacheAsBitmap = true;
      this.asianTaskButton.cacheAsBitmap = true;
      this.studentHelperButton.cacheAsBitmap = true;
      this.profHelperButton.cacheAsBitmap = true;
      this.xFarmHelperButton.cacheAsBitmap = true;
    }

    this.game.world.bringToTop(this.storeAreaGroup);
  },
  openUpgrades: function(){
    
    this.upgradesGroup.visible = true;

    //store open false
    this.storeOpen = false;

    //clear previous opener
    this.storeAreaGroup.destroy(true);
    this.easyTaskButton.destroy();
    this.normalTaskButton.destroy();
    this.hardTaskButton.destroy();
    this.asianTaskButton.destroy();
    this.studentHelperButton.destroy();
    this.profHelperButton.destroy();
    this.xFarmHelperButton.destroy();

    this.easyTaskData.priceText.visible = false;
    this.easyTaskData.solvedAmountText.visible = false;
    this.easyTaskData.rewardText.visible = false;
    this.easyTaskData.icon.visible = false;

    this.normalTaskData.priceText.visible = false;
    this.normalTaskData.solvedAmountText.visible = false;
    this.normalTaskData.rewardText.visible = false;
    this.normalTaskData.icon.visible = false;

    this.hardTaskData.priceText.visible = false;
    this.hardTaskData.solvedAmountText.visible = false;
    this.hardTaskData.rewardText.visible = false;
    this.hardTaskData.icon.visible = false;

    this.asianTaskData.priceText.visible = false;
    this.asianTaskData.solvedAmountText.visible = false;
    this.asianTaskData.rewardText.visible = false;
    this.asianTaskData.icon.visible = false;

    this.studentData.amountText.visible = false;
    this.studentData.priceText.visible = false;
    this.profData.amountText.visible = false;
    this.profData.priceText.visible = false;
    this.xFarmData.amountText.visible = false;
    this.xFarmData.priceText.visible = false;

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
          // console.log(requirementsArr[i]);
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
      if(coords.length > 0){
        var pos = coords.shift();
        child.drawUpgrade(pos[0], pos[1]);
        child.alive = true;
      }
      else{
        break;
      }
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
      task = this.normalTasks[Math.floor(Math.random() * this.normalTasks.length)];
      taskData = this.normalTaskData;
    }
    else if(button == this.hardTaskButton){
      task = this.hardTasks[Math.floor(Math.random() * this.hardTasks.length)];
      taskData = this.hardTaskData;
    }
    else if(button == this.asianTaskButton){
      task = this.asianTasks[Math.floor(Math.random() * this.asianTasks.length)];
      taskData = this.asianTaskData;
    }  
    //check if enough money
    if(taskData.price <= this.xData.xNow){
      //reward rize
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
      this.helperGroup.add(sprite);
      sprite.name = "Helper on board";
      sprite.anchor.setTo(0.5);
      sprite.scale.setTo(helper.iconScale.x * 0.5, helper.iconScale.y * 0.5);

      //tween sprite to own area
      var tween = this.game.add.tween(sprite).from({y: 800, x: x}, 2000, null, true);

      tween.onComplete.add(function(){
        //change emitter rate
        //flow( [lifespan] [, frequency] [, quantity] [, total] [, immediate])
        helper.emitter.flow(2000, 2000, helper.amount * helper.gain /10, -1);
        sprite.cacheAsBitmap = true;
      }, this);
    }
    else{
      this.tweenTint(button, button.graphicsData[0].fillColor, 0xff0000, 100);
    }
  },
  updateGainPerSeconds: function(){
    if(this.gameOn){
      this.xGainPerSecond = this.studentData.amount * this.studentData.gain;
      this.xGainPerSecond += this.profData.amount * this.profData.gain;
      this.xGainPerSecond += this.xFarmData.amount * this.xFarmData.gain;
    }
  },
  createStoreButton: function(button, buttonColor, buttonTop, buttonHeight, buttonHandler){
    var buttonFinalColor;
    var buttonAlpha = 1;

    button.lineStyle(2, 0x000000, 0.6);            
    button.beginFill(buttonColor, buttonAlpha);            
    button.drawRoundedRect(800, buttonTop, 480, buttonHeight, 10);                      
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

    button.events.onDestroy.add(function(){
      button.clear();
    }, this);
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
    this.storeAreaGroup.add(iconSprite);

    text = this.game.add.text(textX + 175, textY, key, taskTextStyle);
    text.anchor.setTo(0.5);
    this.storeAreaGroup.add(text);

    //price
    data.priceText.setStyle(priceTextStyle);
    data.priceText.x = priceX; 
    data.priceText.y = priceY;
    data.priceText.setText(data.price);
    data.priceText.anchor.setTo(0.5);

    //icon
    Icon = this.game.add.sprite(data.priceText.right + 20, data.priceText.y, "xIcon");
    Icon.anchor.setTo(0.5);
    Icon.scale.setTo(0.3);
    this.storeAreaGroup.add(Icon);

    //X Gain
    var gainText = this.game.add.text(1150, text.y, "XGAIN", gainTextStyle);
    gainText.anchor.setTo(0.5);
    this.storeAreaGroup.add(gainText);

    var gainAmountText = this.game.add.text(gainText.x + 30, gainText.y + 30,"+"+ Math.round(data.gain * 100)/100 + "  X/second", gainTextStyle);
    gainAmountText.anchor.setTo(0.5);
    this.storeAreaGroup.add(gainAmountText);

    //amount text
    data.amountText.x = iconSprite.x + 50;
    data.amountText.y = iconSprite.y + 20;
    data.amountText.setText("#" + data.amount, true);
    data.amountText.anchor.setTo(0.5);
    data.amountText.setStyle(gainTextStyle);
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
    // this.storeAreaGroup.add(data.priceText);

    //icon
    // Icon = this.game.add.sprite(IconX, IconY, data.iconKey);
    data.icon.x = IconX;
    data.icon.y = IconY;
    data.icon.anchor.setTo(0.5);
    data.icon.scale.setTo(1.3);
    // this.storeAreaGroup.add(Icon);


    //task price
    var priceText = this.game.add.text(priceX, data.priceText.y + 30, data.price, priceTextStyle);
    priceText.anchor.setTo(0.5); 
    this.storeAreaGroup.add(priceText);

    //price icon
    priceIcon = this.game.add.sprite(priceText.right + 20, priceText.y, "xIcon");
    priceIcon.anchor.setTo(0.5);
    priceIcon.scale.setTo(0.3);
    this.storeAreaGroup.add(priceIcon); 

    //reward text
    var rewardText = this.game.add.text(1150, data.priceText.y, "Reward", rewardTextStyle);
    rewardText.anchor.setTo(0.5);
    this.storeAreaGroup.add(rewardText);

    //rewardAMount
    data.rewardText.x = rewardText.x + 20;
    data.rewardText.y = rewardText.y + 30;
    data.rewardText.setText(data.reward);
    data.rewardText.setStyle(rewardTextStyle);
    data.rewardText.anchor.setTo(0.5);
    // this.storeAreaGroup.add(data.rewardText);

    //solved amount text
    data.solvedAmountText.x = IconX + 50;
    data.solvedAmountText.y = IconY + 20;
    data.solvedAmountText.setText("#" + data.solved, true);
    data.solvedAmountText.anchor.setTo(0.5);
    data.solvedAmountText.setStyle(rewardTextStyle);
    // this.storeAreaGroup.add(data.solvedAmountText);

    //reward icon
    var rewardIcon = this.game.add.sprite(data.rewardText.right + 20, data.rewardText.y, "xIcon");
    rewardIcon.anchor.setTo(0.5);    
    rewardIcon.scale.setTo(0.3);  
    this.storeAreaGroup.add(rewardIcon);

    //create this if button is not purchased
    if(!data.available){
        var availableTextStyle = {
        font: "bold 35px aldrichregular",
        fill: "red"
        };

      var notAvailableText = this.game.add.text(IconX + 200, IconY, "Not available!", availableTextStyle);
      notAvailableText.anchor.setTo(0.5);
      notAvailableText.angle = 5;
      this.storeAreaGroup.add(notAvailableText);

      //set alphas
      data.priceText.alpha = 0.2;
      // Icon.alpha = 0.2;
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
      // Icon.alpha = 1;
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
    var xWidth = 220;
    var yWidth = 100;
    var xTopLeft = 170;
    var yTopLeft = 300;

    for (var i = 0; i <=2 ; i++){  
      for(var j = 0; j <=2 ; j ++){ 
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
    var emitter;

    if(text.text === taskCorrectAnswer){

      answerCorrect = true;
      
      taskData.solved += 1;
      taskData.solvedAmountText.setText("#" + taskData.solved, true);
      textStyle.fill = "green";
      text = "Correct!";   
      emitter = this.game.add.emitter(400, 250, 100)
      emitter.name = "Correct Answer Emitter";
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
      text = "Wrong!";
    }
    //tweening tweening tweening
    var text = this.game.add.text(400, 300, text, textStyle);
    text.anchor.setTo(0.5);

    var textTween = this.game.add.tween(text).from({alpha: 0}, 2800, null, true, 0, 0, false);
    var textTweenRotate = this.game.add.tween(text).from({angle: 980}, 750, null, true, 0, 0, false)
    textTweenRotate.onComplete.add(function(){
      //create rewards tweening towards xIconAmount
      
      //flow( [lifespan] [, frequency] [, quantity] [, total] [, immediate])
      if(answerCorrect){
        emitter.flow(750, 150, 5, 50, false);
        //add reward
        this.xRizeTween(taskData.reward, 1200)
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
    this.game.time.events.add(Phaser.Timer.SECOND * 3, function(){
      //can buy now more tasks and creates the X again
      if(this.gameOn){
        this.createClickableX();
        this.taskInitialized = false;
        if(emitter){emitter.destroy();}
      }
    }, this); 
  },
  initTaskToGame: function(task, taskData, taskGroup, textGroup){

    //create task text 
    var parsedTaskText = this.parseText(task["task"]);
    var taskText = this.game.add.text(400, 200, parsedTaskText, this.taskTextStyle);
    taskText.anchor.setTo(0.5);
    textGroup.add(taskText);
    //create task answers
    var answers = [];
    var taskCorrectAnswer = this.parseText(task["answer"]);
    answers.push(taskCorrectAnswer);
    for(var i = 1; i <= 8 ; i++){
      answers.push(this.parseText(task["wrongAnswer" + i]));
    }

    for(var j = 1; j <= 9 ; j ++){
      //set the task coords and text
      var coords = this.answerCoords.pop();
      var answerText = answers.pop();
      var text = this.game.add.text(coords[0] + 15, coords[1] + 5, answerText, this.taskAnswerTextStyle);
      text.anchor.setTo(0.5);
      textGroup.add(text);

      //task answers input
      var answerButton = this.add.graphics(0, 0); 
      taskGroup.add(answerButton);
      answerButton.lineStyle(1.5, 0x000000, 0.5);            
      answerButton.beginFill(this.taskAnswerBtn.fillColor, 1);            
      answerButton.drawRect(coords[0] - 80, coords[1] - 20, 190, 50);                      
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
  },
  consoleWorldChildren: function(){
    var len = this.game.world.children.length;
    for(var i = 0 ; i < len ; i ++){
      console.log(this.game.world.children[i].name);
    }
  },
  cacheButtonsAsBitMap: function(){
    this.cacheButtonsAsBitMaps = !this.cacheButtonsAsBitMaps
    this.easyTaskButton.cacheAsBitmap = true;
    this.normalTaskButton.cacheAsBitmap = true;
    this.hardTaskButton.cacheAsBitmap = true;
    this.asianTaskButton.cacheAsBitmap = true;
    this.studentHelperButton.cacheAsBitmap = true;
    this.profHelperButton.cacheAsBitmap = true;
    this.xFarmHelperButton.cacheAsBitmap = true;
  },
  gameComplete: function(){
    console.log("Game Complete");

    //remove storearea
    this.helperGroup.destroy();
    this.storeAreaGroup.destroy();
    this.graphics.destroy();
    this.gainNumberSecondText.destroy();
    this.X.destroy();
    this.openStoreButton.destroy();
    this.openUpgradeButton.destroy();
    this.studentData.emitter.destroy();
    this.profData.emitter.destroy();
    this.xFarmData.emitter.destroy();
    this.storeText.destroy();
    this.UpgradeText.destroy();
    this.easyTaskButton.destroy();
    this.normalTaskButton.destroy();
    this.hardTaskButton.destroy();
    this.asianTaskButton.destroy();
    this.studentHelperButton.destroy();
    this.profHelperButton.destroy();
    this.xFarmHelperButton.destroy();
    this.easyTaskData.priceText.destroy();
    this.easyTaskData.solvedAmountText.destroy();
    this.easyTaskData.rewardText.destroy();
    this.easyTaskData.icon.destroy();
    this.normalTaskData.priceText.destroy();
    this.normalTaskData.solvedAmountText.destroy();
    this.normalTaskData.rewardText.destroy();
    this.normalTaskData.icon.destroy();
    this.hardTaskData.priceText.destroy();
    this.hardTaskData.solvedAmountText.destroy();
    this.hardTaskData.rewardText.destroy();
    this.hardTaskData.icon.destroy();
    this.asianTaskData.priceText.destroy();
    this.asianTaskData.solvedAmountText.destroy();
    this.asianTaskData.rewardText.destroy();
    this.asianTaskData.icon.destroy();
    this.studentData.amountText.destroy();
    this.studentData.priceText.destroy();
    this.profData.amountText.destroy();
    this.profData.priceText.destroy();
    this.xFarmData.amountText.destroy();
    this.xFarmData.priceText.destroy();
    this.xAmountIcon.destroy();

    var complimentTextStyle = {
      font: "50px aldrichregular",
      fill: "black"
    }

    var complimentText = this.game.add.text(640, 250, "", complimentTextStyle);
    complimentText.anchor.setTo(0.5);
    var timeText = this.game.add.text(640, 350, "", complimentTextStyle);
    timeText.anchor.setTo(0.5);
    var totalX = this.game.add.text(640, 450, "", complimentTextStyle);
    totalX.anchor.setTo(0.5);
    //powered by autoclicker text if solved tasks amount are all under 3
    if(this.easyTaskData.solved > 4){
      complimentText.text = "You made it!"
      var timeSeconds = this.game.time.totalElapsedSeconds();
      var minutes = Math.floor(timeSeconds/60);
      var seconds = Math.round(timeSeconds - minutes * 60);
      timeText.text = "Time " + minutes + " minutes and " + seconds + " seconds";
      totalX.text = "Collected total " + Math.round(this.totalX);
    }
    else{
      
      complimentText.text = "<3 Powered by AutoClicker <3";

    }

    //create stats screen
    var statsScreen = this.game.add.graphics(0, 0);
    statsScreen.lineStyle(2, 0x000000, 0.4);            
    statsScreen.beginFill(0x83B1DA, 1);            
    statsScreen.drawRoundedRect(100, 100, 1080, 600, 20);                      
    statsScreen.endFill(); 
    statsScreen.alpha = 0.8;

    this.game.world.bringToTop(complimentText);
    this.game.world.bringToTop(timeText);
    this.game.world.bringToTop(totalX);

    //create emitter flow for x points
    //tween text to down first
    //to(properties [, duration] [, ease] [, autoStart] [, delay] [, repeat] [, yoyo])
    var tween = this.game.add.tween(this.xAmountText).to({x: 1280/2, y: 60}, 1000, null, true, 0);

    tween.onComplete.add(function(){
      this.xRizeTween(-1000000, 10000000);
      var emitter = this.game.add.emitter(640, 100, 1000);
      emitter.makeParticles('xIcon');
      emitter.setScale(0.2, 0.4, 0.2, 0.4, 0, null, true);
      emitter.setAlpha(0.1, 0.3, 0, null, true);
      emitter.setXSpeed(-100, 100);
      emitter.setYSpeed(80, 200);
      emitter.width = 200;
      //flow( [lifespan] [, frequency] [, quantity] [, total] [, immediate])
      emitter.flow(4000, 100, 2, 1000000, false);
    }, this);
  },
  createInfoTexts: function(){
    var infoTextGroup = this.game.add.group();
    //infotext
    var infoTextStyle = {
      font: "40px aldrichregular",
      fill: "black",
      align: "center"
    };
    var infoText = this.game.add.text(400, 700, "Collect 1 000 000 points. \n Please.", infoTextStyle);
    infoText.anchor.setTo(0.5);
    infoTextGroup.add(infoText);

    // var clickMeText = this.game.add.text(400, 330, "Click Me!", infoTextStyle);
    // clickMeText.anchor.setTo(0.5);
    // clickMeText.fill = "red";
    // infoTextGroup.add(clickMeText);

    var tween = this.game.add.tween(infoText).to({alpha: 0}, 8000, Phaser.Easing.Quadratic.In, true, 0, 0, false);
    tween.onComplete.add(function(){
      infoTextGroup.destroy();
    }, this);
  },
  parseText: function(text){

    while(text.includes("+-") ||text.includes(">=") || text.includes("1/4") || text.includes("2/3") || text.includes("1/5") || text.includes("1/3") ||text.includes("^2") || text.includes("*") || text.includes("^0") || text.includes("^3") || text.includes("^1") || text.includes("^5") || text.includes("^4") || text.includes("^6") || text.includes("1/2")){
      //change ^2- sign to corresponding unicode character \u{00B2}
        if(text.includes("^2")){
          var index = text.indexOf("^2");
          text = text.slice(0, index) + '\u{00B2}' + text.slice(index + 2)
        }
        //convert * marks to \u{22C5}
        if(text.includes("*")){
          var index = text.indexOf("*");
          text = text.slice(0, index) + '\u{22C5}' + text.slice(index + 1);
        }
        //converts ^0 - marks to \u{2070}
        if(text.includes("^0")){
          var index = text.indexOf("^0");
          text = text.slice(0, index) + '\u{2070}' + text.slice(index + 2)
        }
        //converts ^0 - marks to \u{00B3}
        if(text.includes("^3")){
          var index = text.indexOf("^3");
          text = text.slice(0, index) + '\u{00B3}' + text.slice(index + 2)
        }
        //converts ^4 marks to \u{2074}
        if(text.includes("^4")){
          var index = text.indexOf("^4");
          text = text.slice(0, index) + '\u{2074}' + text.slice(index + 2)
        }
        //converts ^4 marks to \u{2074}
        if(text.includes("^6")){
          var index = text.indexOf("^6");
          text = text.slice(0, index) + '\u{2076}' + text.slice(index + 2)
        }
        //converts ^1 marks to \u{2081}
        if(text.includes("^1")){
          var index = text.indexOf("^1");
          text = text.slice(0, index) + '\u{00B9}' + text.slice(index + 2)
        }
        //converts ^5 marks to \u{2085}
        if(text.includes("^5")){
          var index = text.indexOf("^5");
          text = text.slice(0, index) + '\u{2075}' + text.slice(index + 2)
        }  

        if(text.includes("1/2")){
          var index = text.indexOf("1/2");
          text = text.slice(0, index) + '\u{00BD}' + text.slice(index + 3)
        }   
        if(text.includes("1/3")){
          var index = text.indexOf("1/3");
          text = text.slice(0, index) + '\u{2153}' + text.slice(index + 3)
        }    
        if(text.includes("1/5")){
          var index = text.indexOf("1/5");
          text = text.slice(0, index) + '\u{2155}' + text.slice(index + 3)
        }      
        if(text.includes("2/3")){
          var index = text.indexOf("2/3");
          text = text.slice(0, index) + '\u{2154}' + text.slice(index + 3)
        }   
        if(text.includes("1/4")){
          var index = text.indexOf("1/4");
          text = text.slice(0, index) + '\u{00BC}' + text.slice(index + 3)
        }   
        if(text.includes(">=")){
          var index = text.indexOf(">=");
          text = text.slice(0, index) + '\u{2265}' + text.slice(index + 2)
        }  
        if(text.includes("+-")){
          var index = text.indexOf("+-");
          text = text.slice(0, index) + '\u{00B1}' + text.slice(index + 2)
        }
      }

    return text;
  }

};
