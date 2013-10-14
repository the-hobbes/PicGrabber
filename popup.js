/**
	This is the popup.js file, used to receive the list of urls that the grabber content script has found and expose them to the popup.html file.
**/

function test() {
  var testVar = chrome.extension.getBackgroundPage().test;
  if (testVar)
    console.log("The popup.js is working")
}

window.onload = test;