var ClickerMath = ClickerMath || {};

//initiate the Phaser framework
ClickerMath.game = new Phaser.Game(800, 600, Phaser.AUTO);
//ClickerMath.game = new Phaser.Game('100%', '100%', Phaser.AUTO);

ClickerMath.game.state.add('BootState', ClickerMath.BootState);
ClickerMath.game.state.add('PreloadState', ClickerMath.PreloadState);
ClickerMath.game.state.add('GameState', ClickerMath.GameState);
ClickerMath.game.state.add('HomeState', ClickerMath.HomeState);

ClickerMath.game.state.start('BootState');   
