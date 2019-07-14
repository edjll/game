class Skills {
	constructor(image_attack, image_jump, image_shot, image_arrows, scale) {
		this.scale = scale;

		this.attack = new Image();

		this.attack.onload = () => {
			this.attack.ready = true;
		}
		this.attack.src = image_attack;

		this.jump = new Image();
		this.jump.onload = () => {
			this.jump.ready = true;
		}
		this.jump.src = image_jump;

		this.shot = new Image();
		this.shot.onload = () => {
			this.shot.ready = true;
		}
		this.shot.src = image_shot;

		this.arrows = new Image();
		this.arrows.onload = () => {
			this.arrows.ready = true;
		}
		this.arrows.src = image_arrows;
	}

	draw(ctx, x, width, height, shot_cooldown, shot_active, attack_cooldown, attack_active, jump_cooldown, jump_active, arrows_cooldown, arrows_active) {
		if (this.attack.ready) {
			ctx.drawImage(this.attack, x +  width / 5 - this.attack.width * this.scale / 2, (height - (this.attack.height + 5) * this.scale), this.attack.width * this.scale, this.attack.height * this.scale);
			

			if (attack_active && performance.now() - attack_cooldown < 500) {
				ctx.beginPath();
					ctx.fillStyle = '#00000099';
					ctx.arc(x + width / 5, (height - (this.attack.height + 5) * this.scale) + this.attack.height * this.scale / 2, this.attack.height * this.scale / 2, 0, Math.PI * 2 * (1 - (performance.now() - attack_cooldown) / 500));
					ctx.fill();
				ctx.closePath();
			}
			
		}
		if (this.jump.ready) {
			ctx.drawImage(this.jump, x + width * 2 / 5 - this.jump.width * this.scale / 2, (height - (this.jump.height + 5) * this.scale), this.jump.width * this.scale, this.jump.height * this.scale);
		
			if (jump_active && performance.now() - jump_cooldown < 3000) {
				ctx.beginPath();
					ctx.fillStyle = '#00000099';
					ctx.arc(x + width * 2 / 5, (height - (this.jump.height + 5) * this.scale) + this.jump.height * this.scale / 2, this.jump.height * this.scale / 2, 0, Math.PI * 2 * (1 - (performance.now() - jump_cooldown) / 3000));
					ctx.fill();
				ctx.closePath();
			}
		}
		if (this.shot.ready) {
			ctx.drawImage(this.shot, x + width * 3 / 5 - this.shot.width * this.scale / 2, (height - (this.shot.height + 5) * this.scale), this.shot.width * this.scale, this.shot.height * this.scale);
			
			if (shot_active && performance.now() - shot_cooldown < 5000) {
				ctx.beginPath();
					ctx.fillStyle = '#00000099';
					ctx.arc(x + width * 3 / 5, (height - (this.shot.height + 5) * this.scale) + this.shot.height * this.scale / 2, this.shot.height * this.scale / 2, 0, Math.PI * 2 * (1 - (performance.now() - shot_cooldown) / 5000));
					ctx.fill();
				ctx.closePath();
			}
		}
		if (this.arrows.ready) {
			ctx.drawImage(this.arrows, x + width * 4 / 5 - this.arrows.width * this.scale / 2, (height - (this.arrows.height + 5) * this.scale), this.arrows.width * this.scale, this.arrows.height * this.scale);
			
			if (arrows_active && performance.now() - arrows_cooldown < 8000) {
				ctx.beginPath();
					ctx.fillStyle = '#00000099';
					ctx.arc(x + width * 4 / 5, (height - (this.arrows.height + 5) * this.scale) + this.arrows.height * this.scale / 2, this.arrows.height * this.scale / 2, 0, Math.PI * 2 * (1 - (performance.now() - arrows_cooldown) / 8000));
					ctx.fill();
				ctx.closePath();
			}
		}
	}
}