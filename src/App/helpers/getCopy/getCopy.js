const COPY = {
	pageTitle: 'place to adopt the cats',
	adoptCtaText: 'adopt',
}

export default function getCopy(copyId) {
	let str = ''
	try {
		str = COPY[copyId]
	} catch (err) {
		str = 'INVALID COPY REQUEST'
	}

	return str
}
