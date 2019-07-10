class Arrows {
	constructor(image, scale = 1) {
		this.image = new Image();
		this.image.src = image;
		this.scale = scale;
		this.arrows = [];
		this.image.onload = () => {
			this.image.ready = true;
		}
	}

	addArrow(x, y, speed) {
		this.arrows.push({
							x: x,
							y: y,
							speed: speed
						});
	}

	draw(ctx) {
		if (this.image.ready) {
			this.arrows.forEach(element => {
				ctx.drawImage(this.image, element.x, element.y, this.image.width * this.scale, this.image.height * this.scale);
				element.x += element.speed;
			})
		}
	}
}