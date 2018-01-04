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

		//helper icons
		this.load.image("student", "assets/images/student.png");
		this.load.image("professor", "assets/images/professor.png");
		this.load.image("xFarm", "assets/images/xFarm.png");

		//upgradeicons
		this.load.image("studentUpgrade", "assets/images/studentUpgrade.png");
		this.load.image("professorUpgrade", "assets/images/professorUpgrade.png");
		this.load.image("xFarmUpgrade", "assets/images/xFarmUpgrade.png");
		this.load.image("xUpgrade", "assets/images/xUpgrade.png");

		//load equations
		this.load.text('easyTasks', 'assets/data/easyTasks.json');
		this.load.text('normalTasks', 'assets/data/normalTasks.json');
		this.load.text('hardTasks', 'assets/data/hardTasks.json');
		this.load.text('asianTasks', 'assets/data/asianTasks.json');

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