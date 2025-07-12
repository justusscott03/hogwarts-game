class Cursor {

    constructor (x, y, images, gamepad) {
        this.x = x;
        this.y = y;
        this.arc = 0;
        this.size = 50;
        this.images = images;
        this.gamepad = gamepad;
    }
        
    update () {
        if (!this.gamepad.isConnected()) {
            this.x = mouseX;
            this.y = mouseY;
        }
        else {
            let leftStick = this.gamepad.stickPos("left");
            
            this.x += movement(leftStick.x * 5);
            this.y += movement(leftStick.y * 5);
        }
    }
        
    draw () {
        ctx.globalAlpha = 1;

        image(this.images.cursorRings, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
        
        this.arc++;
        pushMatrix();
            translate(this.x, this.y);
            rotate(this.arc);
            image(this.images.cursorArcs, -this.size / 2, -this.size / 2, this.size, this.size);
        popMatrix();
    }

}

export { Cursor };