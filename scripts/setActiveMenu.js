// function gets variable called name from URL	
function getVar( name ){
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");  
	var regexS = "[\\?&]"+name+"=([^&#]*)";  
	var regex = new RegExp( regexS );  
	var results = regex.exec( window.location.href ); 
	if( results == null ){
		return "";
	}
	else{    
		return results[1];
	}
}

// changes the class of the div with id equal to up 
// from 'menu-button menu-notActive' to 'menu-button menu-active'
function setActive( varname, defaultActive, activeClass){
	// get the variable from the URL
	var urlVar = getVar(varname);

	// if no URL variables, default urlVar to defaultActive
	if(urlVar == ""){
		urlVar = defaultActive;
	}
	
	// changes the class of the div with id equal to urlVar 
	// to activeClass
	document.getElementById(urlVar).className = activeClass;
}
