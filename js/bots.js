class Bots {
	constructor(imageIdle, imageRun, imageHurt, imageDeath, imageAttack, imageResurrection,
				y, scale = 1, hp = 30, mp = 100, regenHp = 1, regenMp = 1) {

		this.position = new Vector(0, y);
		
		this.imageIdle 	   = new Image();
		this.imageIdle.src = imageIdle;

		this.imageRun 	  = new Image();
		this.imageRun.src = imageRun;

		this.imageHurt 	   = new Image();
		this.imageHurt.src = imageHurt;

		this.imageDeath 	= new Image();
		this.imageDeath.src = imageDeath;

		this.imageAttack 	 = new Image();
		this.imageAttack.src = imageAttack;

		this.imageResurrection 	   = new Image();
		this.imageResurrection.src = imageResurrection;

		this.scale = scale;

		this.bot = [];
	}

	hurt(x, hp, width, player) {
		for (let i = this.bot.length - 1; i >= 0; i--) {
			if (this.bot[i].hurt(x, hp, width)) {
				if (this.bot[i].deathActive && this.bot[i].score) {
					player.score += this.bot[i].score;
				}
				return true;
			}
		}
	}

	addBot(x) {
		this.bot.push(new Bot(this.imageIdle, 			this.imageIdle.width,   		this.imageIdle.height,  
							  this.imageRun, 			this.imageRun.width,    		this.imageRun.height,   
							  this.imageHurt, 			this.imageHurt.width,  			this.imageHurt.height,  
							  this.imageDeath, 			this.imageDeath.width,  		this.imageDeath.height, 
							  this.imageAttack, 		this.imageAttack.width, 		this.imageAttack.height,
							  this.imageResurrection, 	this.imageResurrection.width, 	this.imageResurrection.height,
							  x, this.position.y, this.scale));
	}

	draw(ctx, x, y, width, height) {
		this.bot.forEach(bot => {
			bot.draw(ctx, x, y, width, this.bot);
		});
	}
}