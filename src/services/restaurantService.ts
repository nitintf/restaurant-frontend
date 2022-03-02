import { RestaurantT } from '../types'
import API from './index'

export const fetchAllRestaurants = async () => {
	const res = await API.get('/restaurants')

	const data = await res.data

	return data
}

export const addRestaurant = async (body: RestaurantT) => {
	const res = await API.post('/restaurants', body)
	const data = await res.data

	return data
}

export const updateRestaurant = async (id: string, body: RestaurantT) => {
	const res = await API.patch(`/restaurants/${id}`, body)

	return await res.data
}

export const fetchOneRestaurant = async (id: string) => {
	const res = await API.get(`/restaurants/${id}`)

	return await res.data
}

export const deleteRestaurantService = async (id: string) => {
	const res = await API.delete(`/restaurants/${id}`)

	return await res.data
}

export const searchRestaurantService = async (query: string) => {
	const response = await API.get(`/restaurants/search/${query}`)

	return await response.data
}
