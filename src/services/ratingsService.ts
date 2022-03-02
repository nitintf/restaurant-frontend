import { RatingT } from './../types'
import API from './index'

export const addOneReviewService = async (
	review: RatingT,
	restaurantId: string
) => {
	const response = await API.post(`/ratings`, { ...review, restaurantId })

	return await response.data
}

export const updateReviewService = async (id: string, body: RatingT) => {
	const response = await API.patch(`/ratings/${id}`, body)

	return await response.data
}

export const deleteReviewService = async (id: string) => {
	const response = await API.delete(`/ratings/${id}`)

	return await response.data
}
