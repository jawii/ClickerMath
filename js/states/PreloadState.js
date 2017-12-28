var ClickerMath = ClickerMath || {};

ClickerMath.PreloadState = {

	init: function(){
	    
	},

	preload: function(){

		//The X
		this.load.image("X", "assets/images/X.png");
		this.load.image("xIcon", "assets/images/xIcon.png");
		this.load.image("easy", "assets/images/easy.png");
		this.load.image("normal", "assets/images/normal.png");
		this.load.image("hard", "assets/images/hard.png");
		this.load.image("asian", "assets/images/asian.png");

		//PROGRESS BAR
		this.progress = this.game.add.text(this.game.world.centerX, this.game.world.width/2, '0%', {fill: 'white'});    
		this.progress.anchor.setTo(0.5);           
		this.game.load.onFileComplete.add(this.fileComplete, this);
	},

	create: function(){
		ClickerMath.game.state.start('HomeState');  
	},

	fileComplete: function (progress, cacheKey, success, totalLoaded, totalFiles) {    
		this.progress.text = progress+"%";

	}


};