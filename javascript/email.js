/* HTML Incorporation
		<form id="emailContainer">
			<font color="red">* Required</font>
			<br>*Name:<br>
			<input name="name" type="text" />
			<br>Number:<br>
			<input name="number" type="text" />
			<br>*Email:<br>
			<input name="email" type="text" />
			<br>Subject:<br>
			<input name="subject" type="text" />
			<br>*Message:<br>
			<textarea name="message" rows="4" cols="50"></textarea>
			<br>
			<input id="submit" type="submit" value="Submit" onclick="button()" />
		</form>
		
		<script src="script/EMAILdocs.js"></script>
*/

/* Emails found at google doc page located with script:
https://docs.google.com/spreadsheets/d/1SKnK3s5zWylB-jODtsxHIIubBL4eISpfASge8lWC2Sw/edit#gid=0 
*/

/* Configuration - NOTE: googleDoc is the script link, not doc link */

var minMessageLength = 30;
var messageSent = "<font size=\"10\">Email sent!</font><p>Thank you for your time and patience as I try and get back to you as soon as possible! Your email is sent and reviewed in the order of most recent messages sent first. For any other questions, I am always here to help the best I can!<br><br>Thank you!<br>- <i>William Spaulding</i></p>";
var googleDoc = "https://script.google.com/macros/s/AKfycbypCrCogdnSwTw8R1ra-2TSIWuvdELg2haa-83Y5iO8FQVN0yzN/exec";

/* Do not change anything below, unless you know what you are doing. */
var emailContainer = document.getElementById("email");

var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', ' '];
var numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

/* Click event function for our submit input */
function button(){
	var error = verifyError();
	if (error == false){
		var data = getFormData();
		var url = googleDoc;
		var xhr = new XMLHttpRequest();
		xhr.open('POST', url);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		var encoded = Object.keys(data).map(function(k) {
			return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
		}).join('&')
		xhr.send(encoded);
		
		emailContainer.innerHTML = messageSent;
	}
	
	return false;
};

/* This function will grab all of the element input/textarea information 
we need to send to our google document page. */
function getFormData() {
	var elements = document.getElementById("email").elements;
	var fields = Object.keys(elements).map(function(k) {
		if(elements[k].name !== undefined) {
			return elements[k].name;
		}
	}).filter(function(item, pos, self) {
		return self.indexOf(item) == pos && item;
	});
	var data = {};
	fields.forEach(function(k){
			data[k] = elements[k].value;
	});
	return data;
}

/* Email validator through use of regular expressions (re) */
function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
}

/* Error handler for each input field */
function verifyError(){
	var name, val, tag, good, invalid;
	var error = false;
	var innerhtml = "<div class=\"center\"><h1 style=\"color: #14495A;\">Contact Form</h1><p>If at any time you may need to contact me, please fill out the form below and meet all of the requirements for every field. Please feel free to report any inconveniences, suggestions, and remarks!</p></div><font color=\"#6D0000\">* Required</font>";
	
	var elements = emailContainer.elements;
	for (i = 0; i < elements.length; i++){
		length = 0;
		name = elements[i].name;
		empty = "<font color=\"#6D0000\" size=\"2\">This field requires an entry.</font><br><input name=\"" + name + "\" type=\"text\">";
		

		val = elements[i].value;
		var good = "<input name=\"" + name + "\" type=\"text\" value=\"" + val + "\">";
		var invalid = "<font color=\"#6D0000\" size=\"2\">This is not a valid entry.</font><br><input name=\"" + name + "\" type=\"text\" value=\"" + val + "\">";
		
		if (name == "name"){
			innerhtml = innerhtml + "<br><br>*Name:<br>";
			for (ii = 0; ii < val.length; ii++){
				for (iii = 0; iii < alphabet.length; iii++){
					if (val.charAt(ii).toLowerCase() == alphabet[iii]){
						length++;
					}
				}
			}
			
			if (val.length == 0){
				innerhtml = innerhtml + empty;
				error = true;
			}
			else if (val.length != length){
				innerhtml = innerhtml + invalid;
				error = true;
			}
			else {
				innerhtml = innerhtml + good;
			}
		}
		else if (name == "number"){
			if (val.length == 0){
				innerhtml = innerhtml + "<br><br>Number:<br><input name=\"" + name + "\" type=\"text\">";
			}
			else{
				innerhtml = innerhtml + "<br><br>Number:<br><input name=\"" + name + "\" type=\"text\" value=\"" + val + "\">";
			}
		}
		else if (name == "email"){
			innerhtml = innerhtml + "<br><br>*Email:<br>";
			if (val.length == 0){
				innerhtml = innerhtml + empty;
				error = true;
			}
			else if (!(validateEmail(val))){
				innerhtml = innerhtml + invalid;
				error = true;
			}
			else {
				innerhtml = innerhtml + good;
			}
		}
		else if (name == "subject"){
			if (val.length == 0){
				innerhtml = innerhtml + "<br><br>Subject:<br><input name=\"" + name + "\" type=\"text\">";
			}
			else{
				innerhtml = innerhtml + "<br><br>Subject:<br><input name=\"" + name + "\" type=\"text\" value=\"" + val + "\">";
			}
		}
		else if (name == "message"){
			if (val.length == 0){
				innerhtml = innerhtml + "<br><br>Message:<br><font color=\"#6D0000\" size=\"2\">This field requires an entry.</font><br><textarea name=\"message\" rows=\"4\" cols=\"50\"></textarea>";
				error = true;
			}
			else if (val.length < minMessageLength){
				innerhtml = innerhtml + "<br><br>Message:<br><font color=\"#6D0000\" size=\"2\">You need at least " + (minMessageLength - val.length) + " more characters to send a message.</font><br><textarea id=\"message\" name=\"message\" rows=\"4\" cols=\"50\">" + val + "</textarea>";
				error = true;
			}
			else{
				innerhtml = innerhtml + "<br><br>Message:<br><textarea name=\"message\" rows=\"4\" cols=\"50\">" + val + "</textarea>";
			}
		}
	}
	
	emailContainer.innerHTML = innerhtml + "<br><br><input id=\"submit\" type=\"submit\" value=\"Submit\" onclick=\"button()\" />";
		
	return error;
};