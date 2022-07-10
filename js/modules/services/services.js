export async function fetchJSONDataFromUrl(url) {
	const res = await fetch(url);
	return await res.json(); 
};

export async function makePostRequest(url, body) {
	const res = await fetch(url, {
		method: "POST",
		headers: {
			"Content-type": "application/json"
		},
		body: body
	});
	return await res.json();
};
