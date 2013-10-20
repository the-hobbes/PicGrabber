/**
	This is the content script file. Coordinated by background.js
**/

//constants/globals
var HEIGHT = 500;
var WIDTH = 500;
var BACON = []; // bacon is what we want.

function parseUrls() {
	// get the urls of the images 
	var images = document.getElementsByTagName('img'); 
	var srcList = [];

	for(var i = 0; i < images.length; i++) {
	    srcList.push(images[i].src);
	}

	return srcList;
}

function checkImageSize(imageUrls) {
	
	// check the image size to see if it is large enough to warrant a download
	for (var i = 0; i < imageUrls.length; i++){
		//check the size of each image
		var img = new Image();
		img.src = imageUrls[i];
		// console.log( "Image SRC: " + img.src + " \t Image Size: " + img.width + 'x' + img.height);
		if (img.width > WIDTH)
			BACON.push(img.src);
	}
}

function negResponse(){
	// tell the background page we've got nothing
	chrome.runtime.sendMessage({greeting: null}, function(response) {
		  console.log(response.farewell);
	});
}

function main(){
	// find the images
	// console.log("got to grabber.js")
	var imageUrls = parseUrls();

	if (imageUrls){
		// if we have images, check the size
		checkImageSize(imageUrls);
		if(BACON){
			// then send them to the background page
			chrome.runtime.sendMessage({data: BACON}, function(response) {
			  console.log(response.backgroundResponse);
			});
		}
		else
			negResponse();
	}
	else
		negResponse();
}

//kick off
main()

