function angle (angle) {
    return angle * Math.PI / 180;
}

function sin (degrees) {
    return Math.sin(angle(degrees));
}

function cos (degrees) {
    return Math.cos(angle(degrees));
}

function tan (degrees) {
    return Math.tan(angle(degrees));
}

function asin (degrees) {
    return Math.asin(degrees) * 180 / Math.PI;
}

function acos (degrees) {
    return Math.acos(degrees) * 180 / Math.PI;
}

function atan (degrees) {
    return Math.atan(degrees) * 180 / Math.PI;
}

function atan2 (y, x) {
    return Math.atan2(y, x) * 180 / Math.PI;
}

function radians (angle) {
    return angle * Math.PI / 180;
}

function degrees (angle) {
    return angle * 180 / Math.PI;
}