var ShutterClass = require("./Shutter");

function Window(width, height, shutter) {
    if(width === undefined) {
        throw "width cannot be undefined";
    }
    if(height === undefined) {
        throw "height cannot be undefined";
    }
    if(shutter === undefined) {
        throw "shutter cannot be undefined";
    }


    this.width =  width;
    this.height =  height;
    this.shutter = new ShutterClass.ShutterFromJson(shutter);
}

function WindowFromJson(window) {
    if(window === undefined) {
        throw "window cannot be undefined";
    }

    return new Window(window.width, window.height, window.shutter);
}

module.exports = {
    Window: Window,
    WindowFromJson: WindowFromJson
};
