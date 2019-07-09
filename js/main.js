let engine = new Engine();
engine.addGround(new Ground('./image/ground_1.png', engine.canvas.width, engine.canvas.height), 0);
engine.addGround(new Ground('./image/ground_2.png', engine.canvas.width, engine.canvas.height, engine.canvas.width + 1), 1);

engine.update = (dt) => {
	if (Math.floor(-engine.camera.x / engine.canvas.width)) {
		if ((Math.floor(-engine.camera.x / engine.canvas.width)) % 2 == 0) {
			engine.ground[1].render.position.x = engine.ground[0].render.position.x + engine.canvas.width + 1;
		} else if ((Math.floor(-engine.camera.x / engine.canvas.width)) % 2 == 1) {
			engine.ground[0].render.position.x = engine.ground[1].render.position.x + engine.canvas.width + 1;
		}
	}

	engine.camera.x -= 1;
}
