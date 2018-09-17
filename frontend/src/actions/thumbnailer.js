export const fetchThumbnails = () => {
  return (dispatch, getState) => {
    let headers = {"Content-Type": "application/json"};
    let {token} = getState().auth;
    
    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }
    
    return fetch("/api/thumbnails/", {headers, })
    .then(res => {
      if (res.status < 500) {
        return res.json().then(data => {
          return {status: res.status, data};
        })
      } else {
        console.log("Server Error!");
        throw res;
      }
    })
    .then(res => {
      if (res.status === 200) {
        return dispatch({type: 'FETCH_THUMBNAILS', thumbnails: res.data});
      } else if (res.status === 401 || res.status === 403) {
        dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
        throw res.data;
      }
    })
  }
}

export const addThumbnail = (image, caption) => {
  return (dispatch, getState) => {
    let headers = {};
    
    let {token} = getState().auth;
    
    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }
    
    let body = new FormData();
    body.append('image', image);
    body.append('caption', caption);
    
    return fetch("/api/thumbnails/", {headers, method: "POST", body})
    .then(res => {
      if (res.status < 500) {
        return res.json().then(data => {
          return {status: res.status, data};
        })
      } else {
        console.log("Server Error!");
        throw res;
      }
    })
    .then(res => {
      if (res.status === 201) {
        return dispatch({type: 'ADD_THUMBNAIL', thumbnail: res.data});
      } else if (res.status === 401 || res.status === 403) {
        dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
        throw res.data;
      }
    })
  }
}

export const updateThumbnail = (index, image, caption) => {
  return (dispatch, getState) => {
    
    let headers = {};
    let {token} = getState().auth;
    
    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }
    
    let body = new FormData();
    body.append('image', image);
    body.append('caption', caption);
    let thumbnailId = getState().thumbnails[index].id;
    
    return fetch(`/api/thumbnails/${thumbnailId}/`, {headers, method: "PUT", body})
    .then(res => {
      if (res.status < 500) {
        return res.json().then(data => {
          return {status: res.status, data};
        })
      } else {
        console.log("Server Error!");
        throw res;
      }
    })
    .then(res => {
      if (res.status === 200) {
        return dispatch({type: 'UPDATE_THUMBNAIL', thumbnail: res.data, index});
      } else if (res.status === 401 || res.status === 403) {
        dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
        throw res.data;
      }
    })
  }
}

export const deleteThumbnail = index => {
  return (dispatch, getState) => {
    
    let headers = {"Content-Type": "application/json"};
    let {token} = getState().auth;
    
    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }
    
    let thumbnailId = getState().thumbnails[index].id;
    
    return fetch(`/api/thumbnails/${thumbnailId}/`, {headers, method: "DELETE"})
    .then(res => {
      if (res.status === 204) {
        return {status: res.status, data: {}};
      } else if (res.status < 500) {
        return res.json().then(data => {
          return {status: res.status, data};
        })
      } else {
        console.log("Server Error!");
        throw res;
      }
    })
    .then(res => {
      if (res.status === 204) {
        return dispatch({type: 'DELETE_THUMBNAIL', index});
      } else if (res.status === 401 || res.status === 403) {
        dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
        throw res.data;
      }
    })
  }
}
