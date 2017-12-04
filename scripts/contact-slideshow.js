// Slide Show for images on the contact page
function slideShow() {
	var $active = $('#contactslide img.active');
	var $next  = $active.next().length ? $active.next() : $('#contactslide img:first');

	$active.addClass('last-active');

	$next.css({opacity: 0.0});
	$next.addClass('active');
	$next.animate({opacity: 1.0}, 1000, function() {
		$active.removeClass('active last-active');
	});
}

// Run the slide show every 2.5 seconds
$(function() {
	setInterval( "slideShow()", 2500 );
});
