import { addZero } from "./timer";

export default function slider({wholeSliderSlc, wrapperSlc, containerSlc, slideItemSlc, prevSlc, nextSlc, currCounter, totalCounter}) {

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
}