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
		this.arrows.push(new Arrow(x, y, speed, this.image.width, this.image.height / 2));
	}

	translate(x, width) {
		this.arrows.forEach(arrow => {
			arrow.translate(x, width, this.arrows);
		});
	}

	draw(ctx, width) {
		if (this.image.ready) {
			this.arrows.forEach(element => {
				let y;
				if (element.speed > 0) {
					y = this.image.height / 2;
				} else {
					y = 0;
				}
				ctx.drawImage(this.image, 0, y, this.image.width, this.image.height / 2, element.position.x, element.position.y, this.image.width * this.scale, this.image.height / 2 * this.scale);
			});
		}
	}
}