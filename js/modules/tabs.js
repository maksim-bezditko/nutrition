export default function tabs({tabContentItemSlc, tabButtonSlc, tabButtonParentSlc, tabButtonActiveClass}) {
	const tabConts = document.querySelectorAll(tabContentItemSlc),
		   tabs = document.querySelectorAll(tabButtonSlc),
			tabsParent = document.querySelector(tabButtonParentSlc)

	function hideElements() {
		tabConts.forEach((item) => {
			item.classList.remove("show", "fade");
			item.classList.add("hide");
		})

		tabs.forEach((item) => {
			item.classList.remove(tabButtonActiveClass)
		})
	}

	function showElement(i = 0) {
		for (let j of tabConts) {
			if (j === tabConts[i]) {
				j.classList.remove("hide");
				j.classList.add("show", "fadein");
			}
		}

		tabs[i].classList.add(tabButtonActiveClass)
	}

	hideElements()
	showElement()
	
	tabsParent.addEventListener("click", (event) => {
		let target = event.target;
		if (target && target.classList.contains(tabButtonSlc.slice(1))) {
			tabs.forEach((item, index) => {
				if (target == item) {
					hideElements()
					showElement(index)
				}
			})
		}
	})
}