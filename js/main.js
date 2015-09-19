var observer = new FontFaceObserver('Roboto Regular', {});
var body = document.getElementsByTagName("body")[0];

observer.check().then(function () {
    body.className = "fonts-loaded";
});
