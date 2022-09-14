// Makes the menu buttons functional
function loadButtons() {
	document.querySelector("#open-quiz-button").addEventListener("click", openQuiz);
	document.querySelector("#create-quiz-button").addEventListener("click", createQuiz);
}

// Opens the file explorer to open a JSON file
function open() {
	const fileInput = document.createElement("input")
function openQuiz() {
	const fileInput = document.createElement("input");
	fileInput.type = "file";
	fileInput.click();

	fileInput.addEventListener("change", function() {
		const reader = new FileReader();
		reader.onload = function() {
			exercises = JSON.parse(reader.result);
		};
		reader.readAsText(fileInput.files[0]);
	});
}

function createQuiz() {
	if(exercises === null || confirm("There is already a quiz loaded. Do you want to close it? The quiz will not be saved.")) {
		exercises = [];
	}
	window.open("quiz_editor.html", "_self");
}