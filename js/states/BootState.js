var ClickerMath = ClickerMath || {};

ClickerMath.BootState = {

	preload: function(){

	},

	create: function(){


        ClickerMath.game.state.start('PreloadState');  

        //scaling options
        this.mobile = !this.game.device.desktop ? true : false;

        //scale entire screen if mobile
        //if(this.mobile){
        //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //}
        //else
        //this.scale.pageAlignHorizontally = true;
        //this.scale.pageAlignVertically = true;
    	// }
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    }
};