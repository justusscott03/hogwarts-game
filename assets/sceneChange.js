import { fill, noStroke } from "../PJS/colors.js";
import { rect } from "../PJS/shapes.js";
import { constrain } from "../PJS/math.js";

class SceneChange {

    constructor () {
        this.nextScene = "game";
        this.mode = "out";
        this.opac = 255;
        this.changeSpeed = 10;
    }
        
    draw () {
        noStroke();
        fill(0, 0, 0, this.opac);
        rect(0, 0, 600, 600);
    }
    
    reset (nextScene) {
        if (this.mode === "out") {
            this.opac = 0;
            this.mode = "in";
            this.nextScene = nextScene;
        }
    }
    
    pack () {
        if (this.mode === "in") {
            this.opac += this.changeSpeed;
            if (this.opac >= 255) {
                this.mode = "out";
                window.scene = this.nextScene;
            }
        }
        else {
            this.opac -= this.changeSpeed;
        }
        this.draw();
        this.opac = constrain(this.opac, 0, 255);
    }

}

export { SceneChange };