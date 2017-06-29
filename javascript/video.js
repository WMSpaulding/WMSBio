var vid = document.getElementById("vid");
var vidOverlay = document.getElementById("videoOverlay");
var vidExit = document.getElementById("videoExit");

vid.volume = 0.2;

vid.onended = function() {
	vidOverlay.style.zIndex = "8";
	vidOverlay.src = "images/replay.png";
};

vid.onclick = function() {
	vid.pause();
	vidOverlay.style.zIndex = "8";
}

vidOverlay.onclick = function() {
	if (vid.ended){
		vid.loop;
		vidOverlay.src = "images/play.png"
	}
	vid.play();
	vidOverlay.style.zIndex = "6";
}

vidExit.onclick = function() {
	var element = document.getElementById("videoContainer");
	element.parentNode.removeChild(element);
}
