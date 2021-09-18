function writeFile(name)
{
	var pathOfFileToRead = name;

	var contentsOfFileAsString = FileHelper.readStringFromFileAtPath
	(
		pathOfFileToRead
	);

	document.write(contentsOfFileAsString);
}

function writeFileToRemoteTarget(name, target)
{
	var pathOfFileToRead = name;

	var contentsOfFileAsString = FileHelper.readStringFromFileAtPath
	(
		pathOfFileToRead
	);

	document.getElementById(target).innerHTML = contentsOfFileAsString;
}

function FileHelper()
{}
{
	FileHelper.readStringFromFileAtPath = function(pathOfFileToReadFrom)
	{
		var request = new XMLHttpRequest();
		request.open("GET", pathOfFileToReadFrom, false);
		request.send(null);
		var returnValue = request.responseText;

		return returnValue;
	}
}