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

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "hello")
      sendResponse({farewell: "goodbye"});
  });