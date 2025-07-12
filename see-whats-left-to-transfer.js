// Import custom processing.js library
import { color, fill, noFill, background, noStroke, strokeWeight, stroke, lerpColor } from "pjs/colors.js";
import { beginShape, endShape, vertex, bezierVertex, strokeJoin } from "pjs/complexShapes.js";
import { random, dist, constrain, min, max, abs, log, pow, sq, sqrt, round, ceil, floor, map, lerp, noise } from "pjs/math.js";
import { get, cursor } from "pjs/other.js";
import { rect, arc, ellipse, triangle, quad, image, line, point, bezier, ellipseMode, rectMode, strokeCap } from "pjs/shapes.js";
import { textFont, createFont, textSize, textAlign, text } from "pjs/text.js";
import { pushMatrix, translate, rotate, scale, popMatrix, resetMatrix } from "pjs/transformation.js";
import { radians, degrees, sin, cos, tan, asin, acos, atan, atan2 } from "pjs/trigonometry.js";

// Import classes
import { Gamepad } from "assets/gamepad.js";
import { SceneChange } from "assets/sceneChange.js";
import { Entity } from "./assets/entity.js";

// Initialization   
rectMode("CORNER");
ellipseMode("CENTER");
textSize(15);

// For sizing the screen {

// Original screen width and height
const originalWidth = 1872;
const originalHeight = 962;

// Current width and height
let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;

// Original aspect ratio
const aspectRatio = originalWidth / originalHeight;

// New width and height
let scaledWidth, scaledHeight;
if (screenWidth / screenHeight > aspectRatio) {
    scaledHeight = screenHeight;
    scaledWidth = scaledHeight * aspectRatio;
}
else {
    scaledWidth = screenWidth;
    scaledHeight = scaledWidth / aspectRatio;
}

// Function for reducing the frequency at which another function is called
function debounce (func, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(function () { func.apply(this, args) }, delay);
    }
}

// Update the width and height if the window is resized
window.addEventListener("resize", debounce(
    function (event) {
        screenWidth = window.innerWidth;
        screenHeight = window.innerHeight;
        if (screenWidth / screenHeight > aspectRatio) {
            scaledHeight = screenHeight;
            scaledWidth = scaledHeight * aspectRatio;
        }
        else {
            scaledWidth = screenWidth;
            scaledHeight = scaledWidth / aspectRatio;
        }
    }, 300
));

// Get the canvas
let canvas = document.getElementById("canvas");

// Make the canvas width the original width and height (it's scaled down in the draw function)
canvas.width = originalWidth;
canvas.height = originalHeight;

window.width = canvas.width;
window.height = canvas.height;

const halfWidth = window.width / 2;
const halfHeight = window.height / 2;

//}

/**

Credit to SP(@Prodigy6) for the outlined text from their project, The Temple of Itzomar: https://www.khanacademy.org/computer-programming/the-temple-of-itzomar/6253229457391616

Credit to Vicioustrex(@Vicioustrex) for the circle-to-circle and circle-to-rect collisions from their project, Airsoft Battle: https://www.khanacademy.org/computer-programming/airsoft-battle/6722101637464064

Credit to NonPlayerCharacter (he/him)(@JustASideQuestNPC) for the gamepad compatibility from their project, Gamepad Input! (Yes, really): https://www.khanacademy.org/computer-programming/gamepad-input-yes-really/6269103118401536

**/

/** Lots of variables **/
// [

window.scene = "charCreation";

window.requiresFirstVertex = true;
window.angleMode = "degrees";
window.globalFont = "serif";
window.globalSize = 10;

let selectedButtons = [];
let difficulty = "normal";
let gameMovement = 1;
function movement (motion) {
    return motion * gameMovement;
}

// Player creation {

let charCreateMode = "skinTone";
let eyeColorIndex = 2;
let skinToneIndex = 2;
let cloakColorIndex = 11;
const eyeColors = [
    color(135, 206, 235),
    color(85, 170, 85),
    color(150, 100, 50),
    color(204, 128, 51),
    color(192, 192, 192),
    color(75, 54, 33)
];
const skinTones = [
    color(230, 201, 172), 
    color(214, 171, 124), 
    color(194, 146, 95),
    color(194, 138, 78),
    color(128, 87, 37),
    color(97, 66, 29), 
    color(92, 56, 12), 
    color(64, 37, 4)
];
const cloakColors = [
    color(178, 50, 36),
    color(0, 104, 198),
    color(50, 205, 0),
    color(55, 0, 90),
    color(200, 68, 68),
    color(110, 220, 0),
    color(0, 140, 190),
    color(200, 0, 90),
    color(0),
    color(50),
    color(100),
    color(150),
    color(200),
    color(255)
];
let creationIndex = 1;
const notReady = {
    active : false,
    opac : 0
};

//}

const cam = {
    x : 0,
    y : 0,
    z : 1
};

// Goblin data {

const goblinData = {
    assasin : {
        health : 400,
        attackSpeed : 120,
        range : 90,
        damage : 80,
        moveSpeed : 0
    },
    commander : {
        health : 700,
        attackSpeed : 180,
        range : 100,
        damage : 120,
        moveSpeed : 0
    },
    ranger : {
        health : 200,
        attackSpeed : 240,
        range : 400,
        damage : 40,
        moveSpeed : 0
    },
    sentinel : {
        health : 500,
        attackSpeed : 240,
        range : 80,
        damage : 70,
        moveSpeed : 0
    },
    warrior : {
        health : 300,
        attackSpeed : 360,
        range : 60,
        damage : 60,
        moveSpeed : 0
    }
};

//}

// Spell data {

const spells = {
    basicCast : {
        name : "basicCast",
        damage : 5,
        knockback : 0,
        stun : false,
        reload : 10,
        speed : 15
    },
};

//}

/** Outlined text, credit to SP(@Prodigy6) **/
// [

let outlinedText = function (t, x, y, f, s, w) {
    fill(s);
    for(let i = 0; i < 30; i++) {
        text(t, x + sin(i * 16) * w / 16, y + cos(i * 16) * w / 16);
    }
    fill(f);
    text(t, x, y);
};

//]

/** User interaction **/
// [

let typed = false;
let clicked = false;

let keys = [];
let key;
window.keyPressed = function (event) {
    keys[event.keyCode] = true;
    key = event.keyCode;
};
window.keyReleased = function (event) {
    keys[event.keyCode] = false;
};

window.keyTyped = function (event) {
    typed = true;
};

let mouseX, mouseY;
window.mouseMove = function (event) {
    mouseX = event.clientX * (originalWidth / window.innerWidth);
    mouseY = event.clientY * (originalHeight / window.innerHeight);
};

window.mouseClicked = function (event) {
    clicked = true;
};

//]

/** Collision **/
// [

let rectCircCol =  function (rx, ry, rw, rh, cx, cy, cr) {
    let clx = Math.max(rx, Math.min(cx, rx + rw));
    let cly = Math.max(ry, Math.min(cy, ry + rh));
    
    let dx = cx - clx;
    let dy = cy - cly;
    let ds = dx * dx + dy * dy;
    
    return ds < cr * cr;
};

let circCircCol = function (cx, cy, cd, cx2, cy2, cd2) {
    if (dist(cx, cy, cx2, cy2) < cd / 2 + cd2 / 2) {
        return true;
    } 
    else {
        return false;
    }
};

//]

/** Define some objects **/
// [

const gamepad = new Gamepad();
const sceneChange = new SceneChange();

//]

/** Fancy cursor **/
// [

class Cursor {

    constructor (x, y) {
        this.x = x;
        this.y = y;
        this.arc = 0;
        this.size = 50;
    }
        
    update () {
        if (!gamepad.isConnected()) {
            this.x = mouseX;
            this.y = mouseY;
        }
        else {
            let leftStick = gamepad.stickPos("left");
            
            this.x += movement(leftStick.x * 5);
            this.y += movement(leftStick.y * 5);
        }
    }
        
    draw () {
        ctx.globalAlpha = 1;

        image(images.cursorRings, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
        
        this.arc++;
        pushMatrix();
            translate(this.x, this.y);
            rotate(this.arc);
            image(images.cursorArcs, -this.size / 2, -this.size / 2, this.size, this.size);
        popMatrix();
    }

}

const cursro = new Cursor(300, 300);

//]

/** Spell cast **/
// [

class SpellCast {
    
    constructor (x, y, w, h, r, name, maxSpeed) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.r = r;
        this.name = name;
        
        this.velx = 0;
        this.vely = 0;
        this.maxSpeed = maxSpeed;
        
        this.flyTime = 0;
        this.visible = true;
        
        this.reloading = false;
        this.reloadTime = 0;
    }
        
    update () {
        this.flyTime += movement(1);
        
        if (this.flyTime > 150) {
            this.visible = false;
        }
        
        this.velx = sin(this.r + 180) * this.maxSpeed;
        this.vely = -cos(this.r + 180) * this.maxSpeed;
        
        this.x += movement(this.velx);
        this.y += movement(this.vely);
    }
    
    draw () {
        pushMatrix();
            translate(this.x, this.y);
            rotate(this.r);
            translate(-this.x, -this.y);
            image(images[this.name], this.x - this.w / 2, this.y - this.h * 2 / 3, this.w, this.h);
        popMatrix();
    }
    
}

const spellCasts = [];

//]

/** Spell diamonds for casting **/
// [

class Spell {

    constructor (x, y, w, h, t, n) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.type = t;
        this.name = n;
        this.s = 1;
        this.reload = 0;
        this.maxReload = 0;
        this.reloading = false;
        this.grayOpac = 0;
    }
        
    use () {
        if (!this.reloading) {
            this.s = 0.9;
            this.reloading = true;
        }
    }

    update () {
        if (this.type === "control") {
            this.maxReload = 200;
        }
        if (this.type === "force") {
            this.maxReload = 500;
        }
        if (this.type === "power") {
            this.maxReload = 800;
        }
        if (this.type === "forbidden") {
            this.maxReload = 1500;
        }
        
        this.s = lerp(this.s, 1, 0.1);
        
        if (this.reloading) {
            this.grayOpac = lerp(this.grayOpac, 200, 0.05);
            this.reload++;
            if (this.reload > this.maxReload) {
                this.reloading = false;
                this.reload = 0;
            }
        }
        else {
            this.grayOpac = lerp(this.grayOpac, 0, 0.05);
        }
    }
    
    draw () {
        pushMatrix();
            translate(this.x + this.w / 2, this.y + this.h / 2);
            scale(this.s);
            translate(-(this.x + this.w / 2), -(this.y + this.h / 2));
            image(images[this.type], this.x, this.y, this.w, this.h);
            //image(images[this.name], this.x, this.y, this.w, this.h);
            
            noStroke();
            fill(1, 1, 1, this.grayOpac);
            quad(this.x + this.w / 2, this.y, this.x + this.w, this.y + this.h / 2, this.x + this.w / 2, this.y + this.h, this.x, this.y + this.h / 2);
            
            let reload = map(this.reload, 0, this.maxReload, -90, 270);
            
            strokeCap("SQUARE");
            strokeWeight(5);
            stroke(150, 150, 150, this.grayOpac);
            noFill();
            arc(this.x + this.w / 2, this.y + this.h / 2, this.w / 1.8, this.h / 1.8, -90, reload);
        popMatrix();
    }

}

const spell1 = new Spell(window.width - 100, window.height - 150, 80, 80, "power");
const spell2 = new Spell(window.width - 150, window.height - 100, 80, 80, "forbidden");
const spell3 = new Spell(window.width - 150, window.height - 200, 80, 80, "control");
const spell4 = new Spell(window.width - 200, window.height - 150, 80, 80, "force");

//]

/** Sheet of four spells **/
// [

class SpellSheet {

    constructor (spell1, spell2, spell3, spell4) {
        this.spell1 = spell1;
        this.spell2 = spell2;
        this.spell3 = spell3;
        this.spell4 = spell4;
        
        this.spells = [spell1, spell2, spell3, spell4];

        this.curState = false;
        this.prevState = false;
        this.specialSpellTimer = 0;
    }
        
    draw () {

        for (let i = 0; i < this.spells.length; i++) {
            this.spells[i].update();
            this.spells[i].draw();

            if (!gamepad.isConnected()) {
                if (typed && key === i + 49) {
                    this.spells[i].use();
                }
            }
            else {
                let rightTrigger = gamepad.isPressed("right trigger");

                if (rightTrigger) {
                    this.specialSpellTimer++;
                    if (this.specialSpellTimer > 20) {
                        player.canCastSpecialSpell = true;
                        
                        this.curState = [
                            gamepad.isPressed("a"),
                            gamepad.isPressed("b"),
                            gamepad.isPressed("x"),
                            gamepad.isPressed("y")
                        ];

                        for (var j = 0; j < this.curState.length; j++) {
                            if (!this.curState[j] && this.prevState[j]) {
                                this.spells[j].use();
                            }
                        }

                        this.prevState = this.curState;
                    }
                }
                else {
                    this.specialSpellTimer = 0;
                }

                if (!rightTrigger && this.specialSpellTimer < 20) {
                    player.canCastSpecialSpell = false;
                }
            }
        }

    }

}

const spellSheet = new SpellSheet(spell1, spell2, spell3, spell4);

//]

/** Player **/
// [

class Player extends Entity {
    
    constructor (x, y, s) {
        super(x, y, s);
        
        this.maxSpeed = 3;
        
        this.witchOrWizard = null;
        this.wand = 0;
        this.eyeColor = eyeColors[eyeColorIndex];
        this.skinTone = skinTones[skinToneIndex];
        this.cloakColor = cloakColors[cloakColorIndex];
        this.name = {
            first : "",
            last : ""
        };
        
        this.health = 100;
        this.castReload = 0;
        this.reloading = false;
        this.selectedSpell = spells.basicCast;
        
        this.curState = false;
        this.prevState = false;
        this.castingSpecialSpell = false;
    }
        
    update () {
        if (!this.dead) {
            if (!gamepad.isConnected()) {
                if (keys[65] || keys[37]) {
                    this.velx--;
                }
                if (keys[68] || keys[39]) {
                    this.velx++;
                }
                if (keys[87] || keys[38]) {
                    this.vely--;
                }
                if (keys[83] || keys[40]) {
                    this.vely++;
                }
                
                if (!keys[65] && !keys[37] && !keys[68] && !keys[39]) {
                    if (this.velx > 0) {
                        this.velx--;
                    }
                    if (this.velx < 0) {
                        this.velx++;
                    }
                }
                
                if (!keys[83] && !keys[40] && !keys[87] && !keys[38]) {
                    if (this.vely > 0) {
                        this.vely--;
                    }
                    if (this.vely < 0) {
                        this.vely++;
                    }
                }
            }
            else {
                let leftStick = gamepad.stickPos("left");

                this.velx = leftStick.x * this.maxSpeed;
                this.vely = leftStick.y * this.maxSpeed;
            }
            
            this.velx = constrain(this.velx, -this.maxSpeed, this.maxSpeed);
            this.vely = constrain(this.vely, -this.maxSpeed, this.maxSpeed);
            
            this.x += movement(this.velx);
            this.y += movement(this.vely);
            
            if (this.reloading) {
                this.castReload++;
                if (this.castReload > this.selectedSpell.reload) {
                    this.castReload = 0;
                    this.reloading = false;
                }
            }
            
            if (!this.reloading && !this.canCastSpecialSpell) {
                if (clicked && !gamepad.isConnected()) {
                    spellCasts.push(new SpellCast(this.x + sin(this.r + 200) * 100, this.y - cos(this.r + 200) * 100, 6, 45, this.r, this.selectedSpell.name, this.selectedSpell.speed));
                    this.reloading = true;
                }
                else if (gamepad.isConnected()) {
                    this.curState = gamepad.isPressed("right trigger");
                    
                    if (!this.curState && this.prevState) {
                        spellCasts.push(new SpellCast(this.x + sin(this.r + 200) * 100, this.y - cos(this.r + 200) * 100, 6, 45, this.r, this.selectedSpell.name, this.selectedSpell.speed));
                        this.reloading = true;
                    }
                    
                    this.prevState = this.curState;
                }
            }
        }
    }
    
    draw () {
        
        this.eyeColor = eyeColors[eyeColorIndex];
        this.skinTone = skinTones[skinToneIndex];
        this.cloakColor = cloakColors[cloakColorIndex];
        
        noStroke();
        
        pushMatrix();
            translate(this.x, this.y);
            rotate(this.r);
            scale(this.scale);
            
            // Wand
            pushMatrix();
                rotate(180);
                if (images["wand" + this.wand] !== undefined) {
                    image(images["wand" + this.wand], this.s / 8, -this.s / 0.9, this.s / 1.5, this.s / 1.5);
                }
            popMatrix();
            
            noStroke();

            ctx.globalAlpha = 1;

            // Body
            fill(this.skinTone);
            ellipse(0, 0, this.s, this.s);
            ellipse(-this.s / 2.25, this.s / 2.25, this.s / 3.25, this.s / 3.25);
            ellipse(this.s / 2.25, this.s / 2.25, this.s / 3.25, this.s / 3.25);
            fill(255, 255, 255, 30);
            ellipse(-this.s / 50, -this.s / 50, this.s / 1.15, this.s / 1.15);
            ellipse(-this.s / 2.205, this.s / 2.295, this.s / 3.7375, this.s / 3.7375);
            ellipse(this.s / 2.295, this.s / 2.295, this.s / 3.7375, this.s / 3.7375);
            
            // Eyes
            fill(255);
            ellipse(-this.s / 5, this.s / 5, this.s / 5, this.s * 4 / 15);
            ellipse(this.s / 5, this.s / 5, this.s / 5, this.s * 4 / 15);
            
            fill(this.eyeColor);
            arc(this.s / 5, this.s * 6 / 25, this.s * 29 / 150, this.s / 7, 180, 360);
            arc(-this.s / 5, this.s * 6 / 25, this.s * 29 / 150, this.s / 7, 180, 360);
            
            fill(0);
            arc(-this.s / 5, this.s * 7 / 30, this.s * 29 / 150, this.s / 5, 0, 180);
            arc(-this.s / 5, this.s * 6 / 25, this.s * 14 / 75, this.s / 10, 180, 360);
            
            arc(this.s / 5, this.s * 7 / 30, this.s * 29 / 150, this.s / 5, 0, 180);
            arc(this.s / 5, this.s * 6 / 25, this.s * 14 / 75, this.s / 10, 180, 360);

            // Cloak
            fill(this.cloakColor);
            beginShape();
                vertex(-this.s / 2.1, this.s / 4.7);
                bezierVertex(-this.s / 1.7, this.s / 21, -this.s / 2.1, -this.s / 2.7, -this.s / 7.0, -this.s / 1.5);
                bezierVertex(-this.s / 23.3, -this.s / 2.1, this.s / 2.2, -this.s / 2.08, this.s / 2, -this.s / 6.9);
                bezierVertex(this.s / 1.6, this.s / 4.1, this.s / 3.9, -this.s / 7.3, -this.s / 19.9, this.s / 36.3);
                bezierVertex(-this.s / 5.1, this.s / 20.6, -this.s / 2.6, -this.s / 14.8, -this.s / 2.1, this.s / 4.7);
            endShape();
            
            fill(0, 0, 0, 30);
            beginShape();
                vertex(-this.s / 19.9, this.s / 36.3);
                bezierVertex(-this.s / 7.0, -this.s / 1.5, this.s / 13.1, -this.s / 5.5, -this.s / 7.0, -this.s / 1.5);
                bezierVertex(-this.s / 23.3, -this.s / 2.1, this.s / 2.2, -this.s / 2.08, this.s / 2, -this.s / 6.9);
                bezierVertex(this.s / 1.6, this.s / 4.1, this.s / 3.9, -this.s / 7.3, -this.s / 19.9, this.s / 36.3);
            endShape();
        popMatrix();
        
    }
    
}

const player = new Player(halfWidth + 400, halfHeight, 75);

//]

/** Goblin **/
// [

class Goblin extends Entity {

    constructor (x, y, s, type, level) {
        super(x, y, s);

        this.type = type;
        
        this.rendered = false;
        
        this.data = goblinData[this.type];
        this.level = level;
        
        this.health = (this.data.health * this.level) - ((this.level - 1) * 25);
    }
        
    update () {
        
        if (!this.dead) {
            this.r = atan2(player.y - this.y, player.x - this.x) - 90;
        }
        
        if (dist(this.x, this.y, player.x, player.y) < 1000) {
            this.rendered = true;
        }
        else {
            this.rendered = false;
        }

        if (this.health <= 0) {
            this.dead = true;
        }
        
    }
    
    draw () {
        
        if (this.rendered && !this.dead) {
            pushMatrix();
                translate(this.x, this.y);
                rotate(this.r);
                scale(this.scale);
                noStroke();
                fill(0);
                ellipse(0, 0, this.s, this.s);
                
                fill(255);
                ellipse(0, this.s / 4, this.s / 8, this.s / 8);
            popMatrix();
        }
        
    }
    
    damage (spell) {
        this.health -= spells[spell].damage;
    }

}

const goblins = [];
goblins.add = function (x, y, s, type, level) {
    this.push(new Goblin(x, y, s, type, level));
};

//]

/** Collision box **/
// [

class CollisionBox {

    constructor (x, y, w, h, type) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.type = type;
    }
        
    run () {
        fill(0);
        if (this.type === "rect") {
            rect(this.x, this.y, this.w, this.h);
        }
        else if (this.type === "circ") {
            ellipse(this.x, this.y, this.w, this.h);
        }
        
        if (dist(player.x, player.y, this.x, this.y) < 600) {
            if (this.type === "circ") {
                if (circCircCol(this.x, this.y, this.w, player.x, player.y, player.s)) {
                    let angle = atan2(player.x - this.x, player.y - this.y);
                    
                    player.x = this.x - cos(angle + 90) * (this.w / 2 + player.s / 2);
                    player.y = this.y + sin(angle + 90) * (this.w / 2 + player.s / 2);
                }
            }
            
            if (this.type === "rect") {
                if (rectCircCol(this.x, this.y, this.w, this.h, player.x, player.y, player.s / 2)) {
                    if (player.x < this.x) {
                        player.x -= player.maxSpeed;
                    }
                    if (player.y < this.y) {
                        player.y -= player.maxSpeed;
                    }
                    if (player.x > this.x + this.w) {
                        player.x += player.maxSpeed;
                    }
                    if (player.y > this.y + this.h) {
                        player.y += player.maxSpeed;
                    }
                }
            }
        }
        
        for (let i = 0; i < goblins.length; i++) {
            let g = goblins[i];
            
            if (g.rendered && dist(this.x, this.y, g.x, g.y) < 600 && !g.dead) {
                if (this.type === "circ") {
                    if (circCircCol(this.x, this.y, this.w, g.x, g.y, g.s)) {
                        let angle = Math.atan2(g.x - this.x, g.y - this.y);
                        
                        g.x = this.x - cos(angle + 90) * (g.s / 2 + this.w / 2);
                        g.y = this.y + sin(angle + 90) * (g.s / 2 + this.w / 2);
                    }
                }
                
                if (this.type === "rect") {
                    if (rectCircCol(this.x, this.y, this.w, this.h, g.x, g.y, g.s / 2)) {
                        if (g.x < this.x) {
                            g.x -= g.maxSpeed;
                        }
                        if (g.y < this.y) {
                            g.y -= g.maxSpeed;
                        }
                        if (g.x > this.x + this.w) {
                            g.x += g.maxSpeed;
                        }
                        if (g.y > this.y + this.h) {
                            g.y += g.maxSpeed;
                        }
                    }
                }
            }
        }
        
        for (let i = spellCasts.length - 1; i >= 0; i--) {
            let s = spellCasts[i];
            if (dist(this.x, this.y, s.x, s.y) < 600) {
                if ((this.type === "circ" && circCircCol(s.x, s.y, s.w, this.x, this.y, this.w)) || (this.type === "rect" && rectCircCol(this.x, this.y, this.w, this.h, s.x, s.y, s.w / 2))) {
                    spellCasts.splice(i, 1);
                }
            }
        }
    }

}

const collisionBoxes = [];
collisionBoxes.add = function (x, y, w, h, type) {
    this.push(new CollisionBox(x, y, w, h, type));
};

//]

/** Map loading **/
// [

let loadMap = function () {
    collisionBoxes.add(500, 500, 200, 200, "rect");
    collisionBoxes.add(100, 100, 50, 50, "circ");
    goblins.add(300, 300, 75, "assasin", 1);
};
loadMap();

//]

/** Inventory **/
// [

class Inventory {

    constructor () {
        this.items = [];
        this.sortBy = "collection";
    }

    open () {
        sceneChange.reset("inventory");
    }

    close () {
        sceneChange.reset("game");
    }

}

const inventory = new Inventory();

//]

/** Text inputs **/
// [

class Input {

    constructor (x, y, w, h, value = "", maxlength) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.blinkTimer = 0;
        this.selected = false;
        this.mouseOver = false;
        
        this.curState = false;
        this.prevState = false;

        this.input = document.createElement("input");
        this.input.style = `position: absolute; opacity: 0; pointer-events: all; left: ${this.x}px; top: ${this.y}px; width: ${this.w}px; height: ${this.h}px;`;
        this.input.type = "text";
        this.input.maxlength = maxlength;
        this.input.value = value;

        document.body.appendChild(this.input);
    };
        
    draw () {
        this.mouseOver = cursro.x > this.x &&
                            cursro.x < this.x + this.w &&
                            cursro.y > this.y &&
                            cursro.y < this.y + this.h;
            
        if (this.mouseOver) {
            cursor("pointer");
        }
        
        if (clicked && !gamepad.isConnected()) {
            if (this.mouseOver) {
                this.selected = true;
            }
            else {
                this.selected = false;
            }
        }
        else if (gamepad.isConnected()) {
            this.curState = gamepad.isPressed("a");
            
            if (!this.curState && this.prevState) {
                if (this.mouseOver) {
                    this.selected = true;
                }
                else {
                    this.selected = false;
                }
            }
            
            this.prevState = this.curState;
        }
        
        this.blinkTimer++;
        
        pushMatrix();
            
            translate(this.x, this.y);
            scale(this.w / 300, this.h / 40);
            translate(-this.x, -this.y);
            
            if (this.selected) {
                for (let i = 0; i < 5; i++) {
                    fill(255, 255, 255, 255 - i * 50);
                    rect(this.x - i, this.y - i, this.w + i * 2, this.h + i * 2, 5);
                }
            }
            
            ctx.globalAlpha = 1;
            image(images.input, this.x, this.y, this.w, this.h);
            
            textFont(createFont("monospace"));
            textAlign("LEFT", "CENTER");
            textSize(20);

            if (this.blinkTimer % 80 < 40 && this.selected) {
                outlinedText("|", this.x + this.input.value.length * 11 + 9, this.y + this.h / 2, color(255), color(0), 20);
            }

            outlinedText(this.input.value, this.x + 9, this.y + this.h / 2, color(255), color(0), 20);
        popMatrix();
    }

}

const firstName = new Input(halfWidth - 800, halfHeight - 150, 343.75, 275 / 6, "First Name", 20);
const lastName = new Input(halfWidth - 306.25, halfHeight - 150, 343.75, 275 / 6, "Last Name", 20);

//]

/** Button **/
// [

class Button {
    
    constructor (x, y, w, h, func, icon, type, type2) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.func = func;
        this.icon = icon;
        this.type = type;
        this.type2 = type2;
        this.mouseOver = false;
        this.fade = (this.type.includes("default") ? 100 : 0);
        
        this.s = 1;
        
        this.curState = false;
        this.prevState = false;
    }
        
    draw () {
        
        this.mouseOver = cursro.x > this.x &&
                         cursro.x < this.x + this.w &&
                         cursro.y > this.y &&
                         cursro.y < this.y + this.h;
                            
        if (this.mouseOver) {
            cursor("pointer");
            this.s = lerp(this.s, 1.05, 0.1);
            if (clicked && !gamepad.isConnected()) {
                this.func();
                if (this.type.includes("fadeSelect")) {
                    for (let i = 0; i < selectedButtons.length; i++) {
                        if (selectedButtons[i].type2 === this.type2) {
                            selectedButtons.splice(i, 1);
                        }
                    }
                    selectedButtons.push(this);
                }
            }
            else if (gamepad.isConnected()) {
                this.curState = gamepad.isPressed("a");
                
                if (!this.curState && this.prevState) {
                    this.func();
                    if (this.type.includes("fadeSelect")) {
                        for (let i = 0; i < selectedButtons.length; i++) {
                            if (selectedButtons[i].type2 === this.type2) {
                                selectedButtons.splice(i, 1);
                            }
                        }
                        selectedButtons.push(this);
                    }
                }
                
                this.prevState = this.curState;
            }
        }
        else {
            this.s = lerp(this.s, 1, 0.1);
        }
        
        for (let i = 0; i < selectedButtons.length; i++) {
            if (selectedButtons[i] === this) {
                this.fade = lerp(this.fade, 100, 0.1);
            }
            else {
                this.fade = lerp(this.fade, 0, 0.1);
            }
        }
        
        pushMatrix();
            translate(this.x + this.w / 2, this.y + this.h / 2);
            scale(this.s);
            translate(-this.x - this.w / 2, -this.y - this.h / 2);
            image(images.button, this.x, this.y, this.w, this.h);
            
            if (images[this.icon] !== undefined) {
                image(images[this.icon], this.x, this.y, this.w, this.h);
            }
            else {
                textFont(createFont("MagicSchoolOne"));
                textAlign("CENTER", "CENTER");
                textSize((this.w * this.h) / 800 + 25);
                outlinedText(this.icon, this.x + this.w / 2, this.y + this.h / 2, color(255), color(0), 40);
            }
            
            fill(255, 255, 255, this.fade);
            rect(this.x + this.w * 3 / 50, this.y + this.h * 3 / 50, this.w * 22 / 25, this.h * 22 / 25);
        popMatrix();
    }
    
}

// Player creation {

const charCreateLeft = new Button(halfWidth - 700, halfHeight - 75, 150, 150, function () {
    if (charCreateMode === "eyeColor") {
        if (eyeColorIndex === 0) {
            eyeColorIndex = eyeColors.length - 1;
        }
        else {
            eyeColorIndex--;
        }
    }
    if (charCreateMode === "skinTone") {
        if (skinToneIndex === 0) {
            skinToneIndex = skinTones.length - 1;
        }
        else {
            skinToneIndex--;
        }
    }
    if (charCreateMode === "cloakColor") {
        if (cloakColorIndex === 0) {
            cloakColorIndex = cloakColors.length - 1;
        }
        else {
            cloakColorIndex--;
        }
    }
}, "leftArrow", "");
const charCreateRight = new Button(halfWidth - 150, halfHeight - 75, 150, 150, function () {
    if (charCreateMode === "eyeColor") {
        if (eyeColorIndex === eyeColors.length - 1) {
            eyeColorIndex = 0;
        }
        else {
            eyeColorIndex++;
        }
    }
    if (charCreateMode === "skinTone") {
        if (skinToneIndex === skinTones.length - 1) {
            skinToneIndex = 0;
        }
        else {
            skinToneIndex++;
        }
    }
    if (charCreateMode === "cloakColor") {
        if (cloakColorIndex === cloakColors.length - 1) {
            cloakColorIndex = 0;
        }
        else {
            cloakColorIndex++;
        }
    }
}, "rightArrow", "");

const charCreateSkin = new Button(halfWidth - 575, 75, 100, 100, function () {
    charCreateMode = "skinTone";
}, "miniPlayer", "fadeSelect default", "appearance");
const charCreateEye = new Button(halfWidth - 400, 75, 100, 100, function () {
    charCreateMode = "eyeColor";
}, "miniEye", "fadeSelect", "appearance");
const charCreateCloak = new Button(halfWidth - 225, 75, 100, 100, function () {
    charCreateMode = "cloakColor";
}, "miniCloak", "fadeSelect", "appearance");

const charCreateNext = new Button(halfWidth - 450, halfHeight + 200, 200, 200, function () {
    selectedButtons.length = 0;
    if (creationIndex === 1) {
        creationIndex++;
    }
    else if (creationIndex === 2) {
        if (player.wand !== 0 && player.name.first.length !== 0 && player.name.last.length !== 0 && player.witchOrWizard !== null) {
            creationIndex++;
        }
        else {
            notReady.active = true;
        }
    }
}, "NEXT", "");

const charCreateWitch = new Button(halfWidth - 550, halfHeight - 25, 150, 150, function () {
    player.witchOrWizard = "witch";
}, "Witch", "fadeSelect", "witchOrWizard");
const charCreateWizard = new Button(halfWidth - 300, halfHeight - 25, 150, 150, function () {
    player.witchOrWizard  = "wizard";
}, "Wizard", "fadeSelect", "witchOrWizard");

const charCreateWand1 = new Button(halfWidth - 625, halfHeight - 400, 150, 150, function () {
    player.wand = 1;
}, "wand1", "fadeSelect", "wand");
const charCreateWand2 = new Button(halfWidth - 425, halfHeight - 400, 150, 150, function () {
    player.wand = 2;
}, "wand2", "fadeSelect", "wand");
const charCreateWand3 = new Button(halfWidth - 225, halfHeight - 400, 150, 150, function () {
    player.wand = 3;
}, "wand3", "fadeSelect", "wand");

const charCreateEasy = new Button(100, 150, 100, 100, function () {
    difficulty = "easy";
}, "Easy", "fadeSelect", "difficulty");
const charCreateNormal = new Button(250, 150, 100, 100, function () {
    difficulty = "normal";
}, "Normal", "fadeSelect default", "difficulty");
const charCreateHard = new Button(400, 150, 100, 100, function () {
    difficulty = "hard";
}, "Hard", "fadeSelect", "difficulty");

const PLAY = new Button(225, 325, 150, 150, function () {
    sceneChange.reset("game");
}, "Play", "");

//}

//]

/** Draw and mouseClicked functions **/
// [

let frameCount = 0;
let frameRate = 60;

let draw = function () {
    try {

        resetMatrix();
        
        cursor("auto");
        
        gamepad.updateConnection();

        background(255, 255, 255);

        if (!loaded) {
            load();
        }
        else {

            pushMatrix();

            scale(scaledWidth / originalWidth, scaledHeight / originalHeight);

            switch (window.scene) {
                case "charCreation" : {
                    ctx.globalAlpha = 1;

                    image(images.noiseSquare, 0, 0, width, height);
                    
                    player.r += 0.3;
                    player.scale = 5;
                    player.draw();
                    
                    if (creationIndex === 1) {
                        charCreateLeft.draw();
                        charCreateRight.draw();
                        charCreateSkin.draw();
                        charCreateEye.draw();
                        charCreateCloak.draw();
                        charCreateNext.draw();
                    }
                    else if (creationIndex === 2) {
                        player.name.first = firstName.input.value;
                        player.name.last = lastName.input.value;                        
                        
                        firstName.draw();
                        lastName.draw();
                        
                        charCreateWand1.draw();
                        charCreateWand2.draw();
                        charCreateWand3.draw();
                        charCreateWitch.draw();
                        charCreateWizard.draw();
                        charCreateNext.draw();
                        
                        if (notReady.active) {
                            notReady.opac++;
                            if (notReady.opac > 255) {
                                notReady.active = false;
                            }
                        }
                        else {
                            notReady.opac--;
                        }
                        notReady.opac = constrain(notReady.opac, 0, 255);
                        
                        textAlign("CENTER", "CENTER");
                        textFont(createFont("MagicSchoolTwo"));
                        textSize(50);
                        outlinedText("Please finish filling out the required information", halfWidth - 350, halfHeight - 200, color(255, 255, 255, notReady.opac), color(255, 0, 0, notReady.opac), 20);
                    }
                    else {
                        charCreateEasy.draw();
                        charCreateNormal.draw();
                        charCreateHard.draw();
                        PLAY.draw();
                    }

                    cursro.update();
                    cursro.draw();
                    cursor("none");
                } break;
                case "game" : {

                    gameMovement = lerp(gameMovement, 1, 0.3);

                    player.scale = 1;

                    firstName.input.style.display = "none";
                    lastName.input.style.display = "none";
                    
                    background(155);
                    
                    if (!gamepad.isConnected()) {
                        player.r = atan2(mouseY - halfHeight, mouseX - halfWidth) - 90;
                    }
                    else {
                        let leftStick = gamepad.stickPos("left");
                        
                        if (leftStick.y > 0.5 || leftStick.y < -0.5 || leftStick.x > 0.5 || leftStick.x < -0.5) {
                            player.r = atan2(leftStick.y, leftStick.x) - 90;
                        }
                    }
                    
                    pushMatrix();
                        translate(halfWidth, halfHeight);
                        scale(cam.z);
                        translate(-cam.x, -cam.y);
                        
                        cam.x = lerp(cam.x, player.x, 0.2);
                        cam.y = lerp(cam.y, player.y, 0.2);
                        
                        player.update();
                        player.draw();
                        
                        for (let i = spellCasts.length - 1; i >= 0; i--) {
                            spellCasts[i].update();
                            spellCasts[i].draw();
                            if (!spellCasts[i].visible) {
                                spellCasts.splice(i, 1);
                            }
                            
                            
                            for (let j = goblins.length - 1; j >= 0; j--) {
                                if (spellCasts.length !== 0) {
                                    if (circCircCol(spellCasts[i].x, spellCasts[i].y, spellCasts[i].w, goblins[j].x, goblins[j].y, goblins[j].s)) {
                                        goblins[j].damage(spellCasts[i].name);
                                        spellCasts.splice(i, 1);
                                    }
                                }
                                if (goblins[j].dead) {
                                    goblins.splice(j, 1);
                                }
                            }
                            
                        }
                        
                        for (let i = 0; i < goblins.length; i++) {
                            goblins[i].update();
                            goblins[i].draw();
                        }
                        
                        for (let i = 0; i < collisionBoxes.length; i++) {
                            collisionBoxes[i].run();
                        }
                    popMatrix();
                    
                    spellSheet.draw();

                } break;
                case "inventory" : {
                    background(0, 0, 0);
                    if (clicked) {
                        inventory.close();
                    }
                } break;
            }

            if (window.scene !== "game") {
                gameMovement = 0;
            }

            popMatrix();
            
        }

        sceneChange.pack();
        typed = false;
        clicked = false;

    }
    catch (e) {
        console.error(e);
    }
};

setInterval(
    function () {
        frameCount++;
        draw();
    },
    1000 / frameRate
);



//]

