"use strict";

let exercises;

document.addEventListener("DOMContentLoaded", init);

function init() {
	exercises = JSON.parse(localStorage.getItem("quiz"));
	initPage();
}
