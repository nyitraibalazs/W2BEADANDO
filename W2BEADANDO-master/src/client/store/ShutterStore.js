import EventEmitter from 'events'

class ShutterStore extends EventEmitter {
   _shutterColors = [];
   _shutterTypes = [];
   _shutterMaterials = [];

   ColorsChange() {
      this.emit('shutter-colors-change');
   }

   addColorsChange(callback) {
      this.addListener('shutter-colors-change', callback);
   }

   removeColorsChange(callback) {
      this.removeListener('shutter-colors-change', callback);
   }

   TypesChange() {
      this.emit('shutter-types-change');
   }

   addTypesChange(callback) {
      this.addListener('shutter-types-change', callback);
   }

   removeTypesChange(callback) {
      this.removeListener('shutter-types-change', callback);
   }

   MaterialsChange() {
      this.emit('shutter-materials-change');
   }

   addMaterialsChange(callback) {
      this.addListener('shutter-materials-change', callback);
   }

   removeMaterialsChange(callback) {
      this.removeListener('shutter-materials-change', callback);
   }
}

export default new ShutterStore();
