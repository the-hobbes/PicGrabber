/**
	This is the content script file. Coordinated by background.js
**/

//constants
var HEIGHT = 500;
var WIDTH = 500;

function parseUrls() {
	// get the urls of the images 
	var images = document.getElementsByTagName('img'); 
	var srcList = [];

	for(var i = 0; i < images.length; i++) {
	    srcList.push(images[i].src);
	}

	return srcList;
}

function checkImageSize(IMAGE_URLS) {
	// check the image size to see if it is large enough to warrant a download
	for (var i = 0; i < IMAGE_URLS.length; i++){
		//check the size of each image
		var img = new Image();
		img.onload = function() {
		  console.log( "Image SRC: " + this.src + " \t Image Size: " + this.width + 'x' + this.height);

		  //logic check for image size here
		  if (this.width > WIDTH)
			  downloadImage(this.src);
		}
		img.src = IMAGE_URLS[i];
	}
}

function downloadImage(src) {
	// download the requested images
	// https://www.dropbox.com/developers/dropins/saver
	console.log(src);

}

function main(){
	// find the images
	var IMAGE_URLS = parseUrls();

	if (IMAGE_URLS){
		// if we have images, check the size
		checkImageSize(IMAGE_URLS);
		// then send them to the background page
		chrome.runtime.sendMessage({data: IMAGE_URLS}, function(response) {
		  console.log(response.backgroundResponse);
		});
	}
	else{
		// tell the background page we've got nothing
		chrome.runtime.sendMessage({greeting: null}, function(response) {
		  console.log(response.farewell);
		});
	}
	
}

//kick off
console.log("got to grabber.js")
main()

