/**
*	Site-specific configuration settings for Highslide JS
*/
hs.graphicsDir = 'highslide-spotlight/graphics/';
hs.showCredits = false;
hs.creditsPosition = 'bottom left';
hs.outlineType = 'custom';
hs.dimmingOpacity = 0.85;
hs.dimmingDuration = 250;
hs.align = 'center';
hs.allowSizeReduction = false;
hs.allowMultipleInstances = true;
hs.enableKeyListener = false;
hs.registerOverlay({
	html: '<div class="closebutton" onclick="return hs.close(this)" title="Close"></div>',
	position: 'top right',
	useOnHtml: true,
	fade: 2 // fading the semi-transparent overlay looks bad in IE
});

