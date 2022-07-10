export function addZero(num) {
	if (num >= 0 && num < 10) {
		return `0${num}`;
	} else {
		return num;
	}
}

export default function timer({deadline}) {

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