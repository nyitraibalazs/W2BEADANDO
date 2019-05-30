import { Dispatcher } from 'flux'
import axios from "axios";
import ShutterConstans from '../constans/ShutterConstans'
import ShutterStore from '../store/ShutterStore'

class ShutterDataDispatcher extends Dispatcher {

   handleViewAction(action){
      this.dispatch({
         source : 'VIEW_ACTION',
         action : action
      });
   }
}

const dispatcher = new ShutterDataDispatcher();

dispatcher.register((data) => {
   if(data.action.actionType !== ShutterConstans.REFRESH_SHUTTER_COLORS){
      return;
   }

   axios.get("/shutter-data/getAllShutterColors").then((response) => {
         ShutterStore._shutterColors = response.data.colors;
         ShutterStore.ColorsChange()
      })
});

dispatcher.register((data) => {
   if(data.action.actionType !== ShutterConstans.REFRESH_SHUTTER_TYPES){
      return;
   }

   axios.get("/shutter-data/getAllShutterTypes").then((response) => {
         ShutterStore._shutterTypes = response.data.types;
         ShutterStore.TypesChange()
      })
});

dispatcher.register((data) => {
   if(data.action.actionType !== ShutterConstans.REFRESH_SHUTTER_MATERIALS){
      return;
   }

   axios.get("/shutter-data/getAllShutterMaterials").then((response) => {
         ShutterStore._shutterMaterials = response.data.materials;
         ShutterStore.MaterialsChange()
      })
});

export default dispatcher;
