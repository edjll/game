class Player {
	constructor(image_idle, image_run, x, y, scale = 1, hp = 100, mp = 100) {
		this.image_idle = image_idle;
		this.image_run = image_run;

		this.position = new Vector(x, y);

		this.frame = 1;
		this.frame_idle = 1;

		this.render =  [
							new Render(this.image_idle, this.position.x, this.position.y, 4870, 812, scale,  0, 9, 10, 2, 10),  //left idle
							new Render(this.image_idle, this.position.x, this.position.y, 4870, 812, scale, 10, 9, 10, 2, 10),  //right idle
							new Render(this.image_run, this.position.x, this.position.y, 4850, 894, scale,  0, 9, 10, 2, 10),  //left run
							new Render(this.image_run, this.position.x, this.position.y, 4850, 894, scale, 10, 9, 10, 2, 10)   //right run
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
		ctx.save();

		this.render[this.frame].draw(ctx);

		ctx.restore();
	}
}