var counter = (function(){
    var cnt = 0;
    return function(){
        cnt++;
        return cnt;
    }
})();

function Shutter(color, material, type, isFinished) {
    if(color === undefined) {
        throw "color cannot be undefined";
    }
    if(material === undefined) {
        throw "material cannot be undefined";
    }
    if(type === undefined) {
        throw "type cannot be undefined";
    }
    if(isFinished === undefined) {
        throw "isFinished cannot be undefined";
    }


    this.id = counter();
    this.color =  color;
    this.material = material;
    this.type = type;
    this.isFinished = isFinished
}

function ShutterFromJson(shutter) {
    if(shutter === undefined) {
        throw "shutter cannot be undefined";
    }

    return new Shutter(shutter.color, shutter.material, shutter.type, shutter.isFinished);
}

module.exports = {
    Shutter: Shutter,
    ShutterFromJson: ShutterFromJson
};
