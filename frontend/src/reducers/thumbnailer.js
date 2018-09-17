const initialState = [];

export default function thumbnails(state=initialState, action) {
  let thumbnailsList = state.slice();
  
  switch (action.type) {
    case 'ADD_THUMBNAIL':
      return [action.thumbnail, ...state];
    
    case 'UPDATE_THUMBNAIL':
      let thumbnailToUpdate = thumbnailsList[action.index]
      thumbnailToUpdate.caption = action.thumbnail.caption;
      thumbnailsList.splice(action.index, 1, thumbnailToUpdate);
      return thumbnailsList;
    
    case 'DELETE_THUMBNAIL':
      thumbnailsList.splice(action.index, 1);
      return thumbnailsList;
    
    case 'FETCH_THUMBNAILS':
      return [...action.thumbnails];
    
    default:
      return state;
  }
}
