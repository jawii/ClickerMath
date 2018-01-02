var ClickerMath = ClickerMath || {};

ClickerMath.Upgrade = function(state, x, y, data){

	//nulls: x, y, key
	Phaser.Sprite.call(this, state.game, -10, -10, data.key);

	this.data = data;
	this.game = state.game;

	//console.log(data);
	this.guideText = this.game.add.text();
    this.graphics = this.game.add.graphics(0, 0);
    this.infoScreen = this.game.add.graphics(0, 0);
    this.infoText = this.game.add.text();
    this.priceText = this.game.add.text();
    this.priceIcon = this.game.add.sprite();

	
	//set visibily zero at start
	this.width = 60;
	this.height = 60;

	this.infoTextStyle = {
		font: "16px aldrichregular",
      	fill: "black",
      	align: "center",
      	wordWrap: "true",
      	wordWrapWidth: this.width + 80
	}

    this.reset();

};

ClickerMath.Upgrade.prototype = Object.create(Phaser.Sprite.prototype);
ClickerMath.Upgrade.prototype.constructor = ClickerMath.Upgrade;


ClickerMath.Upgrade.prototype.reset = function(x, y, data) {

	//null is max health
	Phaser.Sprite.prototype.reset.call(this, x, y, null);
	this.visible = false;
	this.alive = false;
	

};


ClickerMath.Upgrade.prototype.drawUpgrade = function(x, y) {

	this.visible = true;
	this.x = x;
	this.y = y;
	//console.log(this.data);

	//console.log(this.graphics);
	//move icon to topleft
	this.anchor.setTo(0.5);

	// //scale the helper icons
	// if(this.data.keyGroup === "helper"){
	// 	this.scale.setTo(0.5);
	// 	this.anchor.setTo(1.4, 1.1)
	// }

	//graphics
	this.graphics.lineStyle(2, 0x000000, 0.4);            
    this.graphics.beginFill(0x83B1DA, 1);            
    this.graphics.drawRect(this.left - 20, this.top - 10, this.width + 40, 120);                      
    this.graphics.endFill(); 
    this.graphics.inputEnabled = true;  
    this.graphics.events.onInputDown.add(this.buttonPress, this);
    this.graphics.events.onInputOver.add(this.buttonHover, this);
    this.graphics.events.onInputOut.add(this.buttonOver, this);

	//price text
	var priceTextStyle = {
		font: "14px aldrichregular",
      	fill: "black"
	}
	this.priceText.x = this.x - 10;
	this.priceText.y = this.bottom + 25;
	this.priceText.text = this.data.price;
	this.priceText.anchor.setTo(0.5);
	this.priceText.width = Math.min(this.priceText.width, 55);

	this.priceIcon.x = this.priceText.right + 15;
	this.priceIcon.y = this.priceText.y - 2;
	this.priceIcon.loadTexture("xIcon");
	this.priceIcon.anchor.setTo(0.5);
	this.priceIcon.scale.setTo(0.35);	
	this.priceIcon.visible = true;

	//load texture
	this.loadTexture(this.data.key);
};

ClickerMath.Upgrade.prototype.kill = function(){
	this.graphics.clear();
	this.infoScreen.clear();
	this.priceText.text = "";
	this.priceIcon.text = "";
	this.infoText.text = "";
	this.priceIcon.visible = false;
	// Phaser.Sprite.prototype.kill.call(this);
	Phaser.Sprite.prototype.reset.call(this);
	// console.log(this);
}

ClickerMath.Upgrade.prototype.buttonPress = function(button) {


	if(ClickerMath.GameState.xData.xNow > this.data.price){
		
		//tween the x amount 
		ClickerMath.GameState.xRizeTween(-this.data.price, 1000);
		var len = this.data.reward.length;
		for(var i = 0 ; i < len  ; i ++){
			eval(this.data.reward[i]);
		}
		//update gain per secons
		ClickerMath.GameState.updateGainPerSeconds();

		this.destroy();
	}	
};
ClickerMath.Upgrade.prototype.buttonHover = function(button) {
	button.tint = 0.5 * 0xffffff;

	

	//add the info screen about the upgrade
	this.alpha = 0.1;
	this.graphics.alpha = 0.1;
	this.priceText.alpha = 0.1;
	this.priceIcon.alpha = 0.1;

	// this.infoText.visible = true;
	this.infoScreen.reset(0, 0);
	this.infoScreen.lineStyle(2, 0x000000, 0.4);            
    this.infoScreen.beginFill(0x83B1DA, 1);            
    this.infoScreen.drawRect(this.left - 50, this.top - 10, this.width + 100, 120);                      
    this.infoScreen.endFill(); 
    this.infoScreen.alpha = 0.5;

    //create infotext
    this.infoText.reset();
    this.infoText.x = this.centerX;
    this.infoText.y = this.centerY + 15;
    this.infoText.text =this.data.infoText;
    this.infoText.setStyle(this.infoTextStyle);
    this.infoText.anchor.setTo(0.5);
};
ClickerMath.Upgrade.prototype.buttonOver = function(button) {
	button.tint = 0xffffff;
	this.infoScreen.kill();
	this.infoText.kill();
	this.alpha = 1.0;
	this.graphics.alpha = 1.0;
	this.priceText.alpha = 1.0;
	this.priceIcon.alpha = 1.0;
};
ClickerMath.Upgrade.prototype.destroy = function(button) {

	Phaser.Sprite.prototype.destroy.call(this);
	this.infoScreen.destroy();
	this.infoText.destroy();
	this.graphics.destroy();
	this.priceText.destroy();
	this.priceIcon.destroy();
};







