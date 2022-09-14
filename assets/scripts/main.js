"use strict";

let exercises;

// The indices of the exercises that still have to be shown
let toShow = [];

document.addEventListener("DOMContentLoaded", init);

function init() {
	loadButtons();
}

// Clears and refills the "toShow" list
function openQuiz() {
	if(!exercises) {
		alert("No quiz loaded");
		return;
	}

	toShow.splice(0, toShow.length);
	for(let i = 0; i < exercises.length; i++) {
		toShow.push(i);
	}

}