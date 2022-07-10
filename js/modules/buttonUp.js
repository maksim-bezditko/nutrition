export default function buttonUp({buttonSelector}) {
	const buttonUp = document.querySelector(buttonSelector)

	function hideButton(item) {
		item.classList.remove("show", "animat");
		item.classList.add("hide");
	}

	function showButton(item) {
		item.classList.remove("hide");
		item.classList.add("show", "animat");
	}

	function check() {
		if (document.documentElement.scrollTop > 300) {
			showButton(buttonUp)
		} else {
			hideButton(buttonUp)
		}
	}

	check()

	document.addEventListener("scroll", check)
	
	function moveUp() {
		function action() {
			if (document.documentElement.scrollTop > 0) {
				document.documentElement.scrollTop -= 20;
			} else {
				clearInterval(timerId)
			}
		}
		let timerId = setInterval(action, 1);
	}
	buttonUp.addEventListener("click", moveUp)
}