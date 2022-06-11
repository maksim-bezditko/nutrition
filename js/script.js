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
   
	// Timer
	let deadline = `2023-06-06`;

	function addZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	}

	function getInscription(deadline) {
		let finalDate = new Date(Date.parse(deadline));
		let months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
		const date = finalDate.getUTCDate(),
				month = finalDate.getUTCMonth(),
				hours = finalDate.getUTCHours(),
				minutes = finalDate.getUTCMinutes(),
				year = finalDate.getUTCFullYear()
		return {
			"date": date,
			"month": months[month],
			"hours": hours,
			"minutes": minutes,
			"year": year,
		}; 
	}
	function changeInscription(inscriptionUnits) {
		const elementOfDOM = document.querySelector("#inscription");
		
		let inscription;
		if (inscriptionUnits.year == new Date(Date.now()).getFullYear()) {
			inscription = `Акция закончится ${inscriptionUnits.date} ${inscriptionUnits.month.toLowerCase()} в ${addZero(inscriptionUnits.hours)}:${addZero(inscriptionUnits.minutes)}!`; 
		} else {
			inscription = `Акция закончится ${inscriptionUnits.date} ${inscriptionUnits.month.toLowerCase()} в ${addZero(inscriptionUnits.hours)}:${addZero(inscriptionUnits.minutes)} ${inscriptionUnits.year} года!`; 
		}

		elementOfDOM.textContent = "";
		elementOfDOM.textContent = inscription;
	}
	
	changeInscription(getInscription(deadline));

	function getUnits(deadline) {
		let currentDateTimestamp = Date.now();

		let currentDate = new Date(currentDateTimestamp);

		let myTimezoneOffset = currentDate.getTimezoneOffset() / 60;

		currentDate.setHours(currentDate.getHours() - myTimezoneOffset)
		
		const diff = Date.parse(deadline) - new Date(currentDate);

		const days = Math.floor(diff / (1000 * 60 * 60 * 24)),
			   hours = Math.floor((diff / (1000 * 60 * 60)) % 24),
			   minutes = Math.floor((diff / (1000 * 60)) % 60),
			   seconds = Math.floor((diff / (1000)) % 60)
		
		return {
			 'total': diff,
			 'days': days, 
			 'hours': hours, 
			 'minutes': minutes, 
			 'seconds': seconds
			}	 
	}
	function setUnits(deadline, inscriptionUnits) {
		const timer = document.querySelector(".timer");
		const timerId = setInterval(updateTimer, 1000);
		updateTimer()

		function updateTimer() {
			let units = getUnits(deadline);

			timer.querySelector("#days").innerHTML = addZero(units.days);
			timer.querySelector("#hours").innerHTML = addZero(units.hours);
			timer.querySelector("#minutes").innerHTML = addZero(units.minutes);
			timer.querySelector("#seconds").innerHTML = addZero(units.seconds); 
			// console.log(units.total)
			if (units.total <= 0) {
				let inscription;
				clearInterval(timerId);
				if (inscriptionUnits.year == new Date(Date.now()).getFullYear()) {
					inscription = `Акция закончилась ${inscriptionUnits.date} ${inscriptionUnits.month.toLowerCase()} в ${addZero(inscriptionUnits.hours)}:${addZero(inscriptionUnits.minutes)}!`; 
				} else {
					inscription = `Акция закончилась ${inscriptionUnits.date} ${inscriptionUnits.month.toLowerCase()} в ${addZero(inscriptionUnits.hours)}:${addZero(inscriptionUnits.minutes)} ${inscriptionUnits.year} года!`; 
				}
				timer.querySelector("#days").innerHTML = "00";
				timer.querySelector("#hours").innerHTML = "00";
				timer.querySelector("#minutes").innerHTML = "00";
				timer.querySelector("#seconds").innerHTML = "00";
				document.querySelector("#inscription").textContent = inscription;
			}
		}
	}
	setUnits(deadline, getInscription(deadline))

	const buttonUp = document.querySelector(".buttontest")

	function hideButton(item) {
		item.classList.remove("show", "animat");
		item.classList.add("hide");
	}
	function showButton(item) {
		item.classList.remove("hide");
		item.classList.add("show", "animat");
	}
	
	hideButton(buttonUp)

	let percentage = document.querySelector(".percentage");
	let number = document.documentElement.scrollHeight - window.screen.height;

	function test() {
		if (document.documentElement.scrollTop > 300) {
			showButton(buttonUp)
		} else {
			hideButton(buttonUp)
		}
		// percentage.textContent = `${Math.round(document.documentElement.scrollTop / number * 100)}%`
		percentage.style.width = document.documentElement.scrollTop / number * 100 + "%";
	}

	function moveUp() {
		// console.log(document.documentElement.scrollTop)
		function action() {
			if (document.documentElement.scrollTop > 0) {
				document.documentElement.scrollTop -= 20;
			} else {
				clearInterval(timerId)
			}
		}
		let timerId = setInterval(action, 1);
	}

	document.addEventListener("scroll", test)
	// percentage.textContent = `${Math.round(document.documentElement.scrollTop / number * 100)}%`
	buttonUp.addEventListener("click", moveUp)
	// console.log(document.documentElement.scrollHeight)

	// Modal

	let btns = document.querySelectorAll("[data-modal]"),
		 modal = document.querySelector(".modal"),
		 cross = document.querySelector(".modal__close"),
		 form = document.querySelector(".modal__content form")

	function showModal() {
		modal.classList.remove("hide");
		modal.classList.add("show");
		document.body.style.overflow = "hidden";
	}

	function hideModal() {
		modal.classList.remove("show");
		modal.classList.add("hide");
		document.body.style.overflow = "";
	}

	hideModal()

	btns.forEach((item) => {
		item.addEventListener("click", () => {
			showModal()
			if (modalTimerId) {
				clearTimeout(modalTimerId)
			}
		})
	})

	cross.addEventListener("click", () => {
		hideModal()
	})

	modal.addEventListener("click", event => {
		if (event.target === document.querySelector(".modal") && modal.classList.contains("show")) {
			hideModal()
		}
	})

	const modalTimerId = setTimeout(() => {
		showModal()
	}, 15000)

	function showModalDownThere() {
		if (document.documentElement.scrollHeight <= document.documentElement.scrollTop + document.documentElement.clientHeight) {
			showModal()
		} 
		if (modalTimerId) {
			clearTimeout(modalTimerId)
		}
	}

	document.addEventListener("scroll", showModalDownThere)

	function changeModalContent() {
		modal.innerHTML = 
	  `<div class="modal__dialog">
			<div class="modal__content">
				<div class="modal__close">&times;</div>
				<p class="later">Вы уже заполнили форму! Мы с Вами свяжемся в ближайшее время!</p>
			</div>
  		</div>`
		cross = document.querySelector(".modal__close");
		cross.addEventListener("click", () => {
			hideModal()
		})
	}
	
	form.addEventListener("submit", () => {
		hideModal()
		changeModalContent()
		document.removeEventListener("scroll", showModalDownThere)
	})

	// Slider test

	let sliderCounter = document.querySelector("#current"),
		 offerSlides = document.querySelectorAll(".offer__slide"),
		 currentNumber,
		 rigthArrow = document.querySelector(".offer__slider-next"),
		 leftArrow = document.querySelector(".offer__slider-prev")

	function hideSlide(item) {
		item.classList.remove("show");
		item.classList.add("hide");
	}

	function showSlideByItem(item) {
		item.classList.remove("hide");
		item.classList.add("show");
	}

	function showSlideByNumber(i = 0) {
		hideSlides()
		sliderCounter.textContent = `${addZero(i + 1)}`
		showSlideByItem(offerSlides[i])
		currentNumber = i;
	}

	function hideSlides() {
		offerSlides.forEach((item) => {
			hideSlide(item);
		})
	}
	hideSlides()
	showSlideByNumber()

	rigthArrow.addEventListener("click", () => {
		currentNumber += 1;
		if (currentNumber == 4) {
			currentNumber -= 4;
		}
		showSlideByNumber(currentNumber);
	})

	leftArrow.addEventListener("click", () => {
		currentNumber -= 1;
		if (currentNumber == -1) {
			currentNumber += 4;
		}
		showSlideByNumber(currentNumber);
	})

})
