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
    return Math.asin(angle(degrees));
}

function acos (degrees) {
    return Math.acos(angle(degrees));
}

function atan (degrees) {
    return Math.atan(angle(degrees));
}

function atan2 (degrees) {
    return Math.atan2(angle(degrees));
}

function radians (angle) {
    return angle * Math.PI / 180;
}

function degrees (angle) {
    return angle * 180 / Math.PI;
}