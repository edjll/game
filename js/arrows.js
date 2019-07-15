class Arrows {
	constructor(image, scale = 1) {

		this.image 	   = new Image();
		this.image.src = image;
		this.imageY    = 0;

		this.scale = scale;

		this.arrow = [];

		this.image.onload = () => {
			this.image.ready = true;
		}
	}

	addArrow(x, y, speed) {
		this.arrow.push(new Arrow(x, y, speed, this.image.width, this.image.height / 2));
	}

	translate(x, width) {
		this.arrow.forEach(arrow => {
			arrow.translate(x, width, this.arrow);
		});
	}

	draw(ctx, width) {
		if (this.image.ready) {
			this.arrow.forEach(element => {
				if (element.speed > 0) {
					this.imageY = this.image.height / 2;
				} else {
					this.imageY = 0;
				}
				ctx.drawImage(this.image, 0, this.imageY, this.image.width, this.image.height / 2, element.position.x, element.position.y, this.image.width * this.scale, this.image.height / 2 * this.scale);
			});
		}
	}
}