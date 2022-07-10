"use strict"

import buttonUp from "./modules/buttonUp";
import calc from "./modules/calc";
import cards from "./modules/cards";
import modal from "./modules/modal";
import progressionBar from "./modules/progressionBar";
import slider from "./modules/slider";
import tabs from "./modules/tabs";
import timer from "./modules/timer";

const preloader = document.querySelector(".preloader");
let pageLoaded = false;

window.addEventListener("load", () => {

	pageLoaded = true;

	setTimeout(() => {
		if (!preloader.classList.contains("hidePreload")) {
			preloader.classList.add("hidePreload");
		}
	}, 1000)

	buttonUp({
		buttonSelector: ".buttontest"
	})
	calc()
	cards()
	modal({
		modalSelector: ".modal",
		triggerSelector: "[data-modal]"
	})
	progressionBar({
		progressionBarSelector: ".percentage"
	})
	slider({
		wholeSliderSlc: ".offer__slider",
		wrapperSlc: ".offer__slider-wrapper",
		containerSlc: '.offer__slider-container',
		slideItemSlc: '.offer__slide',
		prevSlc: '.offer__slider-prev',
		nextSlc: '.offer__slider-next',
		currCounter: '#current',
		totalCounter: '#total'
	})
	tabs({
		tabContentItemSlc: ".tabcontent",
		tabButtonSlc: ".tabheader__item",
		tabButtonParentSlc: ".tabheader__items",
		tabButtonActiveClass: "tabheader__item_active"
	})
	timer({
		deadline: "2022-09-01"
	})
})

export { pageLoaded };
