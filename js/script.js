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

	async function makePostRequest(url, body) {
		const res = await fetch(url, {
			method: "POST",
			headers: {
				"Content-type": "application/json"
			},
			body: body
		});
		return await res.json(); 
	}

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

			let json = JSON.stringify(Object.fromEntries(data.entries()));

			makePostRequest("http://localhost:3000/requests", json)
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

	let menuArr = [
		{
		  img: "img/tabs/vegy.jpg",
		  altimg: "vegy",
		  title: "Меню 'Фитнес'",
		  descr: "Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
		  price: 9
		},
		{
		  img: "img/tabs/post.jpg",
		  altimg: "post",
		  title: "Меню 'Постное'",
		  descr: "Меню 'Постное' - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
		  price: 14
		},
		{
		  img: "img/tabs/elite.jpg",
		  altimg: "elite",
		  title: "Меню 'Премиум'",
		  descr: "В меню 'Премиум' мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
		  price: 21
		}
	 ]
	
	async function getRequest(url) {
		const res = await fetch(url);
		return await res.json(); 
	}

	// getRequest('http://localhost:3000/menu').then((arr) => {
		
	// 	arr.forEach(({img, altimg, title, descr, price}) => {
	// 		renderCard(img, altimg, title, descr, price, 30, ".menu .container")
	// 	})
	// })
	new Promise((resolve) => {
		resolve(menuArr)
	}).then((arr) => {
		
			arr.forEach(({img, altimg, title, descr, price}) => {
				renderCard(img, altimg, title, descr, price, 30, ".menu .container")
			})
		})


	function renderCard(img, altimg, title, descr, price, USD_UAH, parentSelector) {
		let elem = document.createElement("div");
		elem.classList.add("menu__item")
		elem.innerHTML = `
			<img src=${img} alt=${altimg}>
			<h3 class="menu__item-subtitle">${title}</h3>
			<div class="menu__item-descr">${descr}</div>
			<div class="menu__item-divider"></div>
			<div class="menu__item-price">
				<div class="menu__item-cost">Цена:</div>
				<div class="menu__item-total"><span>${Math.round(price * USD_UAH)}</span> грн/день</div>
			</div>`
		document.querySelector(parentSelector).append(elem);
	}

	// Carousel-like slider

	const wrapper = document.querySelector('.offer__slider-wrapper'),
			container = document.querySelector('.offer__slider-container'),
			slides = document.querySelectorAll('.offer__slide'),
			prev = document.querySelector('.offer__slider-prev'),
			next = document.querySelector('.offer__slider-next'),
			curr = document.querySelector('#current'),
			total = document.querySelector('#total'),
			width = parseInt(window.getComputedStyle(container).width),
			slider = document.querySelector('.offer__slider'),
			dots = [];

	let currSlide = 1;
	let currOffset = 0;

	function show(elem) {
		elem.classList.add("show");
		elem.classList.remove("hide");
	}

	function hide(elem) {
		elem.classList.remove("show");
		elem.classList.add("hide");
	}

	function check(prev, next) {
		if (currSlide <= 1) {
			prev.style.cssText = "opacity: 0";
		} else {
			prev.style.cssText = "opacity: 1";
		}
		if (currSlide >= slides.length) {
			hide(next)
		} else {
			show(next)
		}
	}

	slider.style.position = "relative";

	const indicators = document.createElement("ol");
	indicators.style.cssText = `
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 15;
		display: flex;
		justify-content: center;
		margin-right: 15%;
		margin-left: 15%;
		list-style: none;
	`;

	slider.append(indicators);

	for (let i = 0; i < slides.length; i++) {
		const dot = document.createElement("li");
		dot.style.cssText = `
			box-sizing: content-box;
			flex: 0 1 auto;
			width: 30px;
			height: 6px;
			margin-right: 3px;
			margin-left: 3px;
			cursor: pointer;
			background-color: #fff;
			background-clip: padding-box;
			border-top: 10px solid transparent;
			border-bottom: 10px solid transparent;
			opacity: .5;
			transition: opacity .6s ease;
		`;
		dot.setAttribute("data-scroll-to", i + 1);
		indicators.append(dot);

		dots.push(dot);
	}

	container.style.cssText = `
		display: flex; 
		transition: .2s; 
		width: ${slides.length * width}px;
	`;

	wrapper.style.cssText = `
		overflow: hidden
	`;

	slides.forEach((item) => {
		item.style.cssText = `width: ${width}`;
	})

	total.textContent = addZero(slides.length);
	curr.textContent = addZero(currSlide)

	dots.forEach((item) => {
		item.style.opacity = "0.5";
	})
	dots[currSlide - 1].style.opacity = 1;

	check(prev, next)

	next.addEventListener("click", () => {
		currSlide += 1

		curr.textContent = addZero(currSlide)

		if (currSlide > 4) {
			currSlide = 4;
		}

		if (currSlide <= slides.length) {
			currOffset += width;
			container.style.transform = `translateX(-${currOffset}px)`;
		}

		check(prev, next)

		dots.forEach((item) => {
			item.style.opacity = "0.5";
		})
		dots[currSlide - 1].style.opacity = 1;
	}) 

	prev.addEventListener("click", () => {
		currSlide -= 1

		curr.textContent = addZero(currSlide)

		if (currSlide < 1) {
			currSlide = 1;
		}

		if (currOffset > 0) {
			currOffset -= width;
			container.style.transform = `translateX(-${currOffset}px)`;
		}

		check(prev, next)

		dots.forEach((item) => {
			item.style.opacity = "0.5";
		})
		dots[currSlide - 1].style.opacity = 1;
	}) 

	dots.forEach((dot, index) => {
		dot.addEventListener("click", () => {
			const slideTo = dot.getAttribute("data-scroll-to") - 1;

			let offset = width * slideTo;

			currOffset = offset;

			container.style.transform = `translateX(-${offset}px)`;

			dots.forEach((item) => {
				item.style.opacity = "0.5";
			})
			dot.style.opacity = 1;

			currSlide = index + 1;

			curr.textContent = addZero(currSlide)

			check(prev, next)
		})
	})

	const amount = document.querySelector(".calculating__result span");

	let ratio = document.querySelector(`#${localStorage.getItem("activity")}`)?.getAttribute("data-ratio") || 1.2, 
		 height, 
		 weight, 
		 age, 
		 sex = localStorage.getItem("sex") || "female";
	
	function checkId(id) {
		if (localStorage.getItem(id))	{
			const elem = document.querySelector(`#${localStorage.getItem(id)}`);
			const parent = Array.from(elem.parentElement.children);
			parent.forEach((item) => {
				item.classList.remove("calculating__choose-item_active");
			})
			elem.classList.add("calculating__choose-item_active");
		}
	}
	
	checkId("sex")
	checkId("activity")
	

	function showTotal() {
		if (!ratio || !height || !weight || !age || !sex) {
			amount.textContent = "    ";
		} else {
			if (sex === "female") {
				amount.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio)
			} else {
				amount.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio)
			}
		}
	}

	showTotal()

	function getChoosableInfo(parentSelector, activeClass) {
		const children = document.querySelectorAll(`${parentSelector} div`);

		children.forEach((item) => {
			item.addEventListener("click", (e) => {
				if (e.target.getAttribute("data-ratio")) {
					ratio = +e.target.getAttribute("data-ratio");
					localStorage.setItem("activity", item.getAttribute("id"));
				} else {
					sex = e.target.getAttribute("id");
					localStorage.setItem("sex", sex);
				}

				children.forEach((item) => {
					item.classList.remove(activeClass);
				})
				
				e.target.classList.add(activeClass)

				console.log(ratio, sex, weight, height, age)

				showTotal();
			})
		})
	}

	getChoosableInfo("#gender", "calculating__choose-item_active");
	getChoosableInfo(".calculating__choose_big", "calculating__choose-item_active");

	function getTypableInfo(parentSelector) {
		const inputs = document.querySelectorAll(`${parentSelector} input`);
		inputs.forEach((input) => {
			input.addEventListener("input", () => {
				const inputId = input.getAttribute("id");
				const inputValue = input.value;

				if (inputValue.match(/\D/g)) {
					input.style.border = "1px solid #f00"
				} else {
					input.style.border = "none";

					if (inputId === "weight") {
						weight = +input.value;
					} else if (inputId === "height") {
						height = +input.value;
					} else {
						age = +input.value;
					}	
				}
				console.log(ratio, height, weight, age, sex)
				showTotal()
			})
		})
	}

	getTypableInfo(".calculating__choose_medium");




})
