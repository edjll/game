let engine = new Engine(),
	width = engine.canvas.height / 2000 * 2474;

engine.addGround(new Ground('./image/ground_1.png', width, engine.canvas.height), 0);
engine.addGround(new Ground('./image/ground_2.png', width, engine.canvas.height, width + 1), 1);

engine.update = (dt) => {
	if (Math.floor(-engine.camera.x / width)) {
		if ((Math.floor(-engine.camera.x / width)) % 2 == 0) {
			engine.ground[1].render.position.x = engine.ground[0].render.position.x + width + 1;
		} else if ((Math.floor(-engine.camera.x / width)) % 2 == 1) {
			engine.ground[0].render.position.x = engine.ground[1].render.position.x + width + 1;
		}
	}

	engine.camera.x -= 3;
}
