class Ground {
	constructor(image, width, height, scale = 1, x = 0, y = 0) {
		this.position = new Vector(x, y);
		this.scale = scale;

		this.render = new Render(image, this.position.x, this.position.y, width, height, scale);
	}

	draw(ctx) {
		this.render.draw(ctx);
	}
}