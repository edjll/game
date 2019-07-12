class Bots {
	constructor(image_idle,   image_idle_width,   image_idle_height, 
				image_run,    image_run_width,    image_run_height,
				image_hurt,   image_hurt_width,	  image_hurt_height,
				image_death,  image_death_width,  image_death_height,
				image_attack, image_attack_width, image_attack_height,
				x, y, scale = 1, hp = 30, mp = 100, regenHp = 1, regenMp = 1) {

		this.position = new Vector(x, y);
		
		this.image_idle = image_idle;
		this.image_run = image_run;
		this.image_hurt = image_hurt;
		this.image_death = image_death;
		this.image_attack = image_attack;

		this.scale = scale;

		this.bot = [];

		this.frame = 3;

		this.render = [
							new Render(this.image_idle,   this.position.x, this.position.y, image_idle_width,   image_idle_height,   this.scale,   0, 11,  4, 6, 10),  // 0  left  idle
							new Render(this.image_idle,   this.position.x, this.position.y, image_idle_width,   image_idle_height,   this.scale,  12, 11,  4, 6, 10),  // 1  right idle
							new Render(this.image_run,    this.position.x, this.position.y, image_run_width,    image_run_height,    this.scale,   0, 15,  4, 8, 10),  // 2  left  run
							new Render(this.image_run,    this.position.x, this.position.y, image_run_width,    image_run_height,    this.scale,  16, 15,  4, 8, 10),  // 3  right run
							new Render(this.image_hurt,   this.position.x, this.position.y, image_hurt_width,   image_hurt_height,   this.scale,   0, 15,  4, 8, 10),  // 4  left  hurt
							new Render(this.image_hurt,   this.position.x, this.position.y, image_hurt_width,   image_hurt_height,   this.scale,  16, 15,  4, 8, 10),  // 5  right hurt
							new Render(this.image_death,  this.position.x, this.position.y, image_death_width,  image_death_height,  this.scale,   0, 15,  5, 6, 10),  // 6  left  death
							new Render(this.image_death,  this.position.x, this.position.y, image_death_width,  image_death_height,  this.scale,  16, 15,  5, 6, 10),  // 7  right death
							new Render(this.image_attack, this.position.x, this.position.y, image_attack_width, image_attack_height, this.scale,   0, 11,  4, 6, 10),  // 8 left  attack
							new Render(this.image_attack, this.position.x, this.position.y, image_attack_width, image_attack_height, this.scale,  12, 11,  4, 6, 10)   // 9 right attack
						];
	}

	addBot(bot) {
		this.bot.push(bot);
	}

	draw(ctx, x, y, width, height) {
		this.bot.forEach(bot => {

			if (this.render[bot.frame_attack].last) {
				this.render[bot.frame_attack].last = false;
				bot.cooldown = true;
				bot.timeCooldownStart = performance.now();
			}

			bot.translate(x, y, width, height, this.scale);
			this.render[bot.frame].position.x = bot.position.x;
			this.render[bot.frame].position.y = bot.position.y;

			this.render[bot.frame].draw(ctx);
		});
	}
}