<?php session_start(); ?>
<!DOCTYPE html>
<html>
<head>
	<title>Thank You for Signing Up</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<link href="style.css" rel="stylesheet" type="text/css" />
	<link href='http://fonts.googleapis.com/css?family=Playball' rel='stylesheet' type='text/css'>
</head>
<body>
<?php
	function verifyFormToken($form) {
		// check if a session is started and a token is transmitted, if not return an error
		if(!isset($_SESSION[$form.'_token'])) { 
			return false;
		}
		// check if the form is sent with token in it
		if(!isset($_POST['token'])) {
			return false;
		}
		// compare the tokens against each other if they are still the same
		if ($_SESSION[$form.'_token'] !== $_POST['token']) {
			return false;
		}
		return true;
	}

	function writeLog($where) {
	$ip = $_SERVER["REMOTE_ADDR"]; // Get the IP from superglobal
	$host = gethostbyaddr($ip);    // Try to locate the host of the attack
	$date = date("d M Y");
	
	// create a logging message with php heredoc syntax
	$logging = <<<LOG
		\n
		<< Start of Message >>
		There was a hacking attempt on your form. \n 
		Date of Attack: {$date}
		IP-Adress: {$ip} \n
		Host of Attacker: {$host}
		Point of Attack: {$where}
		<< End of Message >>
LOG;
		// open log file
		if($handle = fopen('hacklog.log', 'a')) {
			fputs($handle, $logging);  // write the Data to file
			fclose($handle);           // close the file
		} else {
			// if first method is not working, for example because of wrong file permissions, email the data
			$to = 'dig.james@gmail.com';  
			$subject = 'HACK ATTEMPT';
			$header = 'From: dig.james@gmail.com';
			if (mail($to, $subject, $logging, $header)) {
				echo "Sent notice to admin.";
			}
		}
	}

	// Token Matching
	if (verifyFormToken('newsletter-signup')) {
		$hack = false;
	} else {
		writeLog('Form token.');
		$hack = true;
	}

	// Nothing POSTED we didn't ask for
	// Building a whitelist array with keys which will send through the form
	$whitelist = array('token','name','company','email','x','y');
	// Building an array with the $_POST-superglobal 
	foreach ($_POST as $key=>$item) {
		// Check if the value $key (fieldname from $_POST) can be found in the whitelisting array, if not, die with a short message to the hacker
		if (!in_array($key, $whitelist)) {
			writeLog('Unknown form fields.');
			$hack = true;
		}
	}

	function stripcleantohtml($s){
		// Restores the added slashes (ie.: " I\'m John " for security in output, and escapes them in htmlentities(ie.:  &quot; etc.)
		// Also strips any <html> tags it may encouter
		// Use: Anything that shouldn't contain html (pretty much everything that is not a textarea)
		return htmlentities(trim(strip_tags(stripslashes($s))), ENT_NOQUOTES, "UTF-8");
	}

	function cleantohtml($s){
		// Restores the added slashes (ie.: " I\'m John " for security in output, and escapes them in htmlentities(ie.:  &quot; etc.)
		// It preserves any <html> tags in that they are encoded aswell (like &lt;html&gt;)
		// As an extra security, if people would try to inject tags that would become tags after stripping away bad characters,
		// we do still strip tags but only after htmlentities, so any genuine code examples will stay
		// Use: For input fields that may contain html, like a textarea
		return strip_tags(htmlentities(trim(stripslashes($s))), ENT_NOQUOTES, "UTF-8");
	}

	$Name = stripcleantohtml($_POST['name']);
	$Company = stripcleantohtml($_POST['company']);
	$Email = stripcleantohtml($_POST['email']);
	$to = "dig.james@gmail.com";
	$subject = "New Newsletter Sign Up";
	$mailheader .= "Content-type: text/html; charset=iso-8859-1\r\n"; 
	$body = "Name: ".$Name."<br />";
	$body .= "Company: ".$Company."<br />";
	$body .= "Email: ".$Email."<br />";

	if (($Name != "") && ($Company != "") && ($Email != "") && ($hack == false) && mail($to, $subject, $body, $mailheader)) {
	echo("<div class='completion'>
			<span>Thank you&thinsp;&#33;</span><br>
			You have successfully signed up for our newsletter.<br>
		</div>
		<div class='return-button'>
			<a href='http://www.gslightinggroup.ca/index.html?up=0'>
				<img src='images/return_to_home_page.png' onmouseover='this.src='images/return_to_home_page-in.png'' onmouseout='this.src='images/return_to_home_page.png''>
			</a>
		</div>
		<div class='unsubscribe unsubscribe-short'>
			You can unsubscribe at any time using the <img src='images/safe_unsubscribe_envelop.gif' alt='SafeUnsubscribe' title='SafeUnsubscribe' /><strong> SafeUnsubscribe&#0174;</strong> link, 
			found at the bottom of every email.
		</div>");
	} else {
		echo("<div class='completion'>
			<span>Oops&thinsp;&#33;</span><br>
			Your sign-up request failed. Please let us know about the problem.<br>
		</div>
		<div class='return-button'>
			<a href='http://www.gslightinggroup.ca/index.html?up=0'>
				<img src='images/return_to_home_page.png' onmouseover='this.src='images/return_to_home_page-in.png' onmouseout='this.src='images/return_to_home_page.png'>
			</a>
		</div>
		<div class='unsubscribe unsubscribe-short'>
			You can unsubscribe at any time using the <img src='images/safe_unsubscribe_envelop.gif' alt='SafeUnsubscribe' title='SafeUnsubscribe' /><strong> SafeUnsubscribe&#0174;</strong> link, 
			found at the bottom of every email.
		</div>");
	}
?>
</body>
</html>