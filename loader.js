chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
  console.log('Running pic grabber against: ' + tab.url + ' now!');
  chrome.tabs.executeScript({
    file: "grabber.js"
    });
});
