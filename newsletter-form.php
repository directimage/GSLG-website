<?php session_start();
	function generateFormToken($form) {
		// generate a token from an unique value
		$token = md5(uniqid(microtime(), true));  
		// Write the generated token to the session variable to check it against the hidden field when the form is sent
		$_SESSION[$form.'_token'] = $token; 
		return $token;
	}
	// generate a new token for the $_SESSION superglobal and put them in a hidden field
	$newToken = generateFormToken('newsletter-signup');
?>
<!DOCTYPE html>
<html>
<head>
	<title>Thank you for signing up.</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<link href="style.css" rel="stylesheet" type="text/css" />
	<link href='http://fonts.googleapis.com/css?family=Playball' rel='stylesheet' type='text/css'>
	<script>
		function validate(){
			var allok = true;
			  if(document.forms["newsletter-signup"]["name"].value == ""){
				document.getElementById("name-required-error").style.display = "inline-block";
				//alert('Please enter your name');
				return false;
			  }
			  else {
				document.getElementById("name-required-error").style.display = "none";
			  }
			  if(document.forms["newsletter-signup"]["company"].value == ""){
				document.getElementById("company-required-error").style.display = "inline-block";
				//alert('Please enter your company name');
				return false;
			  }
			  else {
				document.getElementById("company-required-error").style.display = "none";
			  }
			  if(document.forms["newsletter-signup"]["email"].value == ""){
				document.getElementById("email-required-error").style.display = "inline-block";
				document.getElementById("email-incorrect-error").style.display = "none";
				//alert('Please enter your email');
				return false;
			  }
			  else {
				document.getElementById("email-required-error").style.display = "none";
			  }
			  var x=document.forms["newsletter-signup"]["email"].value;
			  var atpos=x.indexOf("@");
			  var dotpos=x.lastIndexOf(".");
			  if(atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length){
				document.getElementById("email-incorrect-error").style.display = "inline-block";
				document.getElementById("email-required-error").style.display = "none";
				//alert('email is in an incorrect format.');
				return false;
			  }
			  else {
				document.getElementById("email-incorrect-error").style.display = "none";
			  }
		}
	</script>
</head>
<body>
	<div id="signup-top">
		<img src="images/G-logo.svg" class="news-G-logo"/>
		<img src="images/newsletter_envelope.png" class="news-envelope"/>
	</div>
	<div id="title_banner">
		Monthly Newsletter Sign-Up
	</div>
	<form name="newsletter-signup" method="Post" action="newsletter-form-mail.php" onSubmit="return validate();">
		<div class="field-section">
			<label class="label" for="name">name</label>
			<div id="name-required-error">Please enter your name.</div>
			<input class="field" type="text" name="name"/>
		</div>
		<div class="field-section">
			<label class="label" for="company">company</label>
			<div id="company-required-error">Please enter your company name.</div>
			<input class="field" type="text" name="company"/>
		</div>
		<div class="field-section">
			<label class="label" for="email">email</label>
			<div id="email-required-error">Please enter your email.</div>
			<div id="email-incorrect-error">email is in an incorrect format.</div>
			<input class="field" type="text" name="email"/>
		</div>
		<!--<div style="clear:both;">
		</div>-->
		<div id="submit-section">
			<input type="image" src="images/submit-button.png" onmouseover="this.src='images/submit-button-in.png'" onmouseout="this.src='images/submit-button.png'" value="Submit" />
		</div>
		<input type="hidden" name="token" value="<?php echo $newToken; ?>">
	</form>
	<div id="disclaimer">
		<div class="unsubscribe">You can unsubscribe at any time using the 
			<img src="images/safe_unsubscribe_envelop.gif" alt="SafeUnsubscribe" title="SafeUnsubscribe" /><strong> SafeUnsubscribe&#0174;</strong> link, 
			found at the bottom of every email.
		</div>
		By submitting this form, you are granting GS Lighting Group, 26 Glebe Street, Cambridge, Ontario, N1S 2P1 Canada, 
		permission to email you. We take your privacy seriously (to see for yourself, please read our 
		<a href="http://www.constantcontact.com/legal/privacy-statement" target="_blank">email Privacy Policy</a>). 
		Emails are serviced by Constant Contact.
	</div>
</body>
</html>