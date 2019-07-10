

let engine = new Engine(),
	groundWidth = 1024,
	groundHeight = 768,
	scale = engine.canvas.height / groundHeight;

engine.addGround(new Ground('./image/ground_1.png', groundWidth, groundHeight, scale));
engine.addGround(new Ground('./image/ground_2.png', groundWidth, groundHeight, scale));
engine.addGround(new Ground('./image/ground_3.png', groundWidth, groundHeight, scale));

engine.ground[1].render.position.x = engine.ground[0].render.position.x + groundWidth * scale;
engine.ground[2].render.position.x = engine.ground[1].render.position.x + groundWidth * scale;

engine.player = new Player('./image/idle_s.png',  9006, 2402,
						   './image/run_s.png',   6004, 4804,
						   './image/shot_s.png',  5503,  801,
						   20, engine.canvas.height * 0.72, scale / 2);

engine.bullet = new Bullet('./image/bullet.png', scale);

engine.update = (dt) => {

	if (engine.input.isKeyDown('ArrowLeft')) {
		engine.player.frame = 2;
		engine.player.frame_idle = 0;
		engine.player.frame_shot = 4;
		engine.player.translate(-3, 0);

		if ((Math.floor(-engine.camera.x / groundWidth / scale)) % 3 == 0) {

			engine.ground[0].render.position.x = engine.ground[1].render.position.x - groundWidth * scale;

		} else if ((Math.floor(-engine.camera.x / groundWidth / scale)) % 3 == 1) {

			engine.ground[1].render.position.x = engine.ground[2].render.position.x - groundWidth * scale;

		} else if ((Math.floor(-engine.camera.x / groundWidth / scale)) % 3 == 2) {

			engine.ground[2].render.position.x = engine.ground[0].render.position.x - groundWidth * scale;

		}
	}
	if (engine.input.isKeyDown('ArrowRight')) {
		engine.player.frame = 3;
		engine.player.frame_idle = 1;
		engine.player.frame_shot = 5;
		engine.player.translate(3, 0);

		if ((Math.floor(-engine.camera.x / groundWidth / scale)) % 3 == 0) {
 
			engine.ground[2].render.position.x = engine.ground[1].render.position.x + groundWidth * scale;

		} else if ((Math.floor(-engine.camera.x / groundWidth / scale)) % 3 == 1) {

			engine.ground[0].render.position.x = engine.ground[2].render.position.x + groundWidth * scale;

		} else if ((Math.floor(-engine.camera.x / groundWidth / scale)) % 3 == 2) {

			engine.ground[1].render.position.x = engine.ground[0].render.position.x + groundWidth * scale;

		}
	}
	if (!engine.input.isKeyDown('ArrowLeft') && !engine.input.isKeyDown('ArrowRight')) {
		engine.player.frame = engine.player.frame_idle;
		engine.player.translate(0, 0);
	}
	if (!engine.input.isKeyDown('ArrowLeft') && !engine.input.isKeyDown('ArrowRight') && engine.input.isKeyDown('ControlLeft')) {
		engine.player.frame = engine.player.frame_shot;
		if (engine.player.render[engine.player.frame_shot].frame == engine.player.render[engine.player.frame_shot].frameCount / 2 + engine.player.render[engine.player.frame_shot].frameStart) {
			engine.bullet.addBullet(engine.player.position + engine.player.render[0].frameWidth);
		}
		engine.player.translate(0, 0);
	}
	if (!engine.input.isKeyDown('ControlLeft')) {
		engine.player.render[engine.player.frame_shot].frame = engine.player.render[engine.player.frame_shot].frameStart;
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
