class Player {
	constructor(image, x, y, scale = 1, hp = 100, mp = 100) {
		this.image = image;

		this.position = new Vector(x, y);

		this.frame = 0;

		this.render =  [
							new Render(this.image, this.position.x, this.position.y, 487, 406, scale, 0, 0, 1, 1, 1),  //right
							new Render(this.image, this.position.x, this.position.y, 487, 406, scale, 0, 0, 1, 1, 1)   //left
						];

		this.hp = hp;
		this.mp = mp;
	}

	translate(x, y) {
		this.render[this.frame].position.x += x;
		this.render[this.frame].position.y += y;
	}

	draw(ctx) {
		ctx.save();

		this.render[this.frame].draw(ctx);

		ctx.restore();
	}
}