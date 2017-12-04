// currently opened box
var currOpen;
var clicked = false;

function popClick( object ){
	// get the box we want to set the height of
	var textBox = object.getElementsByTagName("div")[0];
	
	clicked = true;
	
	// if there is an opened box then close it
	if(currOpen != null){
		currOpen.style.zIndex = "2";
		currOpen.style.height = "0px";
		clicked = false;
	}
	
	// if the box you clicked on is closed and it wasn't just open
	// then open it and set it to the currently opened one
	// ohterwise clear the last opened one (all are now closed)
	if(textBox != currOpen){
		currOpen = textBox;
		textBox.style.zIndex = "4";
		textBox.style.height = object.getElementsByTagName("div")[1].clientHeight + "px";
	}
	else{
		currOpen = null;
	}
}

function popIn( object ){
	if(!clicked){
		textBox = object.getElementsByTagName("div")[0];
		textBox.style.zIndex = "2";
		textBox.style.height = "0px";
	}
}
function popOut( object ){
	if(!clicked){
		textBox = object.getElementsByTagName("div")[0];
		textBox.style.zIndex = "4";
		textBox.style.height = object.getElementsByTagName("div")[1].clientHeight + "px";
	}
}	
