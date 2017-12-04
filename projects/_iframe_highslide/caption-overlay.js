var imgs = document.getElementsByTagName("a");
var caps = document.getElementById("inside-gallery-area").getElementsByTagName("div");

for(var i=0; i<imgs.length; i++){
	if(caps[i]) {
		imgs[i].id = i;
		caps[i].id = "overlay"+i;
		//caps[i].innerHTML = imgs[i].title;
		
		hs.registerOverlay({
			thumbnailId: imgs[i].id,
			overlayId: caps[i].id,
			position: 'bottom center',
			hideOnMouseOut: false,
			opacity: 0.8
		});
	}
}