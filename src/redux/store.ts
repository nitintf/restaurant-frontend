import { configureStore } from '@reduxjs/toolkit'
import UserReducer from './slices/user'
import RestaurantReducer from './slices/restaurants'

export const store = configureStore({
	reducer: {
		user: UserReducer,
		restaurants: RestaurantReducer,
	},
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
