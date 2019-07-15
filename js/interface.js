class Avatar {
	constructor(imageHero, imageAttack, imageJump, imageShot, imageArrows, x, y, radius, scale) {

		this.position = new Vector(x, y);

		this.radius = radius;

		this.scale = scale;

		this.imageHero = new Image();
		this.imageHero.onload = () => {
			this.imageHero.ready = true;
		}
		this.imageHero.src = imageHero;

		this.attack = new Image();

		this.attack.onload = () => {
			this.attack.ready = true;
		}
		this.attack.src = imageAttack;

		this.jump = new Image();
		this.jump.onload = () => {
			this.jump.ready = true;
		}
		this.jump.src = imageJump;

		this.shot = new Image();
		this.shot.onload = () => {
			this.shot.ready = true;
		}
		this.shot.src = imageShot;

		this.arrows = new Image();
		this.arrows.onload = () => {
			this.arrows.ready = true;
		}
		this.arrows.src = imageArrows;
	}

	draw(ctx, x, width, height, hp, mp, score, shotCooldownStart, shotCooldownActive, attackCooldownStart, attackCooldownActive, jumpCooldownStart, jumpCooldownActive, arrowsCooldownStart, arrowsCooldownActive, time) {

		ctx.strokeStyle = '#214a2e';
		ctx.lineWidth = 5 * this.scale;

		ctx.beginPath();

			ctx.arc(x + this.position.x * this.scale, this.position.y * this.scale, this.radius * this.scale, 0, Math.PI * 2);

		ctx.closePath();
		ctx.stroke();

		let hpFill = ctx.createLinearGradient(0, this.position.y * this.scale,
										  	  0, (this.position.y + 20) * this.scale);

		hpFill.addColorStop(0, "#d8263f");
		hpFill.addColorStop(1, "#5f111c");

		ctx.fillStyle = hpFill;


		ctx.fillRect(x + (this.position.x + this.radius + 10) * this.scale, this.position.y * this.scale, (2 * hp) * this.scale, 20 * this.scale);

		ctx.fillStyle = 'black';

		ctx.fillRect(x + (this.position.x + this.radius + 10 + 2 * hp) * this.scale, this.position.y * this.scale, (2 * (100 - hp)) * this.scale, 20 * this.scale);

		ctx.fillStyle = 'white';
		ctx.textAlign = 'center';
		ctx.font = 18 * this.scale + 'px Georgia';

		ctx.fillText(hp + '/100', x + (this.position.x + this.radius + 110) * this.scale, (this.position.y + 15) * this.scale);
		
		let mpFill = ctx.createLinearGradient(0, (this.position.y + 24) * this.scale,
										  	  0, (this.position.y + 41) * this.scale);

		mpFill.addColorStop(0, "#504edf");
		mpFill.addColorStop(1, "#27266f");

		ctx.fillStyle = mpFill;


		ctx.fillRect(x + (this.position.x + this.radius + 10) * this.scale, (this.position.y + 24) * this.scale, (1.6 * mp) * this.scale, 17 * this.scale);

		ctx.fillStyle = 'black';

		ctx.fillRect(x + (this.position.x + this.radius + 10 + (1.6 * mp)) * this.scale, (this.position.y + 24) * this.scale, (1.6 * (100 - mp)) * this.scale, 17 * this.scale);

		ctx.fillStyle = 'white';
		ctx.textAlign = 'center';
		ctx.font = 15 * this.scale + 'px Georgia';

		ctx.fillText(mp + '/100', x + (this.position.x + this.radius + 90) * this.scale, (this.position.y + 37) * this.scale);

		let text = String(Math.floor(time / 60000) + ':' + String(Math.floor(time / 1000) % 60));

		ctx.font = 30 * this.scale + 'px Georgia';
		ctx.fillStyle = 'black';
		ctx.fillText(text, x + width - 70 * this.scale, 30 * this.scale);

		ctx.textAlign = 'center';
		ctx.fillText('Score: ' + score, x + width / 2, 30 * this.scale);

		ctx.textAlign = 'center';
		ctx.font = 35 * this.scale + 'px Georgia';
		ctx.fillText(localStorage.getItem('nickname'), x + (190 + this.radius) * this.scale, (10 + this.radius) * this.scale);

		if (this.imageHero.ready) {
			ctx.drawImage(this.imageHero, x + (this.position.x - this.radius * 0.9) * this.scale, (this.position.y - this.radius * 0.9) * this.scale, this.imageHero.width * this.scale, this.imageHero.height * this.scale);
		}
		if (this.attack.ready) {
			ctx.drawImage(this.attack, x +  width / 5 - this.attack.width * this.scale / 2, (height - (this.attack.height + 5) * this.scale), this.attack.width * this.scale, this.attack.height * this.scale);

			if (attackCooldownActive && time - attackCooldownStart < 500) {
				ctx.beginPath();
					ctx.fillStyle = '#00000099';
					ctx.arc(x + width / 5, (height - (this.attack.height + 5) * this.scale) + this.attack.height * this.scale / 2, this.attack.height * this.scale / 2, 0, Math.PI * 2 * (1 - (time - attackCooldownStart) / 500));
					ctx.fill();
				ctx.closePath();
			}

			ctx.font = 15 * this.scale + 'px Georgia';
			ctx.textAlign = 'right';
			ctx.fillStyle = 'white';
			ctx.fillText('Space', x + width / 5 - this.attack.width * this.scale * 2 / 5, (height - (this.attack.height + 5) * this.scale) + this.attack.height * 0.15 * this.scale);

			ctx.font = 20 * this.scale + 'px Georgia';
			ctx.textAlign = 'left';
			ctx.fillStyle = '#504edf';
			ctx.fillText('0', x + width / 5 + this.attack.width * this.scale * 2 / 5, (height - (this.attack.height + 5) * this.scale) + this.attack.height * this.scale);
		}
		if (this.jump.ready) {
			ctx.drawImage(this.jump, x + width * 2 / 5 - this.jump.width * this.scale / 2, (height - (this.jump.height + 5) * this.scale), this.jump.width * this.scale, this.jump.height * this.scale);
		
			if (jumpCooldownActive && time - jumpCooldownStart < 3000) {
				ctx.beginPath();
					ctx.fillStyle = '#00000099';
					ctx.arc(x + width * 2 / 5, (height - (this.jump.height + 5) * this.scale) + this.jump.height * this.scale / 2, this.jump.height * this.scale / 2, 0, Math.PI * 2 * (1 - (time - jumpCooldownStart) / 3000));
					ctx.fill();
				ctx.closePath();
			}

			ctx.font = 15 * this.scale + 'px Georgia';
			ctx.textAlign = 'right';
			ctx.fillStyle = 'white';
			ctx.fillText('Up', x + width * 2 / 5 - this.jump.width * this.scale * 2 / 5, (height - (this.jump.height + 5) * this.scale) + this.jump.height * 0.15 * this.scale);

			ctx.font = 20 * this.scale + 'px Georgia';
			ctx.textAlign = 'left';
			ctx.fillStyle = '#504edf';
			ctx.fillText('0', x + width * 2 / 5 + this.jump.width * this.scale * 2 / 5, (height - (this.jump.height + 5) * this.scale) + this.jump.height * this.scale);
		}
		if (this.shot.ready) {
			ctx.drawImage(this.shot, x + width * 3 / 5 - this.shot.width * this.scale / 2, (height - (this.shot.height + 5) * this.scale), this.shot.width * this.scale, this.shot.height * this.scale);
			
			if (shotCooldownActive && time - shotCooldownStart < 5000) {
				ctx.beginPath();
					ctx.fillStyle = '#00000099';
					ctx.arc(x + width * 3 / 5, (height - (this.shot.height + 5) * this.scale) + this.shot.height * this.scale / 2, this.shot.height * this.scale / 2, 0, Math.PI * 2 * (1 - (time - shotCooldownStart) / 5000));
					ctx.fill();
				ctx.closePath();
			}

			ctx.font = 15 * this.scale + 'px Georgia';
			ctx.textAlign = 'right';
			ctx.fillStyle = 'white';
			ctx.fillText('Ctrl', x + width * 3 / 5 - this.shot.width * this.scale * 2 / 5, (height - (this.shot.height + 5) * this.scale) + this.shot.height * 0.15 * this.scale);

			ctx.font = 20 * this.scale + 'px Georgia';
			ctx.textAlign = 'left';
			ctx.fillStyle = '#504edf';
			ctx.fillText('10', x + width * 3 / 5 + this.shot.width * this.scale * 2 / 5, (height - (this.shot.height + 5) * this.scale) + this.shot.height * this.scale);
		}
		if (this.arrows.ready) {
			ctx.drawImage(this.arrows, x + width * 4 / 5 - this.arrows.width * this.scale / 2, (height - (this.arrows.height + 5) * this.scale), this.arrows.width * this.scale, this.arrows.height * this.scale);
			
			if (arrowsCooldownActive && time - arrowsCooldownStart < 8000) {
				ctx.beginPath();
					ctx.fillStyle = '#00000099';
					ctx.arc(x + width * 4 / 5, (height - (this.arrows.height + 5) * this.scale) + this.arrows.height * this.scale / 2, this.arrows.height * this.scale / 2, 0, Math.PI * 2 * (1 - (time - arrowsCooldownStart) / 8000));
					ctx.fill();
				ctx.closePath();
			}

			ctx.font = 15 * this.scale + 'px Georgia';
			ctx.textAlign = 'right';
			ctx.fillStyle = 'white';
			ctx.fillText('1', x + width * 4 / 5 - this.arrows.width * this.scale * 2 / 5, (height - (this.arrows.height + 5) * this.scale) + this.arrows.height * 0.15 * this.scale);

			ctx.font = 20 * this.scale + 'px Georgia';
			ctx.textAlign = 'left';
			ctx.fillStyle = '#504edf';
			ctx.fillText('30', x + width * 4 / 5 + this.arrows.width * this.scale * 2 / 5, (height - (this.arrows.height + 5) * this.scale) + this.arrows.height * this.scale);
		}
	}
}