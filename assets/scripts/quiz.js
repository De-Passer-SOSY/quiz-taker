function initPage() {
	document.querySelector("main").innerHTML = "";

	toShow = JSON.parse(localStorage.getItem("toShow"));

	if(toShow === null) {
		showStartScreen();
	}else if(toShow.length === 0) {
		quizFinish();
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

function clearStorage() {
	localStorage.removeItem("toShow");
	localStorage.removeItem("correction");
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
	main.innerHTML = "<button id='quit-button' class='normal-button'>Quit</button><br>";

	const exercise = exercises[toShow[0]];

	const questionElement = document.createElement("h2");
	main.appendChild(questionElement);
	questionElement.textContent = exercise.question;

	for(const line of exercise.given.split("\n")) {
		const givenElement = document.createElement("p");
		main.appendChild(givenElement);
		givenElement.textContent = line;
	}

	main.innerHTML += "<form id='exercise-form'>" +
		"<textarea id='solution-input'></textarea><br>" +
		"<input type='submit' class='green-button' value='Check'>" +
		"</form>" +"<div id='feedback'></div>";

	document.querySelector("#quit-button").addEventListener("click", quitQuiz);
	document.querySelector("#exercise-form").addEventListener("submit", check);
}

let correct = false;
function check(e) {
	e.preventDefault();

	const givenSolution = document.querySelector("#solution-input").value;

	const correctSolutions = exercises[toShow[0]].correct.split("\n");

	correct = givenSolution !== "" && correctSolutions.includes(givenSolution);

	const feedbackElement = document.querySelector("#feedback");
	if(correct) {
		feedbackElement.innerHTML = "<h3 class='correct'>Correct!</h3>" +
			"<button id='next-exercise-button' class='green-button'>Next exercise</button>";
	}else{
		feedbackElement.innerHTML = "<h3 class='incorrect'>Incorrect</h3><p>The correct answer was '<b id='show-correct-answer'></b>'.</p>" +
			"<button id='next-exercise-button' class='normal-button'>Next exercise</button>";

		const element = document.querySelector("#show-correct-answer");
		element.textContent = correctSolutions[0];
	}

	updateCorrection();

	document.querySelector("#next-exercise-button").addEventListener("click", nextExercise);

}

function updateCorrection() {
	let correctionJSON = localStorage.getItem("correction");

	let correction = {
		correct: 0,
		done: 0,
	};
	if(correctionJSON !== null) {
		correction = JSON.parse(correctionJSON);
	}

	if(correct) {
		correction.correct += 1;
	}
	correction.done += 1;

	localStorage.setItem("correction", JSON.stringify(correction));
}

function nextExercise() {
	toShow.splice(0, 1);
	localStorage.setItem("toShow", JSON.stringify(toShow));
	initPage();
}

function quizFinish() {
	const main = document.querySelector("main");

	main.innerHTML = "<h1>Finish!</h1>" +
		"<button id='play-again-button' class='green-button'>Play again</button><br>" +
		"<button id='quit-quiz-button' class='normal-button'>Close</button>";

	const correction = JSON.parse(localStorage.getItem("correction"));
	main.innerHTML += "<h2>Feedback</h2><p>" + getFeedback(correction) + "</p>";

	document.querySelector("#play-again-button").addEventListener("click", playAgain);
	document.querySelector("#quit-quiz-button").addEventListener("click", quitQuiz);
}

function getFeedback(correction) {
	const correct = correction.correct;
	const done = correction.done;

	const ratio = correct / done;

	const score = "<b>" + correct + "/" + done + "</b> | " + Math.floor(ratio * 100) + "% - ";
	if(ratio === 1) {
		return score + "Perfect!"
	}else if(ratio > 0.9) {
		return score + "You did great!"
	}else if(ratio > 0.7) {
		return score + "You did well!"
	}else if(ratio > 0.5) {
		return score + "You passed! But there's still some work needed..."
	}else {
		return score + "Still more work needed.";
	}
}

function playAgain() {
	clearStorage();
	startQuiz();
	initPage();
}

function quitQuiz() {
	clearStorage();
	initPage();
}