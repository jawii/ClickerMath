var ClickerMath = ClickerMath || {};

ClickerMath.Upgrade = function(state, data){

	//nulls: x, y, key
	Phaser.Sprite.call(this, state.game, null, null, data.key);

	this.data = data;
	this.game = state;
	//console.log(data);

	this.width = 80;
	this.height = 80;

	//set visibily zero at start
	this.anchor.setTo(0.5);
	this.visible = false;

};

ClickerMath.Upgrade.prototype = Object.create(Phaser.Sprite.prototype);
ClickerMath.Upgrade.prototype.constructor = ClickerMath.Upgrade;


ClickerMath.Upgrade.prototype.reset = function(x, y, data) {

	//null is max health
	Phaser.Sprite.prototype.reset.call(this, x, y, this.data.key);
	this.graphics.revive();
	this.priceText.revive();
	this.priceIcon.revive();
	console.log("Reset!");
	// console.log(this);
};

ClickerMath.Upgrade.prototype.revive = function() {

	//null is max health
	Phaser.Sprite.prototype.revive.call();

};

ClickerMath.Upgrade.prototype.drawUpgrade = function(x, y) {

	this.visible = true;
	this.x = x;
	this.y = y;
	//console.log(this.data);

	//graphics
	this.graphics = this.data.guideGraphics;
	this.graphics.lineStyle(2, 0x000000, 0.4);            
    this.graphics.beginFill(0x83B1DA, 1);            
    this.graphics.drawRect(this.left - 20, this.top - 10, this.width + 40, 100);                      
    this.graphics.endFill(); 
    this.graphics.inputEnabled = true;  
    this.graphics.events.onInputDown.add(this.buttonPress, this);
    this.graphics.events.onInputOver.add(this.buttonHover, this);
    this.graphics.events.onInputOut.add(this.buttonOver, this);

	//console.log(this.graphics);
	//move icon to topleft
	this.anchor.setTo(0.9, 0.85)

	//scale the helper icons
	if(this.data.keyGroup === "helper"){
		this.scale.setTo(0.5);
		this.anchor.setTo(1.4, 1.1)
	}

	//price text
	var priceTextStyle = {
		font: "14px aldrichregular",
      	fill: "black"
	}
	this.priceText = this.game.add.text(this.x - 20, this.bottom + 20, this.data.price);
	this.priceText.anchor.setTo(0.5);
	this.priceIcon = this.game.add.sprite(this.priceText.right + 15, this.priceText.y, "xIcon");
	this.priceIcon.anchor.setTo(0.5);
	this.priceIcon.scale.setTo(0.35);	
};

ClickerMath.Upgrade.prototype.kill = function(){
	this.graphics.kill();
	this.priceText.kill();
	this.priceIcon.kill();
	Phaser.Sprite.prototype.kill.call(this);
	// console.log(this);
}

ClickerMath.Upgrade.prototype.buttonPress = function(button) {
	// console.log(arguments);
	console.log(this.data.price);
};
ClickerMath.Upgrade.prototype.buttonHover = function(button) {
	button.tint = 0.5 * 0xffffff;

};
ClickerMath.Upgrade.prototype.buttonOver = function(button) {
	button.tint = 0xffffff;
};





