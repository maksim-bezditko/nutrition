/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/buttonUp.js":
/*!********************************!*\
  !*** ./js/modules/buttonUp.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buttonUp)
/* harmony export */ });
function buttonUp({buttonSelector}) {
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

/***/ }),

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ calc)
/* harmony export */ });
function calc() {
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

				if (input.value.length > 3) {
					input.value = input.value.slice(0, 3);
				}

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
				showTotal()
			})
		})
	}

	getTypableInfo(".calculating__choose_medium");
}

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ renderCards)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/services */ "./js/modules/services/services.js");


function renderCards() {

	(0,_services_services__WEBPACK_IMPORTED_MODULE_0__.fetchJSONDataFromUrl)('http://localhost:3000/menu').then((arr) => {
		
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
}

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ modal)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/services */ "./js/modules/services/services.js");
/* harmony import */ var _script__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../script */ "./js/script.js");



function modal({modalSelector, triggerSelector}) {

	let triggers = document.querySelectorAll(triggerSelector),
		 modal = document.querySelector(modalSelector)

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

	triggers.forEach((item) => {
		item.addEventListener("click", () => {
			showModal()
			if (modalTimerId) {
				clearTimeout(modalTimerId)
			}
		})
	})

	document.addEventListener("click", event => {
		if ((event.target === modal && modal.classList.contains("show")) || event.target.getAttribute("data-close") == "") {
			hideModal()
			// document.body.style.overflowY = "scroll"
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
		if ((document.documentElement.scrollHeight <= document.documentElement.scrollTop + document.documentElement.clientHeight) && _script__WEBPACK_IMPORTED_MODULE_1__.pageLoaded) {
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

			let json = JSON.stringify(Object.fromEntries(data.entries()));

			(0,_services_services__WEBPACK_IMPORTED_MODULE_0__.makePostRequest)("http://localhost:3000/requests", json)
				.then(() => {
					hideModal()
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
}

/***/ }),

/***/ "./js/modules/progressionBar.js":
/*!**************************************!*\
  !*** ./js/modules/progressionBar.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ progressionBar)
/* harmony export */ });
function progressionBar({progressionBarSelector}) {
	let percentage = document.querySelector(progressionBarSelector);
	
	function progressionBar() {

		let windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

		let progress = document.documentElement.scrollTop / windowHeight * 100;

		percentage.style.width = `${progress}%`;
	}

	progressionBar()

	document.addEventListener("scroll", progressionBar);
}

/***/ }),

/***/ "./js/modules/services/services.js":
/*!*****************************************!*\
  !*** ./js/modules/services/services.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchJSONDataFromUrl": () => (/* binding */ fetchJSONDataFromUrl),
/* harmony export */   "makePostRequest": () => (/* binding */ makePostRequest)
/* harmony export */ });
async function fetchJSONDataFromUrl(url) {
	const res = await fetch(url);
	return await res.json(); 
};

async function makePostRequest(url, body) {
	const res = await fetch(url, {
		method: "POST",
		headers: {
			"Content-type": "application/json"
		},
		body: body
	});
	return await res.json();
};


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ slider)
/* harmony export */ });
/* harmony import */ var _timer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timer */ "./js/modules/timer.js");


function slider({wholeSliderSlc, wrapperSlc, containerSlc, slideItemSlc, prevSlc, nextSlc, currCounter, totalCounter}) {

	const wrapper = document.querySelector(wrapperSlc),
			container = document.querySelector(containerSlc),
			slides = document.querySelectorAll(slideItemSlc),
			prev = document.querySelector(prevSlc),
			next = document.querySelector(nextSlc),
			curr = document.querySelector(currCounter),
			total = document.querySelector(totalCounter),
			width = parseInt(window.getComputedStyle(container).width),
			slider = document.querySelector(wholeSliderSlc),
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

	total.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.addZero)(slides.length);
	curr.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.addZero)(currSlide)

	dots.forEach((item) => {
		item.style.opacity = "0.5";
	})
	dots[currSlide - 1].style.opacity = 1;

	check(prev, next)

	next.addEventListener("click", () => {
		currSlide += 1

		curr.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.addZero)(currSlide)

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

		curr.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.addZero)(currSlide)

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

			curr.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.addZero)(currSlide)

			check(prev, next)
		})
	})
}

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ tabs)
/* harmony export */ });
function tabs({tabContentItemSlc, tabButtonSlc, tabButtonParentSlc, tabButtonActiveClass}) {
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

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addZero": () => (/* binding */ addZero),
/* harmony export */   "default": () => (/* binding */ timer)
/* harmony export */ });
function addZero(num) {
	if (num >= 0 && num < 10) {
		return `0${num}`;
	} else {
		return num;
	}
}

function timer({deadline}) {

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
}

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "pageLoaded": () => (/* binding */ pageLoaded)
/* harmony export */ });
/* harmony import */ var _modules_buttonUp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/buttonUp */ "./js/modules/buttonUp.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_progressionBar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/progressionBar */ "./js/modules/progressionBar.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");


;








const preloader = document.querySelector(".preloader");
let pageLoaded = false;

window.addEventListener("load", () => {

	pageLoaded = true;

	setTimeout(() => {
		if (!preloader.classList.contains("hidePreload")) {
			preloader.classList.add("hidePreload");
		}
	}, 1000)

	;(0,_modules_buttonUp__WEBPACK_IMPORTED_MODULE_0__["default"])({
		buttonSelector: ".buttontest"
	})
	;(0,_modules_calc__WEBPACK_IMPORTED_MODULE_1__["default"])()
	;(0,_modules_cards__WEBPACK_IMPORTED_MODULE_2__["default"])()
	;(0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])({
		modalSelector: ".modal",
		triggerSelector: "[data-modal]"
	})
	;(0,_modules_progressionBar__WEBPACK_IMPORTED_MODULE_4__["default"])({
		progressionBarSelector: ".percentage"
	})
	;(0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
		wholeSliderSlc: ".offer__slider",
		wrapperSlc: ".offer__slider-wrapper",
		containerSlc: '.offer__slider-container',
		slideItemSlc: '.offer__slide',
		prevSlc: '.offer__slider-prev',
		nextSlc: '.offer__slider-next',
		currCounter: '#current',
		totalCounter: '#total'
	})
	;(0,_modules_tabs__WEBPACK_IMPORTED_MODULE_6__["default"])({
		tabContentItemSlc: ".tabcontent",
		tabButtonSlc: ".tabheader__item",
		tabButtonParentSlc: ".tabheader__items",
		tabButtonActiveClass: "tabheader__item_active"
	})
	;(0,_modules_timer__WEBPACK_IMPORTED_MODULE_7__["default"])({
		deadline: "2022-09-01"
	})
})




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./js/script.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map