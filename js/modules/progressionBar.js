export default function progressionBar({progressionBarSelector}) {
	let percentage = document.querySelector(progressionBarSelector);
	
	function progressionBar() {

		let windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

		let progress = document.documentElement.scrollTop / windowHeight * 100;

		percentage.style.width = `${progress}%`;
	}

	progressionBar()

	document.addEventListener("scroll", progressionBar);
}