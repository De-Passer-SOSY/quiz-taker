function initPage() {
	fillForm();
	document.querySelector("#edit-exercise-form").addEventListener("submit", processForm);
}
function fillForm() {
	const exerciseIndexStr = localStorage.getItem("editing-exercise")
	if(exerciseIndexStr === null) {
		return;
	}
	const exercise = exercises[parseInt(exerciseIndexStr)];
	document.querySelector("#question").value = exercise.question;
	document.querySelector("#given").value = exercise.given;
	document.querySelector("#correct").value = exercise.correct;
}
function processForm(e) {
	e.preventDefault();
	let exerciseIndex = localStorage.getItem("editing-exercise")
	if(exerciseIndex === null) {
		return;
	}else{
		exerciseIndex = parseInt(exerciseIndex);
	}
	const exercise = {
		question: document.querySelector("#question").value,
		given: document.querySelector("#given").value,
		correct: document.querySelector("#correct").value,
	};
	exercises[exerciseIndex] = exercise;
	localStorage.setItem("quiz", JSON.stringify(exercises));

	window.open("quiz_editor.html", "_self");
}