
function loadButton() {
	document.querySelector("#open-quiz-button").addEventListener("click", open);
}

function open() {
	const fileInput = document.createElement("input")
	fileInput.type = "file";
	fileInput.click();

	fileInput.addEventListener("change", function() {
		const reader = new FileReader();
		reader.onload = function() {
			exercises = JSON.parse(reader.result);
		}
		reader.readAsText(fileInput.files[0]);
	});
}