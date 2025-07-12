class Entity {

    constructor (x, y, s) {
        this.x = x;
        this.y = y;
        this.s = s;

        this.velx = 0;
        this.vely = 0;

        this.r = 0;
        this.scale = 1;

        this.dead = false;
    }

}

export { Entity };