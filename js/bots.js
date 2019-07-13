class Bots {
	constructor(image_idle,  
				image_run, 
				image_hurt, 
				image_death, 
				image_attack, 
				y, scale = 1, hp = 30, mp = 100, regenHp = 1, regenMp = 1) {

		this.position = new Vector(0, y);
		
		this.image_idle = new Image();
		this.image_idle.src = image_idle;

		this.image_run = new Image();
		this.image_run.src = image_run;

		this.image_hurt = new Image();
		this.image_hurt.src = image_hurt;

		this.image_death = new Image();
		this.image_death.src = image_death;

		this.image_attack = new Image();
		this.image_attack.src = image_attack;

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
		this.bot.push(new Bot(this.image_idle, 		this.image_idle.width,   this.image_idle.height,  
							  this.image_run, 		this.image_run.width,    this.image_run.height,   
							  this.image_hurt, 		this.image_hurt.width,   this.image_hurt.height,  
							  this.image_death, 	this.image_death.width,  this.image_death.height, 
							  this.image_attack, 	this.image_attack.width, this.image_attack.height,
							  x, this.position.y, this.scale));
	}

	draw(ctx, x, y, width, height) {
		this.bot.forEach(bot => {
			bot.draw(ctx, x, y, width, this.bot);
		});
	}
}