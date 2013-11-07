/**
	This is the popup.js file, used to receive the list of urls that the grabber content script has found and expose them to the popup.html file.
**/

function get_urls(ceaseLoading) {
  var picUrls = chrome.extension.getBackgroundPage().IMAGE_URLS;
  if (picUrls.length > 0){
  	console.log("The popup.js is working")
      	
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

    // add saver button
    // var saver = "<a href='#' onclick='downloadit();'>Download All</a>";
    // var currElement = document.getElementById("btn-container");
    // console.log(currElement);
    // currElement.appendChild(saver);
  }
  else{
    console.log("nothing big enough");
    document.body.innerHTML = "No images of sufficient size on the page.";
  }

  // stop loading gif. render other elements visible w/the callback
  ceaseLoading();
}

function ceaseLoading(){
  // console.log("got to cease loading function");
  try{
    var loader = document.getElementById("loadingImage");
    loader.style.display = "none";
    var content = document.getElementById("content");
    content.style.display = "block";
  }
  catch(err){
    console.log(err);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  //a add an event listener to the firedownload button object
    var link = document.getElementById('fireDownload');
    // onClick's logic below:
    try{
      link.addEventListener('click', function() {
          downloadit();
      });
    }
    catch(err){
      console.log(err);
    }
});

function simulateClick() {
  var event = new MouseEvent('click', {
    'view': window,
    'bubbles': true,
    'cancelable': true
  });
  var cb = document.getElementById('checkbox'); 
  var canceled = !cb.dispatchEvent(event);
  if (canceled) {
    // A handler called preventDefault.
    alert("canceled");
  } else {
    // None of the handlers called preventDefault.
    alert("not canceled");
  }
} 

function downloadit(){
  //perform the actual download, looping through the clickit elements and downloading their targets  

    for (var i = 0; i < document.getElementsByClassName("clickit").length; i++){  

      // console.log("got here " + i);

      // var event = new MouseEvent('click', {
      //   'view': window,
      //   'bubbles': true,
      //   'cancelable': true
      // });
      // var targetElement = document.getElementsByClassName("clickit")[i];
      // var canceled = !targetElement.dispatchEvent(event);
      // if (canceled) {
      //   // A handler called preventDefault.
      //   console.log("canceled");
      // } else {
      //   // None of the handlers called preventDefault.
      //   console.log("not canceled");
      // }

      var clickEvent = document.createEvent("MouseEvent");
      clickEvent.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null); 
      setTimeout(document.getElementsByClassName("clickit")[i].dispatchEvent(clickEvent), 3000);
      // document.getElementsByClassName("clickit")[i].dispatchEvent(clickEvent);
    }
    return false;
}

window.onload = get_urls(ceaseLoading);