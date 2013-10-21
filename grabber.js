/**
	This is the content script file. Coordinated by background.js
**/

//constants/globals
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

function checkImageSize(imageUrls) {
	var bacon = []; // bacon is what we want.
	// check the image size to see if it is large enough to warrant a download
	for (var i = 0; i < imageUrls.length; i++){
		//check the size of each image
		var img = new Image();
		img.src = imageUrls[i];
		// console.log( "Image SRC: " + img.src + " \t Image Size: " + img.width + 'x' + img.height);
		if (img.width > WIDTH)
			bacon.push(img.src);
	}
	return bacon
}

function negResponse(){
	// tell the background page we've got nothing
	chrome.runtime.sendMessage({greeting: null}, function(response) {
		  console.log(response.farewell);
	});
}

function removeDuplicates(things){
	var arr = {};

	for ( var i=0; i < things.length; i++ )
	    arr[things[i]['src']] = things[i];

	things = new Array();
	for ( key in arr )
	    things.push(arr[key]);

	return things;
}

function main(){
	// find the images
	// console.log("got to grabber.js")
	var imageUrls = parseUrls();

	if (imageUrls){
		// if we have images, check the size
		bacon = checkImageSize(imageUrls);
		// remove the duplicates
		bacon = removeDuplicates(bacon);

		if(bacon){
			// then send them to the background page
			chrome.runtime.sendMessage({data: bacon}, function(response) {
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

