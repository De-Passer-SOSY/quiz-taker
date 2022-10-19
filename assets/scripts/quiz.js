function initPage() {
	document.querySelector("main").innerHTML = "";

	toShow = JSON.parse(localStorage.getItem("toShow"));

	if(toShow === null) {
		showStartScreen();
	}else if(toShow.length === 0) {

	}else {
		showExercise();
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

	if(toShow === null) {
		toShow = [];
	}else{
		toShow.splice(0, toShow.length);
	}
	for(let i = 0; i < exercises.length; i++) {
		toShow.push(i);
	}

	localStorage.setItem("toShow", JSON.stringify(toShow));

	initPage();
}

function openQuizEditor() {
	window.open("quiz_editor.html", "_self");
}

function quitQuiz() {
	localStorage.removeItem("answers");
	localStorage.removeItem("toShow");
	initPage();
}

function showStartScreen() {
	const main = document.querySelector("main");
	main.innerHTML = "<button id='edit-quiz-button' class='normal-button'>Edit quiz</button><br>" +
		"<button id='start-quiz-button' class='green-button'>Start quiz</button>";
	document.querySelector("#edit-quiz-button").addEventListener("click", openQuizEditor);
	document.querySelector("#start-quiz-button").addEventListener("click", startQuiz);
}

function showExercise() {
	const main = document.querySelector("main");
	const exercise = exercises[0];
	main.innerHTML = "<button id='quit-button' class='normal-button'>Quit</button><br>" +
		"<p>" + exercise.question + "</p>" +
		"<h2>" + exercise.given + "</h2>" +
		"<form id='exercise-form'>" +
		"<textarea id='solution-input'></textarea><br>" +
		"<input type='submit' class='green-button' value='Check'>" +
		"</form>";
	document.querySelector("#quit-button").addEventListener("click", quitQuiz);
}
