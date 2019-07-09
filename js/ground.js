class Ground {
	constructor(image, width, height, scale = 1, x = 0, y = 0) {
		this.position = new Vector(x, y);

		this.render = new Render(image, this.position.x, this.position.y, width, height, scale, 0, 0, 1, 1, 1, 2474, 2000);
	}

	draw(ctx) {
		this.render.draw(ctx);
	}
}