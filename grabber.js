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
	
	var img = new Image();
	img.onload = function() {
	  alert(this.width + 'x' + this.height);
	}
	img.src = 'http://www.google.com/intl/en_ALL/images/logo.gif';
	// img.src = 'http://i.imgur.com/ghE6vol.jpg';
}

function downloadImage(image) {
	// download the requested images
	return null;
}

function main(){
	//run the script
	var IMAGE_URLS = parseUrls();
	checkImageSize(IMAGE_URLS);

	for (var i = 0; i <IMAGE_URLS.length; i++){
		console.log(IMAGE_URLS);
	}
}

//kick off
main()