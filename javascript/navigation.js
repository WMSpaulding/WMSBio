// Divisions that hold the drop menu img so it holds until out of this area
var education = document.getElementById("Education");
//var experience = document.getElementById("Experience");
var projects = document.getElementById("Projects");
// Save first current src state and have reference vars
var nav1 = document.getElementById("nav1");
//var nav2 = document.getElementById("nav2");
var nav3 = document.getElementById("nav3");
var state1 = nav1.src;
//var state2 = nav2.src;
var state3 = nav3.src;

// Events for onmouse over/out for img handling
education.onmouseover = function(){
	nav1.src = "images/navigation/HoverEducation.png";
}

education.onmouseout = function(){
	nav1.src = state1;
}

/*experience.onmouseover = function(){
	nav2.src = "images/navigation/HoverExperience.png";
}

experience.onmouseout = function(){
	nav2.src = state2;
}*/

projects.onmouseover = function(){
	nav3.src = "images/navigation/HoverProjects.png";
}

projects.onmouseout = function(){
	nav3.src = state3;
}
