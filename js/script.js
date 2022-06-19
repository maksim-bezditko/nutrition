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
	


	function test() {

		let windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

		let progress = document.documentElement.scrollTop / windowHeight * 100;

		if (document.documentElement.scrollTop > 300) {
			showButton(buttonUp)
		} else {
			hideButton(buttonUp)
		}

		percentage.style.width = `${progress}%`;
	}

	test()

	document.addEventListener("scroll", test)

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

	document.addEventListener("click", event => {
		if ((event.target === document.querySelector(".modal") && modal.classList.contains("show")) || event.target.getAttribute("data-close") == "") {
			hideModal()
		}
	})
	document.addEventListener("keyup", event => {
		if (event.code === "Escape" && modal.classList.contains("show")) {
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

	const forms = document.querySelectorAll("form");

	const message = {
		success: "Your data has been successfully taken!",
		loading: "img/loading_icon/spinner.svg",
		failure: "Something went wrong, try again."
	}

	forms.forEach((form) => {
		makeRequest(form);
	})

	function makeRequest(form) {

		form.addEventListener("submit", (e) => {
			e.preventDefault();

			document.removeEventListener("scroll", showModalDownThere)

			const messageBlock = document.createElement("img");
			messageBlock.src = message.loading;
			messageBlock.style.cssText = `
				display: block;
				margin: 0 auto;
				padding-top: 20px;
			`;
			form.insertAdjacentElement("afterend", messageBlock);
			
			const data = new FormData(form);

			let json = Object.fromEntries(data.entries())

			fetch("server.php", {
				method: "POST",
				body: JSON.stringify(json),
				headers: {
					"Content-type": "application/json"	
				}
			})
			.then((data) => data.text())
			.then((response) => {
				hideModal()
				console.log(response)
				changeModalContent(message.success)
			})
			.catch(() => {
				changeModalContent(message.failure)
			})
			.finally(() => {
				messageBlock.remove()
				form.reset();
			})
		})
	}

	function changeModalContent(message) {
		const prevDialog = document.querySelector(".modal__dialog");

		prevDialog.classList.add("hide");
		prevDialog.classList.remove("show")
		showModal()

		const newDialog = document.createElement("div");
		newDialog.classList.add("modal__dialog");
		newDialog.innerHTML = `
		<div class="modal__content">
			<div data-close class="modal__close">&times;</div>
			<div class="modal__title">${message}</div>
		</div>	
		`;
		newDialog.querySelector(".modal__title").style.textTransform = "none";

		document.querySelector(".modal").append(newDialog);

		setTimeout(() => {
			hideModal();
			newDialog.remove();
			prevDialog.classList.add("show");
			prevDialog.classList.remove("hide");
		}, 4000)

		
	}

	function closeModal() {
		modal.classList.add("hide");
		modal.classList.hide("show");
	}

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

	// cards with classes

	class Card {
		constructor(url, alt, title, descr, priceInDollar, costOfDollar, parentSelector) {
			this.url = url;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.price = +priceInDollar * +costOfDollar;
			this.parentSelector = parentSelector;
		}
		render() {
			let elem = document.createElement("div");
			elem.classList.add("menu__item")
			elem.innerHTML = `
				<img src=${this.url} alt=${this.alt}>
				<h3 class="menu__item-subtitle">${this.title}</h3>
				<div class="menu__item-descr">${this.descr}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
				</div>`
			document.querySelector(this.parentSelector).append(elem);
		}
	}
	new Card(
		"img/tabs/vegy.jpg", 
		"vegy", 
		'Меню "Фитнес"',
		'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
		9,
		30,
		".menu .container"
	).render()

	new Card(
		"img/tabs/elite.jpg", 
		"elite", 
		'Меню “Премиум”',
		'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
		30,
		30,
		".menu .container"
	).render()

	new Card(
		"img/tabs/post.jpg", 
		"post", 
		'Меню "Постное"',
		'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
		12,
		30,
		".menu .container"
	).render()

	// testing json-server

	fetch("http://localhost:3000/menu")
	.then(data => data.json())
	.then(data => console.log(data))
})
