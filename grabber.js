// globals
var IMAGE_URLS = [];

function parseUrls() {
	// get image url's from page
	var images = document.getElementsByTagName('img'); 
	var srcList = [];

	for(var i = 0; i < images.length; i++) {
	    srcList.push(images[i].src);
	}

	IMAGE_URLS = srcList;
}

function requestImage(sourceUrl) {
	// used to perform XHR GET request for image url
	// var xmlHttp = null;
 //    xmlHttp = new XMLHttpRequest();
 //    xmlHttp.open( "GET", sourceUrl, false );
 //    xmlHttp.send( null );
 //    return xmlHttp.responseText;
	 chrome.downloads.download({url: visibleLinks[i]},
	                                             function(id) {
	      });
}

function checkImageSize(image) {
	// check the image size to see if it is large enough to warrant a download
	return null;
}

function downloadImage(image) {
	// used to download the requested images
	return null;
}

parseUrls();

/*
	for each url in image_urls,
	check to see if the image is large enough
	dowload the image
	save the image to disk
*/
for (var i = 0; i <IMAGE_URLS.length; i++){
	// console.log( IMAGE_URLS[i] );
	img = requestImage(IMAGE_URLS[i]);
	console.log(IMAGE_URLS, img);
}

// NOTES
// https://developer.chrome.com/extensions/overview.html#arch
// https://developer.chrome.com/extensions/content_scripts.html#pi
// https://developer.chrome.com/extensions/samples.html#028eb5364924344029bcbe1d527f132fc72b34e5
// http://stackoverflow.com/questions/4532236/how-can-i-access-the-pages-dom-rather-than-the-popups-dom-using-jquery-if-pos
