function initPage() {
	document.querySelector("#open-quiz-button").addEventListener("click", loadQuiz);
	document.querySelector("#create-quiz-button").addEventListener("click", createQuiz);
}

// Opens the file explorer to open a JSON file
function loadQuiz() {
	localStorage.removeItem("toShow")
	localStorage.removeItem("answers");

	const fileInput = document.createElement("input");
	fileInput.type = "file";
	fileInput.click();

	fileInput.addEventListener("change", function() {
		const reader = new FileReader();
		reader.onload = function() {
			const loadedObject = JSON.parse("" + reader.result);

			exercises = loadedObject.exercises;
			localStorage.setItem("quiz", JSON.stringify(exercises));

			localStorage.setItem("answers", JSON.stringify([]));
			window.open("quiz_taker.html", "_self");
		};
		reader.readAsText(fileInput.files[0]);
	});

}

function createQuiz() {
	if(exercises === null || confirm("There is already a quiz loaded. Do you want to close it? The quiz will not be saved.")) {
		exercises = [];
	}
	localStorage.setItem("quiz", JSON.stringify(exercises));
	window.open("quiz_editor.html", "_self");
}