let engine = new Engine(),
	scale = engine.canvas.height / 2000,
	groundWidth = 2474,
	groundHeight = 2000;

engine.addGround(new Ground('./image/ground_1.png', groundWidth, groundHeight, scale));
engine.addGround(new Ground('./image/ground_2.png', groundWidth, groundHeight, scale));

engine.player = new Player('./image/stay.png', 20, engine.canvas.height * 0.72, scale);

engine.update = (dt) => {
	if ((Math.floor(-engine.camera.x / groundWidth / scale)) % 2 == 0) {
		engine.ground[1].render.position.x = engine.ground[0].render.position.x + groundWidth * scale;
	} else if ((Math.floor(-engine.camera.x / groundWidth / scale)) % 2 == 1) {
		engine.ground[0].render.position.x = engine.ground[1].render.position.x + groundWidth * scale;
	}


	if (engine.input.isKeyDown('ArrowLeft')) {
		engine.player.frame = 0;
		engine.player.translate(-3, 0);
	}
	if (engine.input.isKeyDown('ArrowRight')) {
		engine.player.frame = 0;
		engine.player.translate(3, 0);
	}

	//camera position
	let localPosition = engine.getLocalPosition(engine.player);

	//player translate to left
	if (localPosition.x < engine.canvas.width * 0.4) {
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
