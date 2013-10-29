/**
	This is the content script file. Coordinated by background.js
**/

//constants/globals
var HEIGHT = 500;
var WIDTH = 200;

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
		if (img.width > WIDTH){
			// if the image meets our criteria, make an object out of it and store it
			var slashIndex = imageUrls[i].lastIndexOf("/");
			var picName = imageUrls[i].substring(slashIndex+1, imageUrls[i].txt);
			imageObject = new Object();
			imageObject.name = picName;
			imageObject.width = img.width;
			imageObject.height = img.height;
			imageObject.src = img.src;
			bacon.push(imageObject);
		}
	}
	return bacon;
}

function negResponse(){
	// tell the background page we've got nothing
	chrome.runtime.sendMessage({greeting: null}, function(response) {
		  console.log(response.farewell);
	});
}

function removeDuplicates(bacon){
	var unique = {};
	var uniqueBacon = [];

	for (var i = 0; i < bacon.length; i++) {
		unique[bacon[i].name] = i;
	};

	for(item in unique){
		// console.log(unique[item]);
		uniqueBacon.push(bacon[unique[item]]);
	}
	return uniqueBacon;
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

