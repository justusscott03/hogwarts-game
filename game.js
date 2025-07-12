// Import custom processing.js library
import { color, fill, noFill, background, noStroke, strokeWeight, stroke, lerpColor } from "./PJS/colors.js";
import { beginShape, endShape, vertex, bezierVertex, strokeJoin } from "./PJS/complexShapes.js";
import { random, dist, constrain, min, max, abs, log, pow, sq, sqrt, round, ceil, floor, map, lerp, noise } from "./PJS/math.js";
import { get, cursor } from "./PJS/other.js";
import { rect, arc, ellipse, triangle, quad, image, line, point, bezier, ellipseMode, rectMode, strokeCap } from "./PJS/shapes.js";
import { textFont, createFont, textSize, textAlign, text } from "./PJS/text.js";
import { pushMatrix, translate, rotate, scale, popMatrix, resetMatrix } from "./PJS/transformation.js";
import { radians, degrees, sin, cos, tan, asin, acos, atan, atan2 } from "./PJS/trigonometry.js";

import { Gamepad } from "./assets/gamepad.js";

function resetCanvas (canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalAlpha = 1.0;
    ctx.globalCompositeOperation = "source-over";
    ctx.lineWidth = 1.0;
    ctx.lineCap = "butt";
    ctx.lineJoin = "miter";
    ctx.miterLimit = 10;
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = "#000000";
    ctx.font = "10px sans-serif";
    ctx.textAlign = "start";
    ctx.textBaseline = "alphabetic";
}

class Game {

    constructor (startScene) {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d", { willReadFrequently : true });

        this.scenes = [];
        this.currentScene = startScene;

        this.images = {
            cursorRings : function () {
        
                background(0, 0, 0, 0);
                
                noFill();
                
                for (let i = 0; i < 5; i++) {
                    strokeWeight(i);
                    stroke(255, 245, 110, 255 - i * 50);
                    ellipse(25, 25, 45, 45);
                    ellipse(25, 25, 10, 10);
                }
                
                return get(0, 0, 50, 50);
                
            },
            cursorArcs : function () {
                
                background(0, 0, 0, 0);
                
                noFill();
        
                for (let i = 0; i < 5; i++) {
                    strokeWeight(i);
                    stroke(255, 245, 110, 255 - i * 50);
                    arc(25, 25, 30, 30, 215, 325);
                    arc(25, 25, 30, 30, 35, 145);
                }
                
                return get(0, 0, 50, 50);
                
            },
            force : function () {
                
                background(0, 0, 0, 0);
        
                ctx.save();
        
                    ctx.beginPath();
                    quad(50, 0, 100, 50, 50, 100, 0, 50);
                    ctx.clip();
        
                    noStroke();
                    for (let i = 0; i < 100; i++) {
                        let lerpC = lerpColor(color(175, 0, 255), color(75, 0, 100), i / 100);
                        fill(lerpC);
                        rect(0, i, 100, 1);
                    }
        
                ctx.restore();
                
                noFill();
                strokeWeight(4);
                stroke(176, 123, 0);
                quad(50, 0, 100, 50, 50, 100, 0, 50);
                strokeWeight(1);
                stroke(255);
                quad(50, 0, 100, 50, 50, 100, 0, 50);
                
                return get(0, 0, 100, 100);
                
            },
            control : function () {
                
                background(0, 0, 0, 0);
        
                ctx.save();
        
                    ctx.beginPath();
                    quad(50, 0, 100, 50, 50, 100, 0, 50);
                    ctx.clip();
        
                    noStroke();
                    for (let i = 0; i < 100; i++) {
                        let lerpC = lerpColor(color(255, 242, 0), color(179, 167, 0), i / 100);
                        fill(lerpC);
                        rect(0, i, 100, 1);
                    }
        
                ctx.restore();
                
                noFill();
                strokeWeight(4);
                stroke(176, 123, 0);
                quad(50, 0, 100, 50, 50, 100, 0, 50);
                strokeWeight(1);
                stroke(255);
                quad(50, 0, 100, 50, 50, 100, 0, 50);
                
                return get(0, 0, 100, 100);
                
            },
            power : function () {
                
                background(0, 0, 0, 0);
        
                ctx.save();
        
                    ctx.beginPath();
                    quad(50, 0, 100, 50, 50, 100, 0, 50);
                    ctx.clip();
        
                    noStroke();
                    for (let i = 0; i < 100; i++) {
                        let lerpC = lerpColor(color(255, 0, 0), color(150, 0, 0), i / 100);
                        fill(lerpC);
                        rect(0, i, 100, 1);
                    }
        
                ctx.restore();
                
                noFill();
                strokeWeight(4);
                stroke(176, 123, 0);
                quad(50, 0, 100, 50, 50, 100, 0, 50);
                strokeWeight(1);
                stroke(255);
                quad(50, 0, 100, 50, 50, 100, 0, 50);
                
                return get(0, 0, 100, 100);
                
            },
            forbidden : function () {
                
                background(0, 0, 0, 0);
        
                ctx.save();
        
                    ctx.beginPath();
                    quad(50, 0, 100, 50, 50, 100, 0, 50);
                    ctx.clip();
        
                    noStroke();
                    for (let i = 0; i < 100; i++) {
                        let lerpC = lerpColor(color(96, 196, 92), color(30, 97, 32), i / 100);
                        fill(lerpC);
                        rect(0, i, 100, 1);
                    }
        
                ctx.restore();
                
                noFill();
                strokeWeight(4);
                stroke(176, 123, 0);
                quad(50, 0, 100, 50, 50, 100, 0, 50);
                strokeWeight(1);
                stroke(255);
                quad(50, 0, 100, 50, 50, 100, 0, 50);
                
                return get(0, 0, 100, 100);
                
            },
            button : function () {
                
                background(0, 0, 0, 0);
                
                let xOff = 0;
                for (let x = 0; x < 100; x++) {
                    let yOff = 0;
                    for (let y = 0; y < 100; y++) {
                        let bright = round(map(noise(xOff, yOff), 0, 1, 0, 255));
                        fill(bright);
                        point(x, y);
                        yOff += 0.02;
                    }
                    xOff += 0.02;
                }
                
                noStroke();
                fill(0, 106, 255, 100);
                rect(0, 0, 100, 100);
                
                fill(230, 215, 0);
                quad(2, 2, 6, 6, 94, 6, 98, 2);
                
                fill(207, 193, 0);
                quad(2, 98, 6, 94, 94, 94, 98, 98);
                
                fill(184, 172, 0);
                quad(2, 2, 6, 6, 6, 94, 2, 98);
                
                fill(255, 244, 125);
                quad(98, 2, 94, 6, 94, 94, 98, 98);
                
                strokeWeight(5);
                stroke(255, 238, 0);
                noFill();
                rect(0, 0, 100, 100);
                
                return get(0, 0, 100, 100);
                
            },
            input : function () {
                
                background(0, 0, 0, 0);
           
                let xOff = 0;
                for (let x = 0; x < 300; x++) {
                    let yOff = 0;
                    for (let y = 0; y < 40; y++) {
                        let bright = round(map(noise(xOff, yOff), 0, 1, 0, 255));
                        fill(bright);
                        point(x, y);
                        yOff += 0.02;
                    }
                    xOff += 0.02;
                }
                
                noStroke();
                fill(0, 106, 255, 100);
                rect(0, 0, 300, 40);
                
                fill(230, 215, 0);
                quad(2, 2, 6, 6, 294, 6, 298, 2);
                
                fill(207, 193, 0);
                quad(2, 38, 6, 34, 294, 34, 298, 38);
                
                fill(184, 172, 0);
                quad(2, 2, 6, 6, 6, 34, 2, 38);
                
                fill(255, 244, 125);
                quad(298, 2, 294, 6, 294, 34, 298, 38);
                
                strokeWeight(5);
                stroke(255, 238, 0);
                noFill();
                rect(0, 0, 300, 40);
                
                return get(0, 0, 300, 40);
                
            },
            noiseSquare : function () {
                
                background(0, 0, 0, 0);
                
                let xOff = 0;
                for (let x = 0; x < 300; x++) {
                    let yOff = 0;
                    for (let y = 0; y < 300; y++) {
                        let bright = round(map(noise(xOff, yOff), 0, 1, 0, 255));
                        fill(bright);
                        point(x, y);
                        yOff += 0.02;
                    }
                    xOff += 0.02;
                }
                
                return get(0, 0, 300, 300);
                
            },
            leftArrow : function () {
                
                background(0, 0, 0, 0);
                
                noStroke();
                
                fill(0);
                rect(50, 40, 100 / 3, 20);
                triangle(50, 25, 50, 75, 12.5, 50);
                
                return get(0, 0, 100, 100);
                
            },
            rightArrow : function () {
                
                background(0, 0, 0, 0);
                
                noStroke();
                
                fill(0);
                rect(50 / 3, 40, 100 / 3, 20);
                triangle(50, 25, 50, 75, 87.5, 50);
                
                return get(0, 0, 100, 100);
                
            },
            miniPlayer : function () {
                
                background(0, 0, 0, 0);
                
                noStroke();
                
                fill(198, 134, 66);
                ellipse(25, 20, 30, 30);
                ellipse(12, 35, 12, 12);
                ellipse(38, 35, 12, 12);
                
                fill(255, 255, 255, 30);
                ellipse(24, 19, 24, 24);
                ellipse(11.5, 34.5, 9, 9);
                ellipse(37.5, 34.5, 9, 9);
                
                return get(0, 0, 50, 50);
                
            },
            miniEye : function () {
                
                background(0, 0, 0, 0);
                
                noStroke();
        
                fill(255);
                ellipse(25, 25, 30, 30);
                
                fill(135, 206, 235);
                ellipse(25, 25, 15, 15);
                
                fill(0);
                ellipse(25, 25, 10, 10);
                
                return get(0, 0, 50, 50);
                
            },
            miniCloak : function () {
                
                background(0, 0, 0, 0);
                
                noStroke();
                
                fill(50);
                arc(32, 43, 20, 50, 270, 361);
                arc(25, 20, 20, 30, 180, 360);
                
                fill(25);
                rect(18, 18, 14, 25);
                
                fill(0);
                arc(18, 43, 20, 50, 180, 270);
                arc(25, 20, 15, 25, 180, 360);
                
                return get(0, 0, 50, 50);
                
            },
            basicCast : function () {
                
                background(0, 0, 0, 0);
                
                pushMatrix();
                    translate(3, 30);
                    for (let i = 0; i < 20; i++) {
                        noStroke();
                        
                        let lerpC = lerpColor(color(255, 0, 0), color(255), i / 20);
                        
                        pushMatrix();
                            scale((20 - i) / 20);
                            
                            fill(lerpC);
                            beginShape();
                                vertex(0, -30);
                                bezierVertex(-2, -15, -5, 0, 0, 15);
                                bezierVertex(5, 0, 2, -15, 0, -30);
                            endShape();
                        popMatrix();
                    }
                popMatrix();
                
                return get(0, 0, 6, 45);
                
            },
            wand1 : function () {
                
                background(0, 0, 0, 0);
                
                strokeCap("ROUND");
                stroke(133, 96, 41);
                strokeWeight(4);
                line(25, 7, 25, 43);
                
                return get(0, 0, 50, 50);
                
            },
            wand2 : function () {
                
                background(0, 0, 0, 0);
                
                noFill();
                strokeCap("ROUND");
                stroke(87, 55, 11);
                strokeWeight(4);
                beginShape();
                    vertex(25, 43);
                    vertex(25, 30);
                    vertex(28, 20);
                    vertex(25, 12);
                    vertex(25, 7);
                endShape();
                
                return get(0, 0, 50, 50);
                
            },
            wand3 : function () {
                
                background(0, 0, 0, 0);
                
                noFill();
                strokeCap("ROUND");
                stroke(217, 203, 185);
                strokeWeight(4);
                line(25, 7, 25, 43);
                for (let i = 0; i < 12; i++) {
                    let lerpC = lerpColor(color(163, 136, 57), color(0), i / 12);
                    
                    stroke(lerpC);
                    strokeCap("SQUARE");
                    strokeWeight(1);
                    line(23, i + 30, 27, i + 30);
                }
                
                return get(0, 0, 50, 50);
                
            },
        };
        this.curLoad = 0;
        this.loaded = false;
        
        this.sceneChangeProps = {
            nextScene : "game",
            mode : "out",
            opac : 255,
            changeSpeed : 10,
            active : false
        };
    }

    loadImages () {
        let obj = Object.keys(this.images);

        resetCanvas(this.canvas, this.ctx);
        
        this.images[obj[this.curLoad]] = this.images[obj[this.curLoad]]();
        
        this.curLoad++;
        
        if (this.curLoad >= Object.keys(this.images).length) {
            this.loaded = true;
        }
    }

    addScene (scene) {
        this.scenes.push(scene);
    }
    
    sceneChange (newScene) {

        const foundScene = this.scenes.find((scene) => scene.name === newScene);

        if (foundScene) {
            this.sceneChangeProps.nextScene = newScene;
            this.sceneChangeProps.active = true;
            this.sceneChangeProps.mode = "in";
        }
        else {
            console.error(`Invalid scene name: ${newScene}`);
        }

    }

    run () {
        if (!this.loaded) {
            this.loadImages();
        }
        else {
            //RUN EVERYTHING ELSE
        }

        console.log("running")

        if(this.sceneChangeProps.active) {
            if (this.sceneChangeProps.mode === "in") {
                this.sceneChangeProps.opac += this.sceneChangeProps.changeSpeed;
                if (this.sceneChangeProps.opac >= 255) {
                    this.sceneChangeProps.mode = "out";
                    this.currentScene = this.sceneChangeProps.nextScene;
                }
            }
            else {
                this.sceneChangeProps.opac -= this.sceneChangeProps.changeSpeed;
            }

            //draw the curtain
            noStroke();
            fill(0, 0, 0, this.opac);
            rect(0, 0, window.width, window.height);

            this.sceneChangeProps.opac = constrain(this.sceneChangeProps.opac, 0, 255);

            this.sceneChangeProps.active = (this.sceneChangeProps.opac === 0);

        }

        requestAnimationFrame(() => this.run());

    }
}

export { Game };