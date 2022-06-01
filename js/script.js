"use strict"

window.addEventListener("DOMContentLoaded", () => {
	const tabConts = document.querySelectorAll(".tabcontent"),
		   tabs = document.querySelectorAll(".tabheader__item"),
			tabsParent = document.querySelector(".tabheader__items")

	function hideElements() {
		tabConts.forEach((item) => {
			item.classList.remove("show", "fade");
			item.classList.add("hide");
		})

		tabs.forEach((item) => {
			item.classList.remove("tabheader__item_active")
		})
	}

	function showElement(i = 0) {
		for (let j of tabConts) {
			if (j === tabConts[i]) {
				j.classList.remove("hide");
				j.classList.add("show", "fadein");
			}
		}

		tabs[i].classList.add("tabheader__item_active")
	}

	hideElements()
	showElement()
	
	tabsParent.addEventListener("click", (event) => {
		let target = event.target;
		if (target && target.classList.contains("tabheader__item")) {
			tabs.forEach((item, index) => {
				if (target == item) {
					hideElements()
					showElement(index)
				}
			})
		}
	})
})
