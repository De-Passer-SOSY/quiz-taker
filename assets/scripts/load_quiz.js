// Makes the "open quiz" button functional
function loadButton() {
	document.querySelector("#open-quiz-button").addEventListener("click", open);
}

// Opens the file explorer to open a JSON file
function open() {
	const fileInput = document.createElement("input")
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
