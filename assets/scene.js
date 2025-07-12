
class Scene {

    constructor(sceneName, drawFunc, images) {
        this.name = sceneName;
        this.draw = drawFunc;

        this.image = images.keyWOrd;
    }
}

export {Scene}