/**
	This is the popup.js file, used to receive the list of urls that the grabber content script has found and expose them to the popup.html file.
**/

function get_urls() {
  var picUrls = chrome.extension.getBackgroundPage().IMAGE_URLS;
  if (picUrls.length > 0){      	
  	// create a container object for the list
  	var listContainer = document.createElement("div");	
  	// add it to the DOm
  	document.getElementById("ulContainer").appendChild(listContainer);
  	// create a ul object for the list items
  	var listElement = document.createElement("ul");
  	// add that to the DOm
    listContainer.appendChild(listElement);
  	// loop through the urls, and append them to the ul object
    for (var i = picUrls.length - 1; i >= 0; i--) {
      var listItem = document.createElement("li");
      listItem.innerHTML = "<a href=" + picUrls[i].src + " download=" + picUrls[i].src + " class='clickit'><img src=" + picUrls[i].src + " width=25%, height=25%>" + "</a>";
      // listItem.innerHTML = "<img class='clickit' src='" + picUrls[i].src + "'width=25%, height=25%></img>";
      listElement.appendChild(listItem);
    }
  }
  else{
    console.log("nothing big enough");
    document.body.innerHTML = "No images of sufficient size on the page.";
  }
}

function ceaseLoading(){
  try{
    var loader = document.getElementById("loadingImage");
    loader.style.display = "none";
    var content = document.getElementById("content");
    content.style.display = "block";
  }
  catch(err){
    console.log(err);
  }
  //start loading the rest of the script
  get_urls();
}

function clickHandler(e) {
    chrome.extension.sendMessage({directive: "popup-click"}, function(response) {
        this.close(); // close the popup when the background finishes processing request
    });
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('click-me').addEventListener('click', clickHandler);
})

// tracking code for analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-11781420-7']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

// when the page loads, remove the gif and execute the rest
window.onload = ceaseLoading()