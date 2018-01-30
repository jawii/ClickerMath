var ClickerMath = ClickerMath || {};

ClickerMath.PreloadState = {

	init: function(){
	    
	},

	preload: function(){
		//main menu
		this.load.image("mainmenu", "assets/images/mainmenu.png");

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
		this.load.text('easyEquationTasks', 'assets/data/easyEquationTasks.json');
		this.load.text('normalEquationTasks', 'assets/data/normalEquationTasks.json');
		this.load.text('hardEquationTasks', 'assets/data/hardEquationTasks.json');
		this.load.text('asianEquationTasks', 'assets/data/asianEquationTasks.json');

		//load calculus
		this.load.text('easyBasicTasks', 'assets/data/easyBasicTasks.json');
		this.load.text('normalBasicTasks', 'assets/data/normalBasicTasks.json');
		this.load.text('hardBasicTasks', 'assets/data/hardBasicTasks.json');
		this.load.text('asianBasicTasks', 'assets/data/asianBasicTasks.json');

		//buttons
		this.load.image("button1", "assets/images/button1.png");
		this.load.image("button2", "assets/images/button2.png");

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