/** Lots of variables **/
// [

var scene = "char-creation";

// Player creation {

var charCreateMode = "skinTone";
var eyeColorIndex = 2;
var skinToneIndex = 2;
var cloakColorIndex = 2;
var selectedArrowX = 0;
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

//}

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

var clicked = false;

//]

/** Images **/
// [

var images = {
    noiseSquare : function () {
        
        background(0, 0, 0, 0);
        
        var xOff = 0;
        for (var x = 0; x < 300; x++) {
            var yOff = 0;
            for (var y = 0; y < 300; y++) {
                var bright = map(noise(xOff, yOff), 0, 1, 0, 255);
                stroke(bright);
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
    selectedArrow : function () {
        
        background(0, 0, 0, 0);
        
        noStroke();
        
        fill(255, 0, 0);
        rect(50, 40, 100 / 3, 20);
        triangle(50, 25, 50, 75, 12.5, 50);
        
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
        
    }
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

/** Player **/
// [

var Player = (function () {
    
    var _Player = function (x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        
        this.r = 0;
        this.s = 1;
        
        this.witchOrWizard = null;
        this.eyeColor = eyeColors[eyeColorIndex];
        this.skinTone = skinTones[skinToneIndex];
        this.cloakColor = color(50);
    };
    
    _Player.prototype = {
        
        draw : function () {
            
            this.eyeColor = eyeColors[eyeColorIndex];
            this.skinTone = skinTones[skinToneIndex];
            
            noStroke();
            
            pushMatrix();
                translate(this.x, this.y);
                rotate(this.r);
                scale(this.s);
                
                fill(this.skinTone);
                ellipse(0, 0, this.w, this.h);
                fill(255, 255, 255, 30);
                ellipse(-this.w / 50, -this.h / 50, this.w / 1.15, this.h / 1.15);
                
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
            popMatrix();
            
        }
        
    };
    
    return _Player;
    
}) ();

var player = new Player(300, 300, 150, 150);

//]

/** Button **/
// [

var Button = (function () {
    
    var _Button = function (x, y, w, h, func, icon) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.func = func;
        this.icon = icon;
        this.mouseOver = false;
        
        this.s = 1;
    };
    
    _Button.prototype = {
        
        draw : function () {
            
            this.mouseOver = mouseX > this.x &&
                             mouseX < this.x + this.w &&
                             mouseY > this.y &&
                             mouseY < this.y + this.h;
                             
            if (this.mouseOver) {
                this.s = lerp(this.s, 1.05, 0.1);
                if (clicked) {
                    this.func();
                }
            }
            else {
                this.s = lerp(this.s, 1, 0.1);
            }
            
            pushMatrix();
                translate(this.x + this.w / 2, this.y + this.h / 2);
                scale(this.s);
                translate(-this.x - this.w / 2, -this.y - this.h / 2);
            
                image(images.noiseSquare, this.x, this.y, this.w, this.h);
                fill(48, 135, 227, 100);
                rect(this.x, this.y, this.w, this.h);
                
                strokeWeight(2);
                stroke(255, 213, 0);
                noFill();
                rect(this.x, this.y, this.w, this.h);
                
                image(images[this.icon], this.x, this.y, this.w, this.h);
            popMatrix();
        }
        
    };
    
    return _Button;
    
}) ();

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
}, "leftArrow");
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
}, "rightArrow");
var charCreateSkin = new Button(180, 450, 60, 60, function () {
    charCreateMode = "skinTone";
}, "miniPlayer");
var charCreateEye = new Button(270, 450, 60, 60, function () {
    charCreateMode = "eyeColor";
}, "miniEye");
var charCreateCloak = new Button(360, 450, 60, 60, function () {
    charCreateMode = "cloakColor";
}, "miniPlayer");

//]

draw = function () {
    try {
        
    if (!loaded) {
        load();
    }
    else {
        switch (scene) {
            case "char-creation" : {
                
                image(images.noiseSquare, 0, 0, width, height);
                
                player.draw();
                
                charCreateLeft.draw();
                charCreateRight.draw();
                charCreateSkin.draw();
                charCreateEye.draw();
                charCreateCloak.draw();
                
                if (charCreateMode === "skinTone") {
                    selectedArrowX = lerp(selectedArrowX, 246, 0.1);
                }
                else if (charCreateMode === "eyeColor") {
                    selectedArrowX = lerp(selectedArrowX, 337, 0.1);
                }
                else if (charCreateMode === "cloakColor") {
                    selectedArrowX = lerp(selectedArrowX, 428, 0.1);
                }
                
                pushMatrix();
                    translate(selectedArrowX, 510);
                    rotate(90);
                    image(images.selectedArrow, 0, 0, 75, 75);
                popMatrix();
                
            } break;
        }
    }
    clicked = false;
    }
    catch (e) {
        println(e);
    }
};

mouseClicked = function () {
    clicked = true;
};
