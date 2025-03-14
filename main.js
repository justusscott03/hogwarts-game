/**

Credit to SP(@Prodigy6) for the outlined text and camera from their project, The Temple of Itzomar: https://www.khanacademy.org/computer-programming/the-temple-of-itzomar/6253229457391616

Credit to Vicioustrex(@Vicioustrex) for the circle-to-circle and circle-to-rect collisions and spell casting from their project, Airsoft Battle: https://www.khanacademy.org/computer-programming/airsoft-battle/6722101637464064

**/

/** Lots of variables **/
// [

var scene = "charCreation";
var selectedButtons = [];
var difficulty = "normal";

// Player creation {

var charCreateMode = "skinTone";
var eyeColorIndex = 2;
var skinToneIndex = 2;
var cloakColorIndex = 11;
var eyeColors = [
    color(135, 206, 235),
    color(85, 170, 85),
    color(150, 100, 50),
    color(204, 128, 51),
    color(192, 192, 192),
    color(75, 54, 33)
];
var skinTones = [
    color(255, 224, 189),
    color(242, 203, 169),
    color(198, 134, 66),
    color(147, 91, 44),
    color(94, 60, 30)
];
var cloakColors = [
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
var creationIndex = 1;
var notReady = {
    active : false,
    opac : 0
};

//}

var cam = {
    x : 0,
    y : 0
};

//]

/** Outlined text, credit to SP(@Prodigy6) **/
// [

var outlinedText = function (t, x, y, f, s, w) {
    fill(s);
    for(var i = 0; i < 30; i++) {
        text(t, x + sin(i * 16) * w / 16, y + cos(i * 16) * w / 16);
    }
    fill(f);
    text(t, x, y);
};

//]

/** User interaction **/
// [

var keys = [];
keyPressed = function () {
    keys[keyCode] = true;
};
keyReleased = function () {
    keys[keyCode] = false;
};

var typed = false;
var clicked = false;

//]

/** Images **/
// [

var images = {
    cursorRings : function () {
        
        background(0, 0, 0, 0);
        
        noFill();

        for (var i = 0; i < 5; i++) {
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

        for (var i = 0; i < 5; i++) {
            strokeWeight(i);
            stroke(255, 245, 110, 255 - i * 50);
            arc(25, 25, 30, 30, 215, 325);
            arc(25, 25, 30, 30, 35, 145);
        }
        
        return get(0, 0, 50, 50);
        
    },
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
    button : function () {
        
        background(0, 0, 0, 0);
        
        var xOff = 0;
        for (var x = 0; x < 100; x++) {
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
   
        var xOff = 0;
        for (var x = 0; x < 300; x++) {
            var yOff = 0;
            for (var y = 0; y < 40; y++) {
                var bright = map(noise(xOff, yOff), 0, 1, 0, 255);
                stroke(bright);
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
        
        var xOff = 0;
        for (var x = 0; x < 250; x++) {
            var yOff = 0;
            for (var y = 0; y < 250; y++) {
                var bright = map(noise(xOff, yOff), 0, 1, 0, 255);
                stroke(bright);
                point(x, y);
                yOff += 0.02;
            }
            xOff += 0.02;
        }
        
        return get(0, 0, 250, 250);
        
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
        arc(32, 43, 20, 50, -90, 1);
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
            for (var i = 0; i < 20; i++) {
                noStroke();
                
                var lerpC = lerpColor(color(255, 0, 0), color(255), i / 20);
                
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
        
        strokeCap(ROUND);
        stroke(133, 96, 41);
        strokeWeight(4);
        line(25, 7, 25, 43);
        
        return get(0, 0, 50, 50);
        
    },
    wand2 : function () {
        
        background(0, 0, 0, 0);
        
        noFill();
        strokeCap(ROUND);
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
        strokeCap(ROUND);
        stroke(217, 203, 185);
        strokeWeight(4);
        line(25, 7, 25, 43);
        for (var i = 0; i < 12; i++) {
            var lerpC = lerpColor(color(163, 136, 57), color(0), i / 12);
            
            stroke(lerpC);
            strokeCap(SQUARE);
            strokeWeight(1);
            line(23, i + 30, 26, i + 30);
        }
        
        return get(0, 0, 50, 50);
        
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

/** Fancy cursor **/
// [

var Cursor = (function () {

    var _Cursor = function (x, y) {
        this.x = x;
        this.y = y;
        this.arc = 0;
        this.size = 50;
    };
    
    _Cursor.prototype = {
        
        update : function () {
            this.x = mouseX;
            this.y = mouseY;
        },
        
        draw : function () {
            image(images.cursorRings, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
            
            this.arc++;
            pushMatrix();
                translate(this.x, this.y);
                rotate(this.arc);
                image(images.cursorArcs, -this.size / 2, -this.size / 2, this.size, this.size);
            popMatrix();
        }
        
    };
    
    return _Cursor;

}) ();

// Intentional mispelling because of Oh Noes error
var cursro = new Cursor();

//]

/** Scene transition **/
// [

var SceneChange = (function () {

    var _SceneChange = function () {
        this.nextScene = "menu";
        this.mode = "out";
        this.opac = 255;
        this.changeSpeed = 10;
    };
    
    _SceneChange.prototype = {
        
        draw : function () {
            noStroke();
            fill(0, 0, 0, this.opac);
            rect(0, 0, 600, 600);
        },
        
        reset : function (nextScene) {
            if (this.mode === "out") {
                this.opac = 0;
                this.mode = "in";
                this.nextScene = nextScene;
            }
        },
        
        pack : function () {
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
        }
        
    };
    
    return _SceneChange;

}) ();

var sceneChange = new SceneChange();

//]

/** Spell cast **/
// [

var SpellCast = (function () {
    
    var _SpellCast = function (x, y, w, h, r, type, maxSpeed) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.r = r;
        this.type = type;
        
        this.velx = 0;
        this.vely = 0;
        this.maxSpeed = maxSpeed;
        
        this.flyTime = 0;
        this.visible = true;
        
        this.reloading = false;
        this.reloadTime = 0;
    };
    
    _SpellCast.prototype = {
        
        draw : function () {
            pushMatrix();
                translate(this.x, this.y);
                rotate(this.r);
                translate(-this.x, -this.y);
                image(images[this.type], this.x - this.w / 2, this.y - this.h * 2 / 3, this.w, this.h);
            popMatrix();
        },
        
        update : function () {
            this.flyTime++;
            
            if (this.flyTime > 300) {
                this.visible = false;
            }
            
            this.velx = sin(this.r + 180) * this.maxSpeed;
            this.vely = -cos(this.r + 180) * this.maxSpeed;
            
            this.x += this.velx;
            this.y += this.vely;
        }
        
    };
    
    return _SpellCast;
    
}) ();

var spellCasts = [];

//]

/** Spell objects **/
// [

var spells = [
    {
        name : "basicCast",
        damage : 5,
        knockback : 0,
        stun : false,
        reload : 10,
        speed : 10
    },
];

//]

/** Spell diamonds for casting **/
// [

var Spell = (function () {

    var _Spell = function (x, y, w, h, t, n) {
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
    
    _Spell.prototype = {
    
        update : function () {
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
        },
        
        draw : function () {
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
        }
    
    };

}) ();

//]

/** Sheet of four spells **/
// [

var SpellSheet = (function () {

    var _SpellSheet = function (spell1, spell2, spell3, spell4) {
        this.spell1 = spell1;
        this.spell2 = spell2;
        this.spell3 = spell3;
        this.spell4 = spell4;
    };
    
    _SpellSheet.prototype = {
        
        draw : function () {
            this.spell1.update();
            this.spell2.update();
            this.spell3.update();
            this.spell4.update();
            
            this.spell1.draw();
            this.spell2.draw();
            this.spell3.draw();
            this.spell4.draw();
        }
        
    };

}) ();

//]

/** Player **/
// [

var Player = (function () {
    
    var _Player = function (x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        
        this.velx = 0;
        this.vely = 0;
        this.maxSpeed = 3;
        
        this.r = 0;
        this.s = 1;
        
        this.witchOrWizard = null;
        this.wand = 0;
        this.eyeColor = eyeColors[eyeColorIndex];
        this.skinTone = skinTones[skinToneIndex];
        this.cloakColor = cloakColors[cloakColorIndex];
        this.name = {
            first : "",
            last : ""
        };
        
        this.dead = false;
        this.health = 100;
        this.castReload = 0;
        this.reloading = false;
        this.selectedSpell = spells[0];
    };
    
    _Player.prototype = {
        
        rectCol : function (rx, ry, rw, rh, cx, cy, cr) {
            var clx = Math.max(rx, Math.min(cx, rx + rw));
            var cly = Math.max(ry, Math.min(cy, ry + rh));
            
            var dx = cx - clx;
            var dy = cy - cly;
            var ds = dx * dx + dy * dy;
            
            return ds < cr * cr;
        },
        
        circCol : function (cx, cy, cd, cx2, cy2, cd2) {
            if (dist(cx, cy, cx2, cy2) < cd / 2 + cd2 / 2) {
                return true;
            } 
            else {
                return false;
            }
        },
        
        update : function () {
            if (!this.dead) {
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
                
                this.velx = constrain(this.velx, -this.maxSpeed, this.maxSpeed);
                this.vely = constrain(this.vely, -this.maxSpeed, this.maxSpeed);
                
                this.x += this.velx;
                this.y += this.vely;
                
                if (this.reloading) {
                    this.castReload++;
                    if (this.castReload > this.selectedSpell.reload) {
                        this.castReload = 0;
                        this.reloading = false;
                    }
                }
                
                if (clicked && !this.reloading) {
                    spellCasts.push(new SpellCast(this.x + sin(this.r + 200) * 100, this.y - cos(this.r + 200) * 100, 6, 45, this.r, this.selectedSpell.name, this.selectedSpell.speed));
                    this.reloading = true;
                }
            }
        },
        
        draw : function () {
            
            this.eyeColor = eyeColors[eyeColorIndex];
            this.skinTone = skinTones[skinToneIndex];
            this.cloakColor = cloakColors[cloakColorIndex];
            
            noStroke();
            
            pushMatrix();
                translate(this.x, this.y);
                rotate(this.r);
                scale(this.s);
                
                // Wand
                pushMatrix();
                    rotate(180);
                    if (images["wand" + this.wand] !== undefined) {
                        image(images["wand" + this.wand], this.w / 8, -this.h / 0.9, this.w / 1.5, this.h / 1.5);
                    }
                popMatrix();
                
                // Body
                fill(this.skinTone);
                ellipse(0, 0, this.w, this.h);
                ellipse(-this.w / 2.25, this.h / 2.25, this.w / 3.25, this.h / 3.25);
                ellipse(this.w / 2.25, this.h / 2.25, this.w / 3.25, this.h / 3.25);
                fill(255, 255, 255, 30);
                ellipse(-this.w / 50, -this.h / 50, this.w / 1.15, this.h / 1.15);
                ellipse(-this.w / 2.205, this.h / 2.295, this.w / 3.7375, this.h / 3.7375);
                ellipse(this.w / 2.295, this.h / 2.295, this.w / 3.7375, this.h / 3.7375);
                
                // Eyes
                fill(255);
                ellipse(-this.w / 5, this.h / 5, this.w / 5, this.h * 4 / 15);
                ellipse(this.w / 5, this.h / 5, this.w / 5, this.h * 4 / 15);
                
                fill(this.eyeColor);
                arc(this.w / 5, this.h * 6 / 25, this.w * 29 / 150, this.h / 7, 180, 360);
                arc(-this.w / 5, this.h * 6 / 25, this.w * 29 / 150, this.h / 7, 180, 360);
                
                fill(0);
                arc(-this.w / 5, this.h * 7 / 30, this.w * 29 / 150, this.h / 5, 0, 180);
                arc(-this.w / 5, this.h * 6 / 25, this.w * 14 / 75, this.h / 10, 180, 360);
                
                arc(this.w / 5, this.h * 7 / 30, this.w * 29 / 150, this.h / 5, 0, 180);
                arc(this.w / 5, this.h * 6 / 25, this.w * 14 / 75, this.h / 10, 180, 360);
                
                // Cloak
                fill(this.cloakColor);
                beginShape();
                    curveVertex(-this.w / 10.2, this.h / 2.1);
                    curveVertex(-this.w / 1.9, this.h / 30);
                    curveVertex(-this.w / 2.6, -this.h / 2.7);
                    curveVertex(-this.w / 4.6, -this.h / 1.7);
                    curveVertex(-this.w / 12.5, -this.h / 1.2);
                    curveVertex(this.w / 4, -this.h / 1.97);
                    curveVertex(this.w / 2, -this.h / 6.9);
                    curveVertex(this.w / 2, this.h / 5.7);
                    curveVertex(this.w / 3.4, this.h / 22.6);
                    curveVertex(this.w / 18.5, this.h / 11.5);
                    curveVertex(-this.w / 3.9, this.h / 25.8);
                    curveVertex(-this.w / 2.4, this.h / 9.0);
                    curveVertex(-this.w / 2.1, this.h / 5.0);
                    curveVertex(-this.w / 2.5, this.h / 8.2);
                endShape();
                
                fill(0, 0, 0, 30);
                beginShape();
                    curveVertex(-this.w / 4.6, -this.h / 1.7);
                    curveVertex(-this.w / 12.5, -this.h / 1.2);
                    curveVertex(this.w / 4, -this.h / 1.97);
                    curveVertex(this.w / 2, -this.h / 6.9);
                    curveVertex(this.w / 2, this.h / 5.7);
                    curveVertex(this.w / 3.4, this.h / 22.6);
                    curveVertex(this.w / 18.5, this.h / 13.7);
                    curveVertex(-this.w / 132, -this.h / 9.2);
                    curveVertex(-this.w / 14, -this.h / 2.4);
                    curveVertex(-this.w / 28.5, -this.h / 1.5);
                    curveVertex(-this.w / 6.7, this.h / 13.3);
                endShape();
            popMatrix();
            
        },
        
        displayName : function (name) {
            var array = name;
            var string = array.join();
            return string.replaceAll(",", "");
        }
        
    };
    
    return _Player;
    
}) ();

var player = new Player(300, 300, 75, 75);

//]

/** Collision box **/
// [

// Yes I know this is repetitive and confusing
var CollisionBox = (function () {

    var _CollisionBox = function (x, y, w, h, type) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.type = type;
    };

    _CollisionBox.prototype = {
        
        run : function () {
            fill(0);
            if (this.type === "rect") {
                rect(this.x, this.y, this.w, this.h);
            }
            else if (this.type === "circ") {
                ellipse(this.x, this.y, this.w, this.h);
            }
            
            if (dist(player.x, player.y, this.x, this.y) < 1000) {
                if (this.type === "circ") {
                    if (player.circCol(this.x, this.y, this.w, player.x, player.y, player.w)) {
                        var angle = Math.atan2(this.x - player.x, this.y - player.y);
                        
                        this.x = player.x - Math.cos(angle + 1.55) * (player.w / 2 + this.w / 2);
                        this.y = player.y + Math.sin(angle + 1.55) * (player.w / 2 + this.w / 2);
                    }
                }
                
                if (this.type === "rect") {
                    if (player.rectCol(this.x, this.y, this.w, this.h, player.x, player.y, player.w / 2)) {
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
        },
        
    };
    
    return _CollisionBox;

}) ();

var collisionBoxes = [];
collisionBoxes.add = function (x, y, w, h, type) {
    this.push(new CollisionBox(x, y, w, h, type));
};

//]

/** Map loading **/
// [

var loadMap = function () {
    collisionBoxes.add(500, 500, 200, 200, "rect");
};
loadMap();

//]

/** Text inputs **/
// [

var Input = (function () {

    var _Input = function (x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.txt = [];
        this.blinkTimer = 0;
        this.selected = false;
        this.mouseOver = false;
    };
    
    _Input.prototype = {
        
        draw : function () {
            this.mouseOver = mouseX > this.x &&
                             mouseX < this.x + this.w &&
                             mouseY > this.y &&
                             mouseY < this.y + this.h;
             
            if (this.mouseOver) {
                cursor("pointer");
            }
            if (clicked) {
                if (this.mouseOver) {
                    this.selected = true;
                }
                else {
                    this.selected = false;
                }
            }
            
            this.blinkTimer++;
            
            pushMatrix();
                
                translate(this.x, this.y);
                scale(this.w / 300, this.h / 40);
                translate(-this.x, -this.y);
                
                if (this.selected) {
                    for (var i = 0; i < 5; i++) {
                        fill(255, 255, 255, 255 - i * 50);
                        rect(this.x - i, this.y - i, this.w + i * 2, this.h + i * 2, 5);
                    }
                }
                
                image(images.input, this.x, this.y, this.w, this.h);
                
                textFont(createFont("monospace"));
                textAlign(CORNER, CENTER);
                textSize(20);
                this.txt.length = constrain(this.txt.length, 0, 20);
                for (var i = 0; i < this.txt.length; i++) {
                    outlinedText(this.txt[i], this.x + i * 12 + 9, this.y + this.h / 2, color(255), color(0), 20);
                }
                
                if (this.blinkTimer % 80 < 40 && this.selected) {
                    outlinedText("|", this.x + this.txt.length * 12 + 9, this.y + this.h / 2, color(255), color(0), 20);
                }
            
            popMatrix();
            
            if (typed && this.selected) {
                this.blinkTimer = 0;
                if (key.code !== 8) {
                    this.txt.push(key);
                }
                else {
                    this.txt.pop();
                }
            }
        }
        
    };

    return _Input;

}) ();

var firstName = new Input(10, 205, 275, 110 / 3);
var lastName = new Input(315, 205, 275, 110 / 3);

//]

/** Button **/
// [

var Button = (function () {
    
    var _Button = function (x, y, w, h, func, icon, type, type2) {
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
    };
    
    _Button.prototype = {
        
        draw : function () {
            
            this.mouseOver = mouseX > this.x &&
                             mouseX < this.x + this.w &&
                             mouseY > this.y &&
                             mouseY < this.y + this.h;
                             
            if (this.mouseOver) {
                cursor("pointer");
                this.s = lerp(this.s, 1.05, 0.1);
                if (clicked) {
                    this.func();
                    if (this.type.includes("fadeSelect")) {
                        for (var i = 0; i < selectedButtons.length; i++) {
                            if (selectedButtons[i].type2 === this.type2) {
                                selectedButtons.splice(i, 1);
                            }
                        }
                        selectedButtons.push(this);
                    }
                }
            }
            else {
                this.s = lerp(this.s, 1, 0.1);
            }
            
            for (var i = 0; i < selectedButtons.length; i++) {
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
                    textAlign(CENTER, CENTER);
                    textSize((this.w * this.h) / 500);
                    outlinedText(this.icon, this.x + this.w / 2, this.y + this.h / 2, color(255), color(0), 40);
                }
                
                fill(255, 255, 255, this.fade);
                rect(this.x + this.w * 3 / 50, this.y + this.h * 3 / 50, this.w * 22 / 25, this.h * 22 / 25);
            popMatrix();
        }
        
    };
    
    return _Button;
    
}) ();

// Player creation {

var charCreateLeft = new Button(50, 250, 100, 100, function () {
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
var charCreateRight = new Button(450, 250, 100, 100, function () {
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

var charCreateSkin = new Button(180, 75, 60, 60, function () {
    charCreateMode = "skinTone";
}, "miniPlayer", "fadeSelect default", "appearance");
var charCreateEye = new Button(270, 75, 60, 60, function () {
    charCreateMode = "eyeColor";
}, "miniEye", "fadeSelect", "appearance");
var charCreateCloak = new Button(360, 75, 60, 60, function () {
    charCreateMode = "cloakColor";
}, "miniCloak", "fadeSelect", "appearance");

var charCreateNext = new Button(238.5, 450, 125, 125, function () {
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

var charCreateWitch = new Button(175, 315, 100, 100, function () {
    player.witchOrWizard = "witch";
}, "Witch", "fadeSelect", "witchOrWizard");
var charCreateWizard = new Button(325, 315, 100, 100, function () {
    player.witchOrWizard  = "wizard";
}, "Wizard", "fadeSelect", "witchOrWizard");

var charCreateWand1 = new Button(195, 25, 100, 100, function () {
    player.wand = 1;
}, "wand1", "fadeSelect", "wand");
var charCreateWand2 = new Button(320, 25, 100, 100, function () {
    player.wand = 2;
}, "wand2", "fadeSelect", "wand");
var charCreateWand3 = new Button(445, 25, 100, 100, function () {
    player.wand = 3;
}, "wand3", "fadeSelect", "wand");

var charCreateEasy = new Button(100, 150, 100, 100, function () {
    difficulty = "easy";
}, "Easy", "fadeSelect", "difficulty");
var charCreateNormal = new Button(250, 150, 100, 100, function () {
    difficulty = "normal";
}, "Normal", "fadeSelect default", "difficulty");
var charCreateHard = new Button(400, 150, 100, 100, function () {
    difficulty = "hard";
}, "Hard", "fadeSelect", "difficulty");

var PLAY = new Button(225, 325, 150, 150, function () {
    sceneChange.reset("game");
}, "Play", "");

//}

//]

/** Draw and mouseClicked functions **/
// [

draw = function () {
    try {
        cursor("auto");
        if (!loaded) {
            load();
        }
        else {
            switch (scene) {
                case "charCreation" : {
                    image(images.noiseSquare, 0, 0, width, height);
                    player.r += 0.3;
                    player.draw();
                    
                    if (creationIndex === 1) {
                        player.s = 2;
                        
                        charCreateLeft.draw();
                        charCreateRight.draw();
                        charCreateSkin.draw();
                        charCreateEye.draw();
                        charCreateCloak.draw();
                        charCreateNext.draw();
                    }
                    else if (creationIndex === 2) {
                        player.s = lerp(player.s, 1, 0.1);
                        player.x = lerp(player.x, 75, 0.1);
                        player.y = lerp(player.y, 75, 0.1);
                        player.name.first = firstName.txt;
                        player.name.last = lastName.txt;
                        
                        firstName.draw();
                        lastName.draw();
                        
                        charCreateWand1.draw();
                        charCreateWand2.draw();
                        charCreateWand3.draw();
                        charCreateWitch.draw();
                        charCreateWizard.draw();
                        charCreateNext.draw();
                        
                        textAlign(BASELINE);
                        textSize(20);
                        outlinedText("First Name", 10, 200, color(255), color(0), 20);
                        outlinedText("Last Name", 315, 200, color(255), color(0), 20);
                        
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
                        
                        textAlign(CENTER, CENTER);
                        outlinedText("Please finish filling out the required information", 300, 275, color(255, 255, 255, notReady.opac), color(255, 0, 0, notReady.opac), 20);
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
                    background(155);
                    
                    cam.x = 300 - player.x;
                    cam.y = 300 - player.y;
                    
                    player.r = (Math.atan2(mouseY - 300, mouseX - 300) * (180 / Math.PI)) - 90;
                    
                    pushMatrix();
                        translate(cam.x, cam.y);
                        player.update();
                        player.draw();
                        
                        for (var i = 0; i < collisionBoxes.length; i++) {
                            collisionBoxes[i].run();
                        }
                        
                        for (var i = 0; i < spellCasts.length; i++) {
                            spellCasts[i].update();
                            spellCasts[i].draw();
                            if (!spellCasts[i].visible) {
                                spellCasts.splice(i, 1);
                                i--;
                            }
                        }
                    popMatrix();
                } break;
            }
        }
        
        sceneChange.pack();
        typed = false;
        clicked = false;
    }
    catch (e) {
        println(e);
    }
};

keyTyped = function () {
    typed = true;
};

mouseClicked = function () {
    clicked = true;
};

//]
