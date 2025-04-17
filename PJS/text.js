function textFont (font) {
    window.globalFont = font;
    ctx.font = window.globalSize + "px " + window.globalFont;
}

function createFont (font) {
    return font;
}

function textSize (size) {
    window.globalSize = size;
    ctx.font = window.globalSize + "px " + window.globalFont;
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

export { textFont, createFont, textSize, textAlign, text };