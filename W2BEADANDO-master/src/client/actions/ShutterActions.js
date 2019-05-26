import ShutterConstans from '../constans/ShutterConstans'
import ShutterDispatcher from '../dispatcher/ShutterDispatcher'

class ShutterDataActions {

   refreshShutterColors() {
      ShutterDispatcher.handleViewAction({
         actionType : ShutterConstans.REFRESH_SHUTTER_COLORS
      });
   }

   refreshShutterTypes() {
      ShutterDispatcher.handleViewAction({
         actionType : ShutterConstans.REFRESH_SHUTTER_TYPES
      });
   }

   refreshShutterMaterials(){
      ShutterDispatcher.handleViewAction({
         actionType : ShutterConstans.REFRESH_SHUTTER_MATERIALS
      });
   }
}

export default new ShutterDataActions();
