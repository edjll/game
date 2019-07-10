class Arrows {
	constructor(image, scale = 1) {
		this.image = new Image();
		this.image.src = image;
		this.arrows = [];
		this.image.onload = () => {
			this.image.ready = true;
		}
	}

	translate(x, y) {
		this.position.x += x;
		this.position.y += y;
	}

	addArrow(x, y) {
		this.arrows.push({
							x: x,
							y: y,
							speed: speed
						});
	}

	draw(ctx) {
		if (this.image.ready) {
			this.arrows.forEach(bullet => {
				ctx.drawImage(this.image, element.x, element.y, this.image.width * scale, this.image.height * scale);
			})
		}
	}
}