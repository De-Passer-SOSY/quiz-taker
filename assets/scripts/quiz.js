function initPage() {
	document.querySelector("main").innerHTML = "";

	toShow = JSON.parse(localStorage.getItem("toShow"));
	if(toShow === null) {
		toShow = [];
	}

	if(toShow.length === 0) {
		showStartScreen();
	}else{

	}
}

// The indices of the exercises that still have to be shown
let toShow = [];

// Clears and refills the "toShow" list
function startQuiz() {
	if(!exercises) {
		alert("No quiz loaded");
		return;
	}

	toShow.splice(0, toShow.length);
	for(let i = 0; i < exercises.length; i++) {
		toShow.push(i);
	}

	localStorage.setItem("toShow", JSON.stringify(toShow));
}


function showStartScreen() {
	const main = document.querySelector("main");
	main.innerHTML = "<button id='edit-quiz-button' class='normal-button'>Edit quiz</button><br>" +
		"<button id='start-quiz-button' class='green-button'>Start quiz</button>";
	document.querySelector("#edit-quiz-button").addEventListener("click", openQuizEditor)
	document.querySelector("#start-quiz-button").addEventListener("click", startQuiz)
}

function openQuizEditor() {
	window.open("quiz_editor.html", "_self");
}