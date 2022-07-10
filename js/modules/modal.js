import { makePostRequest } from "./services/services";
import { pageLoaded } from "../script";

export default function modal({modalSelector, triggerSelector}) {

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
		if ((document.documentElement.scrollHeight <= document.documentElement.scrollTop + document.documentElement.clientHeight) && pageLoaded) {
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

			makePostRequest("http://localhost:3000/requests", json)
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