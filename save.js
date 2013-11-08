/**
    This is the content script that saves images from the browser tab. Called by a button click from popup.js. which then goes to the background page listener, which
    then executes this script.
**/

/* Download an img */
function download(img) {
    var link = document.createElement("a");
    link.href = img.src;
    link.download = true;
    link.style.display = "none";
    var evt = new MouseEvent("click", {
        "view": window,
        "bubbles": true,
        "cancelable": true
    });

    document.body.appendChild(link);
    link.dispatchEvent(evt);
    document.body.removeChild(link);
    console.log("Downloading...");
}

/* Download all images in 'imgs'. 
 * Optionaly filter them by extension (e.g. "jpg") and/or 
 * download the 'limit' first only  */
function downloadAll(imgs, ext, limit) {
    /* If specified, filter images by extension */
    if (ext) {
        ext = "." + ext;
        imgs = [].slice.call(imgs).filter(function(img) {
            var src = img.src;
            return (src && (src.indexOf(ext, src.length - ext.length) !== -1));
        });
    }

    /* Determine the number of images to download */
    limit = (limit && (0 <= limit) && (limit <= imgs.length))
            ? limit : imgs.length;

    /* (Try to) download the images */
    for (var i = 0; i < limit; i++) {
        var img = imgs[i];
        console.log("IMG: " + img.src + " (", img, ")");
        download(img);
    }
}

function testDerp(stuff){
    console.log("got to testDerp, with: " + stuff[0]);
}

function doit(amountImages) {
    // var imgs = document.querySelectorAll("img");
    // downloadAll(imgs, "jpg", amountImages);
   
    chrome.extension.sendMessage({directive: "getImages"}, function(response) {
        var pictureObjects = response.backgroundResponse;
        var imgUrls = [];
        for (var i = 0; i < pictureObjects.length; i++) {
            imgUrls.push(pictureObjects[i].src);
        };
        testDerp(imgUrls);
    });
}

doit(-1);
