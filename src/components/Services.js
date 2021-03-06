
export const Services = function(returnService, path){

  let ajax = new XMLHttpRequest();

  ajax.onreadystatechange = (e) => {
    if (ajax.readyState !== 4) {
      return;
    }

    if (ajax.status === 200) {
      returnService( ajax.responseText );
      
    } else {
      console.warn('error');
    }
  };

  ajax.open('GET', path);
  ajax.send();
}