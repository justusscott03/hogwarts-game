class Vector {

    constructor (x, y) {
        this.x = x;
        this.y = y;
    }

    add (v) {
        return new Vector(this.x + v.x, this.y + v.y);
    }

    subtract (v) {
        return new Vector(this.x - v.x, this.y - v.y);
    }

    multiply (scalar) {
        return new Vector(this.x * scalar, this.y * scalar);
    }

    magnitude () {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    normalize () {
        const mag = this.magnitude();
        return mag === 0 ? new Vector(0, 0) : new Vector(this.x / mag, this.y / mag);
    }

}

export { Vector };