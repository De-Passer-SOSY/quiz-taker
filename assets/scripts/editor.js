function initPage() {
	loadExercisesList();
	document.querySelector("#create-exercise-button").addEventListener("click", createExercise);
}

function loadExercisesList() {
	let exercisesHTML = "";
	let index = 0;
	for(const exercise of exercises) {
		const question = exercise.question;
		exercisesHTML += "<li>" + question + " | <button id='exercise-" + index + "'>Edit</button></li>";
		index++;
	}
	document.querySelector("#exercises-list").innerHTML = exercisesHTML;
	for(let i = 0; i < exercises.length; i++) {
		document.querySelector("#exercise-" + i).addEventListener("click", function () {
			editExercise(i);
		});
	}
}

function editExercise(index) {
	alert("Editing exercise " + (index + 1));
	localStorage.setItem("editing-exercise", "" + index);
}

function createExercise() {
	exercises.push({
		question: "New question",
		answers: [],
	});
	loadExercisesList();
}