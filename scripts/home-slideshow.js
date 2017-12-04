// Slide Show for images on the home page
function slideShow() {
	var $active = $('#homeslide div.active');
	var $next  = $active.next().length ? $active.next() : $('#homeslide div:first');

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

var $previousButton = -1;
//var previousreset = setInterval( "$previousButton = -1", 20000 );

function slideText( slideTo ) {
	var $active = $('#slidetext DIV.active');

	if ( $active.length == 0 ) $active = $('#slidetext DIV:last');

	var $next = $active.next().length ? $active.next() : $('#slidetext DIV:first');

	$active.addClass('last-active');

	// added "slideTo" variable to allow transition to a selected slide
	// defaults to null, but if it's >= 0, it will use this index for "$next"
	var slideTo = ( slideTo + 1 ) ? slideTo : null;
	if ( slideTo != null ) {
		$next = $('#slidetext DIV').eq(slideTo);
	}
	
	$next.css({opacity: 0.0})
	$next.addClass('active')
	$next.animate({opacity: 1.0}, 1000, function() {
		$active.removeClass('active last-active');
		$previousButton = slideTo;
	});
	
	var $slideButtons = $("#slide-buttons a.slide-button");
	$slideButtons.each(function() {
		$(this).removeClass('active');
	});
	$($slideButtons[ $next.index() ]).addClass('active');
}

$(document).ready(function(){
	// hide all slides except first to avoid initial flicker
	$("#slidetext DIV").css({opacity: 0.0});
	$("#slidetext DIV:first").css({opacity: 1.0});

	// use setInterval to traverse list
	var playslidetext = setInterval( "slideText()", 13000 );

	// create buttons to move to specific slide
	var $slideButtons = $("#slide-buttons a.slide-button");
		
	$slideButtons.click(function(){
		if ($slideButtons.index(this) != $previousButton) {
			// stop the slidetext, to keep it from trying to overlap our transition
			clearInterval(playslidetext);
			// call the function using the index of the clicked button
			slideText( $slideButtons.index(this) );
			$previousButton = $slideButtons.index(this);
			// restart the slidetext
			setTimeout( playslidetext = setInterval( "slideText()", 13000 ), 13000);
		}
	});
});