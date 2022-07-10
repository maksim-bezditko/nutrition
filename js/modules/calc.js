export default function calc() {
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