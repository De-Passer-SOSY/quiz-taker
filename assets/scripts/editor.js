function initPage() {
	loadExercisesList();
	document.querySelector("#create-exercise-button").addEventListener("click", createExercise);
}

function loadExercisesList() {
	let exercisesHTML = "";
	let index = 0;
	for(const exercise of exercises) {
		const question = exercise.question;
		exercisesHTML += "<li>" + question + " | <button id='exercise-" + index + "'>Edit</button><button id='delete-" + index + "'>X</button></li>";
		index++;
	}
	document.querySelector("#exercises-list").innerHTML = exercisesHTML;
	for(let i = 0; i < exercises.length; i++) {
		document.querySelector("#exercise-" + i).addEventListener("click", function () {
			editExercise(i);
		});
		document.querySelector("#delete-" + i).addEventListener("click", function () {
			deleteExercise(i);
		});
	}
}

function editExercise(index) {
	localStorage.setItem("editing-exercise", "" + index);
	window.open("exercise_editor.html", "_self");
}

function deleteExercise(index) {
	if(confirm("Are you sure you want to delete exercise " + (index + 1) + "?")) {
		localStorage.removeItem("editing-exercise");
		exercises.splice(index, 1);
		localStorage.setItem("quiz", JSON.stringify(exercises));
		loadExercisesList();
	}
}

function createExercise() {
	exercises.push({
		question: "New question",
		given: "",
		correct: "",
	});
	localStorage.setItem("quiz", JSON.stringify(exercises));
	loadExercisesList();
}