function initPage() {
	fillForm();
}
function fillForm() {
	const exerciseIndex = localStorage.getItem("editing-exercise")
	if(exerciseIndex === null) {
		return;
	}
	const exercise = exercises[parseInt(exerciseIndex)];
	document.querySelector("#question").value = exercise.question;
	document.querySelector("#given").value = exercise.given;
	document.querySelector("#correct").value = exercise.correct;
}
function processForm(e) {
	e.preventDefault();

}