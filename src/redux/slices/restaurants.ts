import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RatingT, RestaurantT } from '../../types'

type CurrentResturantT = {
	restaurant: RestaurantT | undefined
}

interface RestaurantsStateT {
	restaurants: RestaurantT[] | undefined
	currentRestaurant: CurrentResturantT
	filter: [number, number]
}

const initialState: RestaurantsStateT = {
	restaurants: undefined,
	filter: [0, 5],
	currentRestaurant: {
		restaurant: undefined,
	},
}

const counterSlice = createSlice({
	name: 'restaurants',
	initialState,
	reducers: {
		addRestaurants(state, action: PayloadAction<RestaurantT[] | undefined>) {
			state.restaurants = action.payload
		},
		updateRestaurants(state, action: PayloadAction<RestaurantT>) {
			state.restaurants?.push(action.payload)
		},
		updateOne(state, action: PayloadAction<RestaurantT>) {
			state.restaurants = state.restaurants?.map((res) => {
				if (!res.id) {
					return action.payload
				}

				if (res.id === action.payload.id) {
					res.name = action.payload.name
					res.address = action.payload.address
				}

				return res
			})
		},
		deleteOne(state, action: PayloadAction<RestaurantT>) {
			state.restaurants = state.restaurants?.filter(
				(res) => res.id && res.id !== action.payload.id
			)
		},
		updateCurrent(state, action: PayloadAction<RestaurantT | undefined>) {
			state.currentRestaurant = {
				restaurant: action.payload,
			}
		},
		addReview(state, action: PayloadAction<RatingT>) {
			state.currentRestaurant = {
				restaurant: {
					...state.currentRestaurant.restaurant!,
					ratings: [
						...state.currentRestaurant.restaurant?.ratings!,
						action.payload,
					],
				},
			}
		},
		delteReview(state, action: PayloadAction<RatingT>) {
			state.currentRestaurant = {
				restaurant: {
					...state.currentRestaurant.restaurant!,
					ratings: state.currentRestaurant.restaurant?.ratings?.filter(
						(rat) => rat.id !== action.payload.id
					),
				},
			}
		},
		updateReview(state, action: PayloadAction<RatingT>) {
			state.currentRestaurant = {
				restaurant: {
					...state.currentRestaurant.restaurant!,
					ratings: state.currentRestaurant.restaurant?.ratings?.map(
						(rating) => {
							if (!rating.id) {
								return action.payload
							}

							if (rating.id === action.payload.id) {
								rating.comment = action.payload.comment
								rating.rating = action.payload.rating
							}
							return rating
						}
					),
				},
			}
		},
		updateFilter(state, action: PayloadAction<[number, number]>) {
			state.filter = action.payload
		},
	},
})

export const {
	addRestaurants,
	updateRestaurants,
	updateOne,
	deleteOne,
	updateCurrent,
	updateFilter,
	addReview,
	delteReview,
	updateReview,
} = counterSlice.actions
export default counterSlice.reducer
