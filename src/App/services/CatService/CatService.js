import to from 'await-to-js'
import axios from 'axios'

export default class CatService {
	static KEY = 'd5ce88d4-066d-4db5-b932-9687da7b571c'
	static API_BASE = 'https://api.thecatapi.com/v1'
	static FAKE_NAMES = [
		'Mittens',
		'Buba',
		'Molly',
		'Felix',
		'Tigger',
		'Ginger',
		'Charlie',
		'Sooty',
		'Badger',
		'Sandwich',
		'Angel',
		'Cat',
		'Bon Bon',
		'Nugget',
	]

	static async api(options = {}) {
		const [err, res] = await to(
			axios({
				method: 'GET',
				headers: { 'x-api-key': CatService.KEY },
				...options,
			})
		)
		if (err) {
			console.error(err)
			return []
		}

		return res.data
	}

	static getImages() {
		return CatService.api({
			url: `${CatService.API_BASE}/images/search?limit=100&size=small`,
		})
	}

	static async getCats() {
		const images = await CatService.getImages()
		return images
			.filter(i => i.breeds.length)
			.map(i => ({
				name: CatService.FAKE_NAMES[Math.floor(Math.random() * CatService.FAKE_NAMES.length)],
				description: i.breeds[0].temperament,
				age: Math.floor(Math.random() * 16) + 1,
				image: i.url,
			}))
	}
}
