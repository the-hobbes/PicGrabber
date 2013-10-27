/**
	This is the backgrounf file. Coordinates passing of data between the grabber.js content script and the popup content script
**/

// chrome.browserAction.onClicked.addListener(function(tab) {
//   // No tabs or host permissions needed!
//   chrome.tabs.executeScript({
//     file: "popup.js"
//     });
// });

var IMAGE_URLS = []
var test = "hodor";

chrome.runtime.onMessage.addListener(
  // listen and communicate w/content scripts
  function(request, sender, sendResponse) {
    if (request.data){
    	sendResponse({backgroundResponse: "Pictures grabbed!"});
    	IMAGE_URLS = request.data
    }
    else{
    	sendResponse({backgroundResponse: "No pictures to grab!"});
    }
  });


chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  // fire when a new tab is made and its finished loading
  if (changeInfo.status == 'complete' && tab.active) {
    // alert("Derp");
    chrome.tabs.executeScript({
    file: "grabber.js"
    });
  }
})

chrome.tabs.onActivated.addListener(function(activeInfo) {
  // fire when you switch to a new tab
    chrome.tabs.get(activeInfo.tabId, function (tab) {
      chrome.tabs.executeScript({
        file: "grabber.js"
        });
    });
});