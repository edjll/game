class Map {
	constructor(image, width, height, x = 0, y = 0) {
		this.position = new Vector(x, y);

		this.render = new Render(image, this.position.x, this.position.y, width, height);
	}

	draw(ctx) {
		this.render.position.x = this.position.x;
		this.render.position.y = this.position.y;
		this.render.draw(ctx);
	}
}