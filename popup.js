/**
	This is the popup.js file, used to receive the list of urls that the grabber content script has found and expose them to the popup.html file.
**/

function get_urls() {
  var picUrls = chrome.extension.getBackgroundPage().IMAGE_URLS;
  if (picUrls){
  	console.log("The popup.js is working")

  	// picUrls = ["www.google.com", "www.google2.com", "www.google3.com"];
  	
  	// create a container object for the list
  	var listContainer = document.createElement("div");	
  	// add it to the DOm
  	document.getElementsByTagName("body")[0].appendChild(listContainer);
  	// create a ol object for the list items
  	var listElement = document.createElement("ol");
  	// add that to the DOm
    listContainer.appendChild(listElement);

	// loop through the urls, and append them to the ol object
  	for (var i = picUrls.length - 1; i >= 0; i--) {
      var slashIndex = picUrls[i].lastIndexOf("/");
      var picName = picUrls[i].substring(slashIndex+1, picUrls[i].txt);

      var listItem = document.createElement("li");
      listItem.innerHTML = "<a href='" + picUrls[i] +"'>" + picName + "</a><img src='" + picUrls[i] + "'width=25%, height=25%></img>";
      listElement.appendChild(listItem);
    }
  }
    
}

window.onload = get_urls();