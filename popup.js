/**
	This is the popup.js file, used to receive the list of urls that the grabber content script has found and expose them to the popup.html file.
**/

function get_urls() {
  var testVar = chrome.extension.getBackgroundPage().test;
  var picUrls = chrome.extension.getBackgroundPage().IMAGE_URLS;
  if (picUrls){
  	console.log("The popup.js is working")
  	console.log(testVar)

  	// picUrls = ["www.google.com", "www.google2.com", "www.google3.com"];
  	
  	// create a container object for the list
  	var listContainer = document.createElement("div");	
  	// add it to the DOm
  	document.getElementsByTagName("body")[0].appendChild(listContainer);
  	// create a ul object for the list items
  	var listElement = document.createElement("ul");
  	// add that to the DOm
	listContainer.appendChild(listElement);

	// loop through the urls, and append them to the ul object
  	for (var i = picUrls.length - 1; i >= 0; i--) {
  		var listItem = document.createElement("li");
  		listItem.innerHTML = picUrls[i];
		listElement.appendChild(listItem);
  	};
  }
    
}

window.onload = get_urls();