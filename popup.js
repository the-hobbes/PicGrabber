/**
	This is the popup.js file, used to receive the list of urls that the grabber content script has found and expose them to the popup.html file.
**/

function get_urls() {
  var picUrls = chrome.extension.getBackgroundPage().IMAGE_URLS;
  if (picUrls){
  	console.log("The popup.js is working")
      	
  	// create a container object for the list
  	var listContainer = document.createElement("div");	
  	// add it to the DOm
  	document.getElementsByTagName("body")[0].appendChild(listContainer);
  	// create a ul object for the list items
  	var listElement = document.createElement("ul");
  	// add that to the DOm
    listContainer.appendChild(listElement);

    saveThese = []

  	// loop through the urls, and append them to the ul object
    for (var i = picUrls.length - 1; i >= 0; i--) {
      var listItem = document.createElement("li");
      // listItem.innerHTML = "<a href='" + picUrls[i].src +"'>" + picUrls[i].name + "</a><img src='" + picUrls[i].src + "'width=25%, height=25%></img>";
      listItem.innerHTML = "<img src='" + picUrls[i].src + "'width=25%, height=25%></img>";
      listElement.appendChild(listItem);

      saveThese.push({
        'url':picUrls[i].src,
        'filename':picUrls[i].name
      });
    }

    // create dropbox saver dropin
    options = {
      files: saveThese,
      success: function() {},
      progress: function(progress) {},
      cancel: function() {},
      error: function(errmsg) {}
    } // end options
  }
  
  Dropbox.createSaveButton(options);
  var btn = Dropbox.createSaveButton(options);
  document.getElementById('btn-container').appendChild(btn); 
}

window.onload = get_urls();