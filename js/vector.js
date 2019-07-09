class Vector {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	plus(element) {
		return new Vector(this.x + element.x, this.y + element.y);
	}
}