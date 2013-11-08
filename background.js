/**
	This is the background script. It coordinates passing of data between the grabber.js (which saves the images it scrapes to a variable here for the popup to acces),
  the save.js (a content script that saves the pictures in the tab) and the popup.js script that writes to the popup.html and handles the button listener which fires
  off the download of save.js.
**/

var IMAGE_URLS = []
var test = "hodor";

// chrome.tabs.executeScript(null, {file: "grabber.js"});

chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
        switch (request.directive) {
        case "popup-click":
            // alert("Request: '" + request.directive + "' from " + sender);
            // execute the saving content script
            chrome.tabs.executeScript(null, { // defaults to the current tab
                file: "save.js", // script to inject into page and run in sandbox
                allFrames: true // This injects script into iframes in the page and doesn't work before 4.0.266.0.
            });
            sendResponse({}); // sending back empty response to sender
            break;
        case "setImages":
          // set the image urls from pigrabber
          // alert("Request: '" + request.directive + "' from " + sender);
          IMAGE_URLS = request.data;
          sendResponse({backgroundResponse: "Pictures grabbed!"});
          break;
        default:
            // helps debug when request directive doesn't match
            alert("Unmatched request of '" + request.directive + "' from script to background.js from " + sender);
        }
    }
);
