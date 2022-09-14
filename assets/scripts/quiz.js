function initPage() {

}

// The indices of the exercises that still have to be shown
let toShow = [];

// Clears and refills the "toShow" list
function startQuiz() {
	if(!exercises) {
		alert("No quiz loaded");
		return;
	}

	toShow.splice(0, toShow.length);
	for(let i = 0; i < exercises.length; i++) {
		toShow.push(i);
	}

}