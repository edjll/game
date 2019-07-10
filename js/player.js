class Player {
	constructor(image_idle, image_idle_width, image_idle_height, image_run, image_run_width, image_run_height, image_shot, image_shot_width, image_shot_height, x, y, scale = 1, hp = 100, mp = 100) {
		this.image_idle = image_idle;
		this.image_run = image_run;
		this.image_shot = image_shot;

		this.position = new Vector(x, y);

		this.frame = 1;
		this.frame_idle = 1;
		this.frame_shot = 5;

		this.render =  [
							new Render(this.image_idle, this.position.x, this.position.y, image_idle_width, image_idle_height, scale,  0, 11,  6, 2, 10),  //left  idle
							new Render(this.image_idle, this.position.x, this.position.y, image_idle_width, image_idle_height, scale,  0, 11,  6, 2, 10),  //right idle
							new Render(this.image_run,  this.position.x, this.position.y, image_run_width,  image_run_height,  scale,  0, 15,  4, 4, 10),  //left  run
							new Render(this.image_run,  this.position.x, this.position.y, image_run_width,  image_run_height,  scale,  0, 15,  4, 4, 10),  //right run
							new Render(this.image_shot, this.position.x, this.position.y, image_shot_width, image_shot_height, scale,  0, 21, 11, 4, 10),  //left  shot
							new Render(this.image_shot, this.position.x, this.position.y, image_shot_width, image_shot_height, scale,  22, 21, 11, 4, 10)   //right shot
						];

		this.hp = hp;
		this.mp = mp;
	}

	translate(x, y) {
		this.position.x += x;
		if (this.position.x < 0) {
			this.position.x = 0;
		}
		this.position.y += y;
		this.render[this.frame].position.x = this.position.x;
		this.render[this.frame].position.y = this.position.y;
	}

	draw(ctx) {
		this.render[this.frame].draw(ctx);
	}
}