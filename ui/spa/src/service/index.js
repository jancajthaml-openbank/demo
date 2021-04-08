
export const getContext = async () =>
	fetch('/manifest.json').then((data) => data.json())