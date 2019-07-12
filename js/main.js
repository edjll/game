

let engine = new Engine(),
	groundWidth = 1024,
	groundHeight = 768,
	scale = engine.canvas.height / groundHeight;

engine.addGround(new Ground('./image/ground_1.png', groundWidth, groundHeight, scale));
engine.addGround(new Ground('./image/ground_2.png', groundWidth, groundHeight, scale));
engine.addGround(new Ground('./image/ground_3.png', groundWidth, groundHeight, scale));

engine.ground[1].render.position.x = engine.ground[0].render.position.x + groundWidth * scale;
engine.ground[2].render.position.x = engine.ground[1].render.position.x + groundWidth * scale;

engine.player = new Player('./image/hero/idle.png',   1501,  801,
						   './image/hero/run.png',    1000, 1600,
						   './image/hero/shot.png',   2751,  800,
						   './image/hero/jump.png',    250,  400,
						   './image/hero/death.png',  1250, 1200,
						   './image/hero/attack_n.png', 1250,  800,
						   './image/hero/hurt.png',   1250,  800,
						   20, engine.canvas.height * 0.59, scale);

engine.player.arrows = new Arrows('./image/arrow.png', scale);

engine.avatar = new Avatar('./image/hero/avatar.png', 80, 80, 60, scale);

engine.bots = new Bots('./image/enemy/idle.png',   
					   './image/enemy/run.png',    
					   './image/enemy/hurt.png',   
					   './image/enemy/death.png',  
					   './image/enemy/attack.png', 
					  	engine.canvas.height * 0.59, scale);

engine.update = () => {

	if (!engine.player.hurtActive) {

		if (engine.input.shot) {
			if (engine.player.shotCooldown || engine.player.gravityActive || engine.player.attackActive) {
				engine.input.shot = false;
			} else {
				if (engine.player.shot()) {
					engine.input.shot = false;
				}
				engine.input.jump = false;
			}
		}

		if (engine.input.attack) {
			if (engine.player.gravityActive || engine.input.shot || engine.player.shotActive) {
				engine.input.attack = false;
			} else {
				if (engine.player.attack()) {
					engine.input.attack = false;
				}
				engine.input.jump = false;
			}
		}

		if (engine.input.jump && !engine.player.attackActive) {
			if (engine.player.jumpCooldown) {
				engine.input.jump = false;
			} else {
				engine.player.jump();
				if (engine.player.jumpFrame == 20) {
					engine.input.jump = false;
					engine.player.jumpFrame = 0;
					engine.player.jumpCooldown = true;
					engine.player.jumpTimeCoolDownStart = performance.now();
				}
			}
		}

		if (engine.input.isKeyDown('ArrowLeft') && !(engine.input.shot && engine.player.shotActive) && !(engine.input.attack || engine.player.attackActive) && !(engine.input.isKeyDown('Space') && !engine.player.gravityActive)) {
			if (!engine.input.jump) {
				engine.player.frame     = 2;
			}
			engine.player.frame_hurt	= 12;
			engine.player.frame_jump	= 6;
			engine.player.frame_idle 	= 0;
			engine.player.frame_shot 	= 4;
			engine.player.frame_attack  = 10;
			
			engine.player.translate(-3, 0);

			if ((Math.floor(-engine.camera.x / groundWidth / scale)) % 3 == 0) {

				engine.ground[0].render.position.x = engine.ground[1].render.position.x - groundWidth * scale;

			} else if ((Math.floor(-engine.camera.x / groundWidth / scale)) % 3 == 1) {

				engine.ground[1].render.position.x = engine.ground[2].render.position.x - groundWidth * scale;

			} else if ((Math.floor(-engine.camera.x / groundWidth / scale)) % 3 == 2) {

				engine.ground[2].render.position.x = engine.ground[0].render.position.x - groundWidth * scale;

			}
		}

		if (engine.input.isKeyDown('ArrowRight') && !(engine.input.shot && engine.player.shotActive) && !(engine.input.attack || engine.player.attackActive) && !(engine.input.isKeyDown('Space') && !engine.player.gravityActive)) {
			if (!engine.input.jump) {
				engine.player.frame = 3;
			}
			engine.player.frame_hurt	= 13;
			engine.player.frame_jump	= 7;
			engine.player.frame_idle 	= 1;
			engine.player.frame_shot 	= 5;
			engine.player.frame_attack  = 11;
			engine.player.translate(3, 0);

			if ((Math.floor(-engine.camera.x / groundWidth / scale)) % 3 == 0) {
	 
				engine.ground[2].render.position.x = engine.ground[1].render.position.x + groundWidth * scale;

			} else if ((Math.floor(-engine.camera.x / groundWidth / scale)) % 3 == 1) {

				engine.ground[0].render.position.x = engine.ground[2].render.position.x + groundWidth * scale;

			} else if ((Math.floor(-engine.camera.x / groundWidth / scale)) % 3 == 2) {

				engine.ground[1].render.position.x = engine.ground[0].render.position.x + groundWidth * scale;

			}
		}

		if (!engine.input.isKeyDown('ArrowLeft') && !engine.input.isKeyDown('ArrowRight') && !engine.input.jump && !engine.input.shot && !engine.input.attack) {
			engine.player.frame = engine.player.frame_idle;
			engine.player.translate(0, 0);
		}

	}

	//camera position in window
	let localPosition = engine.getLocalPosition(engine.player);

	//player translate to left
	if (localPosition.x < engine.canvas.width * 0.2) {
		engine.camera.x += 3;
	}
	if (engine.camera.x > 0) {
		engine.camera.x  = 0;
	}

	//player translate to right
	if (localPosition.x > engine.canvas.width * 0.6) {
		engine.camera.x -= 3;
	}
}
