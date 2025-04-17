function beginShape () {
    requiresFirstVertex = true;
    ctx.beginPath();
}

function endShape () {
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

function vertex (x, y) {
    if (requiresFirstVertex) {
        ctx.moveTo(x, y);
        requiresFirstVertex = false;
    }
    else {
        ctx.lineTo(x, y);
    }
}

function bezierVertex (cx1, cy1, cx2, cy2, x, y) {
    if (requiresFirstVertex) {
        throw new Error("vertex() must be used at least once before calling bezierVertex()")
    }
    else {
        ctx.bezierCurveTo(cx1, cy1, cx2, cy2, x, y);
    }
}

function strokeJoin (MODE) {
    ctx.lineJoin = MODE;
}

export { beginShape, endShape, vertex, bezierVertex, strokeJoin };