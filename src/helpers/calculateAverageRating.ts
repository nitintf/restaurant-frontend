import { RatingT } from '../types'

export const calculateAverageRating = (arr: RatingT[]) => {
	if (arr.length === 0) return 0

	const total = arr.reduce((prev, curr) => prev + curr.rating, 0)
	return total / arr.length
}
