var ClickerMath = ClickerMath || {};

ClickerMath.HomeState = {


	preload: function(){
		
		
	},

	create: function(){

		//background color
		this.game.stage.backgroundColor = "#fff";

		//Text styles
		var gameTextStyle = {
            font: '100px Bungee',
            fill: '#black'
        };
        var guideTextStyle = {
            font: 'bold 40px aldrichregular',
            fill: '#000000',
            align: 'center',
            // wordWrap: true,
            // wordWrapWidth: 650
        };
        var choiceTextStyle = {
            font: 'bold 40px aldrichregular',
            fill: '#000000',
            align: 'center',
            // wordWrap: true,
            // wordWrapWidth: 650
        };

        var levelChoiceTextstyle = {
            font: 'bold 25px aldrichregular',
            fill: '#000000',
            align: 'center',
            // wordWrap: true,
            // wordWrapWidth: 650
        };

		var gameNameText = this.game.add.text(this.game.width/2, 100, 'ClickerMath', gameTextStyle);
        gameNameText.anchor.setTo(0.5);
        gameNameText.setShadow(5, 5, 'rgba(0,0,0,0.5)', 10);

        var guideTextText = "Saatko kerättyä 1 000 000 pistettä?"
        var guideText = this.game.add.text(gameNameText.x, gameNameText.y + 120, guideTextText, guideTextStyle);
        guideText.anchor.setTo(0.5);

    	// 

    	var choiceTextText = "Valitse tehtävätyyppi";
    	var choiceText = this.game.add.text(this.game.width/2, 350, choiceTextText, choiceTextStyle);
    	choiceText.anchor.setTo(0.5);


    	//buttons for level select
    	this.buttonCalculus = this.game.add.button(400, choiceText.y + 100, "button1", this.clickHandler);
        this.buttonCalculus.anchor.setTo(0.5);
        this.buttonCalculus.alpha = 0.5;
        // this.buttonCalculus.scale.setTo(0.4, 0.7);
        var buttonCalculusText = this.game.add.text(this.buttonCalculus.position.x, this.buttonCalculus.position.y, "Laskutoimituksia", levelChoiceTextstyle);
        buttonCalculusText.anchor.setTo(0.5);
        this.buttonCalculus.width = 250;
        this.buttonCalculus.height = 80;

        this.buttonCalculus.selected = false;


        this.buttonEquation = this.game.add.button(880, choiceText.y + 100, "button1", this.clickHandler);
        this.buttonEquation.anchor.setTo(0.5);
        this.buttonEquation.alpha = 0.5;
        // this.buttonEquation.scale.setTo(0.4, 0.7);
        var buttonEquationText = this.game.add.text(this.buttonEquation.position.x, this.buttonEquation.position.y, "Yhtälöitä", levelChoiceTextstyle);
        buttonEquationText.anchor.setTo(0.5);
        this.buttonEquation.width = buttonCalculusText.width + 30;
        this.buttonEquation.selected = false;


        //startgamebutton
        var startGameButton = this.game.add.button(640, 700, 'button2', this.playButtonHandler);
        startGameButton.anchor.setTo(0.5);
        startGameButton.scale.setTo(1);
        var startGameText =this.game.add.text(startGameButton.position.x, startGameButton.position.y, 'Pelaa', this.startGameTextstyle);
        startGameText.anchor.setTo(0.5);

        //add background images
        this.game.add.sprite(150, 400, 'mainmenu');
    },

    clickHandler: function(button, pointer){
    	//clear selections
		ClickerMath.HomeState.buttonEquation.selected = false;
		ClickerMath.HomeState.buttonEquation.alpha = 0.5;
		ClickerMath.HomeState.buttonCalculus.selected = false;
		ClickerMath.HomeState.buttonCalculus.alpha = 0.5;


    	button.selected = true;
		button.alpha = 1
    },

    playButtonHandler: function(){
    	var levelType;

    	if(ClickerMath.HomeState.buttonCalculus.selected){
    		levelType = "calculus"
    		ClickerMath.game.state.start('GameState', true, false, levelType);	
    	}
		else if(ClickerMath.HomeState.buttonEquation.selected){
			levelType = "equation";
			ClickerMath.game.state.start('GameState', true, false, levelType);	
		}    	

    	
    }


};