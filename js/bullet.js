class Bullet {
	constructor(image, scale = 1) {
		this.image = new Image();
		this.image.src = image;
		this.bullets = [];
		this.image.onload = () => {
			this.image.ready = true;
		}
	}

	translate(x, y) {
		this.position.x += x;
		this.position.y += y;
	}

	addBullet(x, y) {
		this.bullets.push(new Vector(x, y));
	}

	draw(ctx) {
		if (this.image.ready) {
			this.bullets.forEach(bullet => {
				ctx.drawImage(this.image, element.x, element.y, this.image.width * scale, this.image.height * scale);
			})
		}
	}
}