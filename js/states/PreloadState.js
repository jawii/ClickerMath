var ClickerMath = ClickerMath || {};

ClickerMath.PreloadState = {

	init: function(){
	    
	},

	preload: function(){

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