class Avatar {
	constructor(image, x, y, radius, scale) {
		this.image = new Image();
		this.image.src = image;

		this.position = new Vector(x, y);

		this.radius = radius;

		this.scale = scale;

		this.image.onload = () => {
			this.image.ready = true;
		}

		this.time = performance.now();
	}

	draw(ctx, x, width, hp, mp) {
		if (this.image.ready) {

			ctx.strokeStyle = '#214a2e';
			ctx.lineWidth = 5 * this.scale;

			ctx.beginPath();

				ctx.arc(x + this.position.x * this.scale, this.position.y * this.scale, this.radius * this.scale, 0, Math.PI * 2);

			ctx.closePath();
			ctx.stroke();

			let hpFill = ctx.createLinearGradient(x + (this.position.x + this.radius + 10) * this.scale, this.position.y * this.scale,
											  	  x + (this.position.x + this.radius + 10) * this.scale, (this.position.y + 20) * this.scale);

			hpFill.addColorStop(0, "#d8263f");
			hpFill.addColorStop(1, "#5f111c");

			ctx.fillStyle = hpFill;


			ctx.fillRect(x + (this.position.x + this.radius + 10) * this.scale, this.position.y * this.scale, (2 * hp) * this.scale, 20 * this.scale);

			ctx.fillStyle = 'black';ctx.fillStyle = 'black';

			ctx.fillRect(x + (this.position.x + this.radius + 10 + 2 * hp) * this.scale, this.position.y * this.scale, (2 * (100 - hp)) * this.scale, 20 * this.scale);

			let mpFill = ctx.createLinearGradient(x + (this.position.x + this.radius + 10) * this.scale, (this.position.y + 24) * this.scale,
											  	  x + (this.position.x + this.radius + 10) * this.scale, (this.position.y + 41) * this.scale);

			mpFill.addColorStop(0, "#504edf");
			mpFill.addColorStop(1, "#27266f");

			ctx.fillStyle = mpFill;


			ctx.fillRect(x + (this.position.x + this.radius + 10) * this.scale, (this.position.y + 24) * this.scale, (1.6 * mp) * this.scale, 17 * this.scale);

			ctx.fillStyle = 'black';

			ctx.fillRect(x + (this.position.x + this.radius + 10 + (1.6 * mp)) * this.scale, (this.position.y + 24) * this.scale, (1.6 * (100 - mp)) * this.scale, 17 * this.scale);


			ctx.drawImage(this.image, x + this.position.x - this.radius * 0.9, this.position.y - this.radius * 0.9, this.image.width * this.scale, this.image.height * this.scale);

			let time = performance.now(),
				text = String(Math.floor((time - this.time) / 60000)) + ':' + String(Math.floor((time - this.time) / 1000) % 60);


			ctx.font = 30 * this.scale + 'px Georgia';
			ctx.fillText(text, x + width - 70 * this.scale, 30 * this.scale);

			ctx.textAlign = 'center';
			ctx.font = 35 * this.scale + 'px Georgia';
			ctx.fillText(localStorage.getItem('nickname'), x + (190 + this.radius) * this.scale, (10 + this.radius) * this.scale);
		}
	}
}