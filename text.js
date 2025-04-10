function textFont (font) {
    globalFont = font;
    ctx.font = globalSize + "px " + globalFont;
}

function createFont (font) {
    return font;
}

function textSize (size) {
    globalSize = size;
    ctx.font = globalSize + "px " + globalFont;
}

function textAlign (ALIGN, YALIGN = "BASELINE") {
    if (ALIGN === "LEFT") {
        ALIGN = "start";
    }
    if (ALIGN === "CENTER") {
        ALIGN = "center";
    }
    if (ALIGN === "RIGHT") {
        ALIGN = "end";
    }

    if (YALIGN === "BASELINE") {
        YALIGN = "alphabetic";
    }
    if (YALIGN === "CENTER") {
        YALIGN = "middle";
    }
    if (YALIGN === "BOTTOM") {
        YALIGN = "bottom";
    }
    
    ctx.textAlign = ALIGN;
    ctx.textBaseline = YALIGN;
}

function text (message, x, y) {
    ctx.fillText(message, x, y);
}
