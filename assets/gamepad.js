import { Vector } from "assets/vector.js";
import { map } from "pjs/math.js";

class Gamepad {

    constructor (innerDeadzone = 0.1, outerDeadzone = 0.05, padIndex = -1) {
        this._gamepad = null;
        this._innerDeadzone = innerDeadzone;
        this._outerDeadzone = outerDeadzone;
        this._buttonCodes = {
            "b": 0, // x (cross)
            "a": 1, // circle
            "y": 2, // square
            "x": 3, // triangle
            "left bumper": 4, // l1
            "right bumper": 5, // r1
            "left trigger": 6, // l2; full pull only
            "right trigger": 7, // r2; full pull only
            "share": 8,
            "options": 9,
            "left stick click": 10, // l3
            "right stick click": 11, // r3
            "dpad up": 12, 
            "dpad down": 13,
            "dpad left": 14,
            "dpad right": 15,
        };

        this._getGamepad = function () {
            return null;
        };
        
        if (typeof window.navigator.webkitGetGamepads === "function") {
            if (padIndex === -1) {
                // Written by Mushy Avocado
                this._getGamepad = function () {
                    const gamepads = window.navigator.webkitGetGamepads();
                    return gamepads[0] || gamepads[1] || gamepads[2] || gamepads[3] || null;
                };
            }
            else {
                this._getGamepad = function () {
                    return window.navigator.webkitGetGamepads()[padIndex] || null;
                };
            }
        }
        else if (typeof window.navigator.getGamepads === "function") {
            if (padIndex === -1) {
                // Written by Mushy Avocado
                this._getGamepad = function () {
                    const gamepads = window.navigator.getGamepads();
                    return gamepads[0] || gamepads[1] || gamepads[2] || gamepads[3] || null;
                };
            }
            else {
                this._getGamepad = function () {
                    return window.navigator.getGamepads()[padIndex] || null;
                };
            }
        }
    }

    updateConnection () {
        this._gamepad = this._getGamepad();
    }
    
    isConnected () {
        return this._gamepad !== null;
    }
    
    isPressed (button) {
        if (this._gamepad !== null) {
            const index = this._buttonCodes[button];
            if (button === "left trigger" || button === "right trigger") {
                if (this._gamepad.axes[index - 2] !== undefined) {
                    return this._gamepad.axes[index - 2] === 1;
                }
                return this._gamepad.buttons[index].value === 1;
            }
            return this._gamepad.buttons[index].pressed;
        }
        
        return false;
    }
    
    axisValue (axis, rawValue) {
        rawValue = (rawValue !== undefined ? rawValue : false);
        
        if (this._gamepad !== null) {
            if (axis === "left trigger") {
                if (this._gamepad.axes[4] !== undefined) {
                    return map(this._gamepad.axes[4], -1, 1, 0, 1);
                }
                return this._gamepad.buttons[6].value;
            }
            if (axis === "right trigger") {
                if (this._gamepad.axes[5] !== undefined) {
                    return map(this._gamepad.axes[5], -1, 1, 0, 1);
                }
                return this._gamepad.buttons[7].value;
            }
            
            let value;
            if (axis === "left stick x") {
                value = this._gamepad.axes[0];
            }
            else if (axis === "left stick y") {
                value = this._gamepad.axes[1];
            }
            else if (axis === "right stick x") {
                value = this._gamepad.axes[2];
            }
            else if (axis === "right stick y") {
                value = this._gamepad.axes[3];
            }
            
            if (rawValue) { return value; }
            return this._applyDeadzone(
                value,
                this._innerDeadzone,
                this._outerDeadzone
            );
        }
        
        return 0;
    }
    
    stickPos (stick, rawValue) {
        return new Vector(
            this.axisValue(stick + " stick x", rawValue),
            this.axisValue(stick + " stick y", rawValue)
        );
    }
    
    stickVector (stick) {
        let v = this.stickPos(stick);
        v.normalize();
        return v;
    }
    
    _applyDeadzone (value, inner, outer) {
        outer = 1 - outer;
        if (value < 0) {
            if (value >= -inner) { return 0; }
            if (value <= -outer) { return -1; }
            return map(value, -outer, -inner, -1, 0);
        }
        else {
            if (value <= inner) { return 0; }
            if (value >= outer) { return 1; }
            return map(value, inner, outer, 0, 1);
        }
    }

}

export { Gamepad };