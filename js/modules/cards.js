import { fetchJSONDataFromUrl } from "./services/services";

export default function renderCards() {

	fetchJSONDataFromUrl('http://localhost:3000/menu').then((arr) => {
		
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