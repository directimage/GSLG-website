var lastActive = $('.marketbutton-on');

function setActiveGallery(element) {
	lastActive.removeClass("marketbutton-on");

	$(element).addClass("marketbutton-on");
	lastActive = $(element);
}