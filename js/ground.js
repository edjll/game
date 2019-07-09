class Ground {
	constructor(image, width, height, x = 0, y = 0) {
		this.position = new Vector(x, y);

		this.render = new Render(image, this.position.x, this.position.y, width, height, 0, 0);
		this.render.ground = true;
	}

	draw(ctx) {
		this.render.draw(ctx);
	}
}