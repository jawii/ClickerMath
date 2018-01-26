var ClickerMath = ClickerMath || {};

ClickerMath.HomeState = {


	preload: function(){
		
		
	},

	create: function(){

		//background color
		this.game.stage.backgroundColor = "#4488AA";

		//Text styles
		var gameTextStyle = {
            font: '80px Bungee',
            fill: '#black'
        };
        var guideTextStyle = {
            font: 'bold 25px Arial',
            fill: '#000000',
            align: 'center',
            wordWrap: true,
            wordWrapWidth: 650
        }

		var gameNameText = this.game.add.text(this.game.width/2, 100, 'ClickerMath', gameTextStyle);
        gameNameText.anchor.setTo(0.5);
        gameNameText.setShadow(5, 5, 'rgba(0,0,0,0.5)', 10);

        // var guideTextText = "Kerää 1 000 000 pistettä klikkailemalla, ostelemalla ja ratkomalla tehtäviä."
        // var guideText = this.game.add.text(gameNameText.x, gameNameText.y + 100, guideTextText, guideTextStyle);
        // guideText.anchor.setTo(0.5);

    	ClickerMath.game.state.start('GameState', true, false, null);	

    },


};