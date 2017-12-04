//<![CDATA[
hs.graphicsDir = 'highslide/graphics/';
hs.showCredits = false;
hs.creditsPosition = 'bottom left';
hs.outlineType = null;
hs.dimmingOpacity = 1;
hs.dimmingDuration = 0;
hs.restoreCursor = null;
hs.fadeInOut = true;
hs.align = 'center';
hs.maxHeight = 490;
hs.maxWidth = 725;
hs.marginLeft = 105;
hs.marginRight = 5;
hs.marginTop = 5;
hs.marginBottom = 5;
hs.allowMultipleInstances = false;
hs.enableKeyListener = false;
hs.fullExpandOpacity = 0;


// Add the slideshow controller
hs.addSlideshow({
	//slideshowGroup: 'group1',
	interval: 1,
	repeat: true,
	useControls: true,
	overlayOptions: {
		className: 'controls-in-heading',
		opacity: .8,
		position: 'bottom center',
		offsetX: 20,
		offsetY: 15,
		hideOnMouseOut: false
	},
	thumbstrip: {
		mode: 'vertical',
		position: 'left',
		relativeTo: 'viewport'
	}

});

// gallery config object
var config1 = {
	slideshowGroup: 'group1',
	outlineType: null,
	wrapperClassName: 'in-page controls-in-heading',
	thumbnailId: 'gallery-area',
	transitions: ['expand', 'crossfade']
};

// Open the first thumb on page load
hs.addEventListener(window, 'load', function() {
	document.getElementById('0').onclick();
});
 
// Cancel the default action for image click and do next instead
hs.Expander.prototype.onImageClick = function() {
	if (/in-page/.test(this.wrapper.className))	return hs.next();
}
 
// Under no circumstances should the static popup be closed
hs.Expander.prototype.onBeforeClose = function() {
	if (/in-page/.test(this.wrapper.className))	return false;
}
// ... nor dragged
hs.Expander.prototype.onDrag = function() {
	if (/in-page/.test(this.wrapper.className))	return false;
}
 
// Keep the position after window resize
hs.addEventListener(window, 'resize', function() {
	var i, exp;
	hs.getPageSize();
 
	for (i = 0; i < hs.expanders.length; i++) {
		exp = hs.expanders[i];
		if (exp) {
			var x = exp.x,
				y = exp.y;
 
			// get new thumb positions
			exp.tpos = hs.getPosition(exp.el);
			x.calcThumb();
			y.calcThumb();
 
			// calculate new popup position
		 	x.pos = x.tpos - x.cb + x.tb;
			x.scroll = hs.page.scrollLeft;
			x.clientSize = hs.page.width;
			y.pos = y.tpos - y.cb + y.tb;
			y.scroll = hs.page.scrollTop;
			y.clientSize = hs.page.height;
			exp.justify(x, true);
			exp.justify(y, true);
 
			// set new left and top to wrapper and outline
			exp.moveTo(x.pos, y.pos);
		}
	}
});
//]]>