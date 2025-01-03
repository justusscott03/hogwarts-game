/**

Credit to A Random Coder (@ARandomCoder123) for the outlined text!

**/

/** Global variable **/
// [

var clicked = false;
var blockSize = 30;
var scene = "menu";
var spellChartDown = false;

//]

/** Keyboard interaction **/
// [

var keys = [];
keyPressed = function () {
    keys[keyCode] = true;
};
keyReleased = function () {
    keys[keyCode] = false;
};

//]

/** Outlined text **/
// [

var OutlinedText = function (txt, x, y, weight, main, outline, inc) {
    inc = inc || 10;
    fill(outline);
    for (var i = 0; i < 360; i += inc) {
        text(txt, x + sin(i) * weight, y + cos(i) * weight);
    }
    fill(main);
    text(txt, x, y);
};

//]

/** Images **/
// [

var images = {
    force : function () {
        
        background(0, 0, 0, 0);
        
        var msk = createGraphics(width, height, P2D);
        
        msk.background(0, 0, 0, 0);
        
        msk.quad(50, 0, 100, 50, 50, 100, 0, 50);
        
        msk = msk.get();
        
        var bkg = createGraphics(width, height, P2D);
        
        bkg.noStroke();
        for (var i = 0; i < 100; i++) {
            var lerpC = lerpColor(color(175, 0, 255), color(75, 0, 100), i / 100);
            bkg.fill(lerpC);
            bkg.rect(0, i, 100, 1);
        }
        
        bkg = bkg.get();
        
        bkg.mask(msk);
        
        image(bkg, 0, 0);
        
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
        
        var msk = createGraphics(width, height, P2D);
        
        msk.background(0, 0, 0, 0);
        
        msk.quad(50, 0, 100, 50, 50, 100, 0, 50);
        
        msk = msk.get();
        
        var bkg = createGraphics(width, height, P2D);
        
        bkg.noStroke();
        for (var i = 0; i < 100; i++) {
            var lerpC = lerpColor(color(255, 0, 0), color(150, 0, 0), i / 100);
            bkg.fill(lerpC);
            bkg.rect(0, i, 100, 1);
        }
        
        bkg = bkg.get();
        
        bkg.mask(msk);
        
        image(bkg, 0, 0);
        
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
        
        var msk = createGraphics(width, height, P2D);
        
        msk.background(0, 0, 0, 0);
        
        msk.quad(50, 0, 100, 50, 50, 100, 0, 50);
        
        msk = msk.get();
        
        var bkg = createGraphics(width, height, P2D);
        
        bkg.noStroke();
        for (var i = 0; i < 100; i++) {
            var lerpC = lerpColor(color(96, 196, 92), color(30, 97, 32), i / 100);
            bkg.fill(lerpC);
            bkg.rect(0, i, 100, 1);
        }
        
        bkg = bkg.get();
        
        bkg.mask(msk);
        
        image(bkg, 0, 0);
        
        noFill();
        strokeWeight(4);
        stroke(176, 123, 0);
        quad(50, 0, 100, 50, 50, 100, 0, 50);
        strokeWeight(1);
        stroke(255);
        quad(50, 0, 100, 50, 50, 100, 0, 50);
        
        return get(0, 0, 100, 100);
        
    },
    
    accio : function () {
        
        background(0, 0, 0, 0);
        
        noStroke();
        
        fill(0);
        stroke(255);
        beginShape();
            
        endShape();
        
        return get(0, 0, 100, 100);
        
    },
    confringo : function () {
        
        background(0, 0, 0, 0);
        
        noStroke();
        
        fill(0);
        stroke(255);
        beginShape();
            
        endShape();
        
        return get(0, 0, 100, 100);
        
    },
    avadaKedavra : function () {
        
        background(0, 0, 0, 0);
        
        noStroke();
        
        fill(0);
        stroke(255);
        beginShape();
            
        endShape();
        
        return get(0, 0, 100, 100);
        
    },
    
    player : function () {
        
        background(0, 0, 0, 0);
        
        noStroke();

        //Head
        fill(181, 130, 42);
        ellipse(50, 50, 50, 50);
        
        //Eyes
        fill(255);
        ellipse(55, 50, 10, 20);
        ellipse(71, 50, 7, 20);
        
        fill(0);
        ellipse(56.5, 50, 7, 14);
        ellipse(72, 50, 5, 14);
        
        //Head shading
        fill(0, 0, 0, 30);
        beginShape();
            vertex(65, 30);
            bezierVertex(79, 40, 76, 55, 70, 65);
            bezierVertex(60, 78, 45, 76, 35, 70);
            bezierVertex(35, 70, 70, 70, 70, 35);
        endShape();
        
        //Hat
        fill(25);
        beginShape();
            vertex(10, 10);
            vertex(30, 11);
            vertex(50, 18);
            vertex(60, 20);
            vertex(70, 25);
            vertex(23, 62);
            vertex(23, 48);
            vertex(25, 36);
            vertex(22, 26);
            vertex(20, 21);
        endShape();
        
        fill(0);
        beginShape();
            vertex(73, 40);
            vertex(80, 30);
            vertex(75, 25);
            vertex(65, 23);
            vertex(50, 30);
            vertex(35, 40);
            vertex(25, 50);
            vertex(20, 65);
            vertex(24, 68);
            vertex(31, 67);
            vertex(35, 57);
            vertex(45, 45);
            vertex(60, 35);
            vertex(65, 35);
            vertex(71, 37);
        endShape();
        
        //Robes
        fill(100);
        //quad(25, 75, 75, 75, 90, 150, 10, 150);
        
        //Hand
        fill(181, 130, 42);
        ellipse(40, 117, 17, 17);
        
        //Hand shading
        fill(0, 0, 0, 30);
        
        //Arm
        fill(25);
        arc(40, 85, 20, 20, 180, 360);
        rect(30, 85, 20, 30);
        arc(40, 115, 20, 5, 0, 180);
        
        //Arm shading
        fill(0);
        beginShape();
            vertex(40, 75);
            bezierVertex(45, 80, 45, 85, 45, 90);
            vertex(45, 110);
            bezierVertex(45, 113, 43, 116, 40, 117.5);
            bezierVertex(44, 117, 48, 117, 50, 115);
            vertex(50, 85);
            bezierVertex(50, 85, 50, 75, 40, 75);
        endShape();
        
        return get(0, 0, 100, 175);
        
    },
    
    brick : function () {
        
        background(0, 0, 0, 0);
        
        noStroke();
    
        fill(186, 100, 39);
        rect(0, 0, 60, 60);
        
        fill(0, 0, 0, 25);
        quad(45, 0, 45, 20, 49, 16, 49, 4);
        quad(15, 20, 15, 40, 19, 36, 19, 24);
        quad(30, 40, 30, 60, 34, 56, 34, 44);
        
        fill(0, 0, 0, 50);
        quad(0, 0, 45, 0, 41, 4, 0, 4);
        quad(45, 0, 49, 4, 60, 4, 60, 0);
        quad(0, 20, 0, 24, 11, 24, 15, 20);
        quad(15, 20, 60, 20, 60, 24, 19, 24);
        quad(0, 40, 0, 44, 26, 44, 30, 40);
        quad(30, 40, 60, 40, 60, 44, 34, 44);
        
        fill(0, 0, 0, 75);
        quad(45, 0, 41, 4, 41, 16, 45, 20);
        quad(15, 20, 15, 40, 11, 36, 11, 24);
        quad(30, 40, 30, 60, 26, 56, 26, 44);
        
        fill(0, 0, 0, 100);
        quad(0, 20, 45, 20, 41, 16, 0, 16);
        quad(45, 20, 49, 16, 60, 16, 60, 20);
        quad(15, 40, 60, 40, 60, 36, 19, 36);
        quad(0, 40, 0, 36, 11, 36, 15, 40);
        quad(0, 60, 30, 60, 26, 56, 0, 56);
        quad(30, 60, 60, 60, 60, 56, 34, 56);
        
        return get(0, 0, 60, 60);
        
    },
    
    button : function () {
        
        background(0, 0, 0, 0);
        
        var xOff = 0;
        for (var x = 0; x < 200; x++) {
            var yOff = 0;
            for (var y = 0; y < 100; y++) {
                var bright = map(noise(xOff, yOff), 0, 1, 0, 255);
                stroke(bright);
                point(x, y);
                yOff += 0.02;
            }
            xOff += 0.02;
        }
        
        noStroke();
        fill(0, 106, 255, 100);
        rect(0, 0, 200, 100);
        
        fill(230, 215, 0);
        quad(2, 2, 6, 6, 194, 6, 198, 2);
        
        fill(207, 193, 0);
        quad(2, 98, 6, 94, 194, 94, 198, 98);
        
        fill(184, 172, 0);
        quad(2, 2, 6, 6, 6, 94, 2, 98);
        
        fill(255, 244, 125);
        quad(198, 2, 194, 6, 194, 94, 198, 98);
        
        strokeWeight(5);
        stroke(255, 238, 0);
        noFill();
        rect(0, 0, 200, 100);
        
        return get(0, 0, 200, 100);
        
    },
};

//]

/** Image loading **/
// [

var curLoad = 0;
var loaded = false;
var load = function () {
    var obj = Object.keys(images);
    
    images[obj[curLoad]] = images[obj[curLoad]]();
    
    curLoad++;
    
    if (curLoad >= Object.keys(images).length) {
        loaded = true;
    }
    
};

//]

/** Scene transition **/
// [

var sceneChange = (function () {
    
    sceneChange = {
        nextScene : "menu",
        mode : "out",
        opac : 255,
        changeSpeed : 10
    };
    
    sceneChange.draw = function () {
        noStroke();
        fill(0, 0, 0, this.opac);
        rect(0, 0, 900, 600);
    };
    
    sceneChange.reset = function (nextScene) {
        if (this.mode === "out") {
            this.opac = 0;
            this.mode = "in";
            this.nextScene = nextScene;
        }
    };
    
    sceneChange.pack = function () {
        if (this.mode === "in") {
            this.opac += this.changeSpeed;
            if (this.opac >= 255) {
                this.mode = "out";
                scene = this.nextScene;
            }
        }
        else {
            this.opac -= this.changeSpeed;
        }
        this.draw();
    };
    
    return sceneChange;
    
}) ();

//]

/** Rect-to-rect collision **/
// [

var collide = function (obj1, obj2) {
    if (obj1.x < obj2.x + obj2.w && obj1.x + obj1.w > obj2.x && obj1.y < obj2.y + obj2.h && obj1.y + obj1.h > obj2.y) {
        return true;
    } 
};

//]

/** Player **/
// [

var Player = function (x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    
    this.velx = 0;
    this.vely = 0;
    this.maxSpeed = 3;
    
    this.dead = false;
};
Player.prototype.update = function (blocks) {
    if (!this.dead && !spellChartDown) {
        if (keys[87] || keys[UP]) {
            this.vely -= 1;
        }
        if (keys[83] || keys[DOWN]) {
            this.vely += 1;
        }
        if (keys[65] || keys[LEFT]) {
            this.velx -= 1;
        }
        if (keys[68] || keys[RIGHT]) {
            this.velx += 1;
        }
        
        if ((!keys[65] && !keys[68]) && (!keys[LEFT] && !keys[RIGHT])) {
            if (this.velx > 0) {
                this.velx -= 1;
            }
            if (this.velx < 0) {
                this.velx += 1;
            }
        }
        if ((!keys[87] && !keys[83]) && (!keys[UP] && !keys[DOWN])) {
            if (this.vely > 0) {
                this.vely -= 1;
            }
            if (this.vely < 0) {
                this.vely += 1;
            }
        }
        
        if (this.velx > this.maxSpeed) {
            this.velx = this.maxSpeed;
        }
        if (this.velx < -this.maxSpeed) {
            this.velx = -this.maxSpeed;
        }
        if (this.vely > this.maxSpeed) {
            this.vely = this.maxSpeed;
        }
        if (this.vely < -this.maxSpeed) {
            this.vely = -this.maxSpeed;
        }
        
        this.x += this.velx;
        this.y += this.vely;
    }
    
    this.applyCollision(blocks, this.velx, 0);
    this.applyCollision(blocks, 0, this.vely);
};
Player.prototype.applyCollision = function (obj, velx, vely) {
    for (var i = 0; i < obj.length; i++) {
        if (collide(this, obj[i])) {
            if (vely > 0) {
                this.vely = 0;
                this.y = obj[i].y - this.h;
            }
            if (vely < 0) {
                this.vely = 0;
                this.y = obj[i].y + obj[i].h;
            }
            if (velx < 0) {
                this.velx = 0;
                this.x = obj[i].x + obj[i].w;
            }
            if (velx > 0) {
                this.velx = 0;
                this.x = obj[i].x - this.w;
            }
        }
    }
};
Player.prototype.draw = function () {
    image(images.player, this.x, this.y, this.w, this.h);
};

var players = [];

//]

/** Block **/
// [

var Block = function (x, y, w, h, t) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.type = t;
};
Block.prototype.draw = function () {
    image(images[this.type], this.x, this.y, this.w, this.h * 2 / 3);
    image(images[this.type], this.x, this.y + this.h * 2 / 3, this.w, this.h / 3);
    
    fill(0, 0, 0, 75);
    rect(this.x, this.y + this.h * 2 / 3, this.w, this.h / 3);
};

var blocks = [];

//]

/** Spell data **/
// [

var spells = [
    {
        name : "basic",
        damage : 10,
        type : "basic",
        stunned : false
    },
    {
        
    },
];

//]

/** Spell square for casting **/
// [

var Spell = function (x, y, w, h, t, n) {
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
};
Spell.prototype.update = function () {
    if (this.type === "force") {
        this.maxReload = 200;
    }
    if (this.type === "power") {
        this.maxReload = 400;
    }
    if (this.type === "forbidden") {
        this.maxReload = 1000;
    }
    
    if (clicked && dist(this.x + this.w / 2, this.y + this.h / 2, mouseX, mouseY) < this.w / 2 && !this.reloading) {
        this.s = 0.9;
        this.reloading = true;
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
};
Spell.prototype.draw = function () {
    pushMatrix();
        translate(this.x + this.w / 2, this.y + this.h / 2);
        scale(this.s);
        translate(-(this.x + this.w / 2), -(this.y + this.h / 2));
        image(images[this.type], this.x, this.y, this.w, this.h);
        //image(images[this.name], this.x, this.y, this.w, this.h);
        
        noStroke();
        fill(1, 1, 1, this.grayOpac);
        quad(this.x + this.w / 2, this.y, this.x + this.w, this.y + this.h / 2, this.x + this.w / 2, this.y + this.h, this.x, this.y + this.h / 2);
        
        var reload = map(this.reload, 0, this.maxReload, -90, 270);
        
        strokeCap(SQUARE);
        strokeWeight(5);
        stroke(150, 150, 150, this.grayOpac);
        noFill();
        arc(this.x + this.w / 2, this.y + this.h / 2, this.w / 1.8, this.h / 1.8, -90, reload);
    popMatrix();
};

var spell1 = new Spell(750, 500, 75, 75, "force", "accio");
var spell2 = new Spell(700, 450, 75, 75, "power", "confringo");
var spell3 = new Spell(750, 400, 75, 75, "forbidden", "avadaKedavra");

//]

/** Spell cast **/
// [

var SpellCast = function (x, y, w, h, t) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.type = t;
    
    this.velx = 0;
    this.vely = 0;
    this.maxSpeed = 10;
    
    this.startAngle = 0;
    this.angleVel = 20;
    this.amplitude = 5;
    
    this.exploded = false;
    
    this.particles = [];
};
SpellCast.prototype.hit = function () {
    this.exploded = true;
    
    while (this.particles.length < 20) {
        this.particles.push({
            x : this.x + this.w,
            y : this.y + this.h / 2,
            w : 3,
            h : 3,
            velx : random(-3, 3),
            vely : random(-3, 3),
            opac : 255
        });
    }
};
SpellCast.prototype.update = function () {
    this.velx += 2;
    this.velx = constrain(this.velx, 0, this.maxSpeed);
    this.x += this.velx;
};
SpellCast.prototype.draw = function () {
    if (this.type === "basic") {
        this.amplitude = 3;
    }
    if (this.type === "control") {
        this.amplitude = 5;
    }
    if (this.type === "force") {
        this.amplitude = 8;
    }
    if (this.type === "power") {
        this.amplitude = 5;
    }
    if (this.type === "forbidden") {
        this.amplitude = 2;
    }
    
    this.startAngle += this.angleVel;
    this.angle = this.startAngle;
    
    if (!this.exploded) {
        pushMatrix();
            translate(this.x, this.y);
            for (var x = 0; x < this.w; x++) {
                var y = this.amplitude * sin(this.angle);
                noStroke();
                if (this.type === "basic") {
                    fill(x * 7, 0, 0);
                }
                if (this.type === "control") {
                    fill(x * 4, x * 4, 0);
                }
                if (this.type === "force") {
                    fill(x * 4, 0, x * 4);
                }
                if (this.type === "power") {
                    fill(x * 4, 0, 0);
                }
                if (this.type === "forbidden") {
                    fill(0, x * 4, 0);
                }
                strokeWeight(2);
                ellipse(x, y + this.h / 2, x / (this.w / 10), x / (this.h / 5));
                this.angle += this.angleVel / 2;
            }
        popMatrix();
        this.particles.length = 0;
    }
    else {
        for (var i = 0; i < this.particles.length; i++) {
            var p = this.particles[i];
            
            p.x += p.velx;
            p.y += p.vely;
            
            p.velx = p.velx / 1.05;
            p.vely = p.vely / 1.05;
            
            p.opac -= 2;
            
            noStroke();
            if (this.type === "basic") {
                fill(255, 0, 0);
            }
            if (this.type === "control") {
                fill(255, 255, 0);
            }
            if (this.type === "force") {
                fill(255, 0, 255);
            }
            if (this.type === "power") {
                fill(255, 0, 0);
            }
            if (this.type === "forbidden") {
                fill(0, 255, 0);
            }
            ellipse(p.x, p.y, p.w, p.h);
        }
    }
};

//]

/** Spells to use **/
// [

var SpellSheet = function () {
    this.spell1 = spell1;
    this.spell2 = spell2;
    this.spell3 = spell3;
};
SpellSheet.prototype.draw = function () {
    this.spell1.update();
    this.spell2.update();
    this.spell3.update();
    
    this.spell1.draw();
    this.spell2.draw();
    this.spell3.draw();
};

var spellSheet = new SpellSheet();

//]

/** Spell chart **/
// [

var SpellChart = function (x, y, w, h) {};

//]

/** Game map and map loading **/
// [

var lvlMap = [
    "P",
    "",
    "",
    "     ",
    "bbbbbb",
    "bbbbbb",
    "bbbbbb"
];

var loadMap = function () {
    for (var col = 0; col < lvlMap.length; col++) {
        for (var row = 0; row < lvlMap[col].length; row++) {
            var bType = lvlMap[col][row];
            
            switch (bType) {
                case "P" : {
                    players.push(
                        new Player(row * blockSize, col * blockSize, blockSize * 2, blockSize * 7 / 2)
                    );
                } break;
                case "b" : {
                    blocks.push(
                        new Block(row * blockSize, col * blockSize, blockSize, blockSize, "brick")
                    );
                } break;
            }
        }
    }
};

//]

/** Button **/
// [

var Button = function (x, y, w, h, txt, func) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.txt = txt;
    this.func = func;
    this.s = 1;
    this.opac = 0;
    this.mouseOver = false;
    
    this.draw = function () {
        
        this.mouseOver = mouseX > this.x && mouseX < this.x + this.w &&
                         mouseY > this.y && mouseY < this.y + this.h;
        if (this.mouseOver) {
            this.s = lerp(this.s, 1.05, 0.15);
            this.opac = lerp(this.opac, 50, 0.15);
            if (clicked) {
                this.func();
            }
        }
        else {
            this.s = lerp(this.s, 1, 0.15);
            this.opac = lerp(this.opac, 0, 0.15);
        }
        
        pushMatrix();
            translate(this.x + this.w / 2, this.y + this.h / 2);
            scale(this.s);
            translate(-(this.x + this.w / 2), -(this.y + this.h / 2));
            image(images.button, this.x, this.y, this.w, this.h);
            
            noStroke();
            fill(255, 255, 255, this.opac);
            rect(this.x + this.w * 3 / 100, this.y + this.h * 3 / 50, 188, 88);
            
            textFont(createFont("Times New Roman Bold"));
            textAlign(CENTER, CENTER);
            textSize((this.w * this.h) / 400);
            OutlinedText(this.txt, this.x + this.w / 2, this.y + this.h / 2, 1, color(0), color(255));
        popMatrix();
    };
};

var b = new Button(200, 200, 200, 100, "Play", function () {
    sceneChange.reset("game");
    loadMap();
});

//]

/** Scenes **/
// [

var Menu = function () {
    background(0);
    b.draw();
};

var Game = function () {
    background(255);
    
    for (var i in blocks) {
        blocks[i].draw();
    }
    
    for (var i in players) {
        players[i].update(blocks);
        players[i].draw();
    }
    
    spellSheet.draw();
};

//]

/** Draw and mouseClicked function **/
// [

draw = function () {
    if (!loaded) {
        load();
    }
    else {
        switch (scene) {
            case "load" : {} break;
            case "menu" : {
                Menu();
            } break;
            case "game" : {
                Game();
            } break;
        }
    }
    
    clicked = false;
    sceneChange.pack();
};

mouseClicked = function () {
    clicked = true;
};

//]
