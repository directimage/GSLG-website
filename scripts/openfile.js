function writeFile(pathOfFileToRead) {
	document.write(readStringFromFileAtPath(pathOfFileToRead));
}

function writeFileToRemoteTarget(pathOfFileToRead, target){
	document.getElementById(target).innerHTML = readStringFromFileAtPath(pathOfFileToRead);
}

function readStringFromFileAtPath(pathOfFileToRead) {
	var request = new XMLHttpRequest();
	request.open("GET", pathOfFileToRead, false);
	request.send(null);
	return request.responseText;
}