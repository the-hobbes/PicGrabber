/**
	This is the backgrounf file. Coordinates passing of data between the grabber.js content script and the popup content script
**/

// chrome.browserAction.onClicked.addListener(function(tab) {
//   // No tabs or host permissions needed!
//   chrome.tabs.executeScript({
//     file: "grabber.js"
//     });
// });

var IMAGE_URLS = []
var test = "hodor";

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.data){
    	sendResponse({backgroundResponse: "Pictures grabbed!"});
    	IMAGE_URLS = request.data
    }
    else{
    	sendResponse({backgroundResponse: "No pictures to grab!"});
    }
  });