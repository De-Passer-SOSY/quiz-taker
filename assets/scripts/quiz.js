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
	const exercise = exercises[toShow[0]];
	main.innerHTML = "<button id='quit-button' class='normal-button'>Quit</button><br>" +
		"<p>" + exercise.question + "</p>" +
		"<h2>" + exercise.given + "</h2>" +
		"<form id='exercise-form'>" +
		"<textarea id='solution-input'></textarea><br>" +
		"<input type='submit' class='green-button' value='Check'>" +
		"</form>" +
		"<div id='feedback'></div>";
	document.querySelector("#quit-button").addEventListener("click", quitQuiz);
	document.querySelector("#exercise-form").addEventListener("submit", check);
}

function check(e) {
	e.preventDefault();

	const givenSolution = document.querySelector("#solution-input").value;

	const correctSolutions = exercises[toShow[0]].correct.split("\n");

	const isCorrect = givenSolution !== "" && correctSolutions.includes(givenSolution);

	const feedbackElement = document.querySelector("#feedback");
	if(isCorrect) {
		feedbackElement.innerHTML = "<h3 class='correct'>Correct!</h3>" +
			"<button id='next-exercise-button' class='green-button'>Next exercise</button>";
	}else{
		const element = document.createElement("b");
		element.textContent = correctSolutions[0];

		feedbackElement.innerHTML = "<h3 class='incorrect'>Incorrect</h3><p>The correct answer was '<b>" + element.innerHTML + "</b>'.</p>" +
			"<button id='next-exercise-button' class='normal-button'>Next exercise</button>";
	}
	document.querySelector("#next-exercise-button").addEventListener("click", nextExercise);

}

function nextExercise() {
	toShow.splice(0, 1);
	localStorage.setItem("toShow", JSON.stringify(toShow));
	initPage();
}