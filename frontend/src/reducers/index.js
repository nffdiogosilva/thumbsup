import { combineReducers } from 'redux';
import thumbnails from "./thumbnailer";
import auth from "./auth";


const ThumbnailApp = combineReducers({
  thumbnails,
  auth,
})

export default ThumbnailApp;