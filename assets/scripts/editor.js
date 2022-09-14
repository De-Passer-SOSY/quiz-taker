function initPage() {
	loadExercisesList();
	document.querySelector("#create-exercise-button").addEventListener("click", createExercise);
}

function loadExercisesList() {
	const exercisesList = document.querySelector("#exercises-list");
	for(const exercise of exercises) {
		const question = exercise.question;
		exercisesList.innerHTML += `<li>${question}</li>`;
	}
}

function createExercise() {
	exercises.push({
		question: "New question",
		answers: [],
	});
	loadExercisesList();
}