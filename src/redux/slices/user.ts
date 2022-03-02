import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserT } from '../../types'

interface UserStateT {
	user: UserT | null
	userError: boolean
	userToken: string | null
	allUsers: UserT[] | undefined
}

const initialState: UserStateT = {
	user: null,
	userError: false,
	userToken: null,
	allUsers: undefined,
}

const counterSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		updateUser(state, action: PayloadAction<UserT>) {
			state.user = action.payload
		},
		removeUser(state) {
			state.user = null
		},
		updateUserError(state, action: PayloadAction<boolean>) {
			state.userError = action.payload
		},
		updateUserToken(state, action: PayloadAction<string>) {
			state.userToken = action.payload
		},
		updateAllUsers(state, action: PayloadAction<UserT[]>) {
			state.allUsers = action.payload
		},
		addOneToAllUsers(state, action: PayloadAction<UserT>) {
			state.allUsers?.push(action.payload)
		},
		deleteFromAllUsers(state, action: PayloadAction<UserT>) {
			state.allUsers = state.allUsers?.filter(
				(user) => user.id && user.id !== action.payload.id
			)
		},
		updateFromAllUsers(state, action: PayloadAction<UserT>) {
			state.allUsers = state.allUsers?.map((user) => {
				if (!user.id || user.id === action.payload.id) {
					return action.payload
				}
				return user
			})
		},
	},
})

export const {
	removeUser,
	updateUserError,
	updateUser,
	updateUserToken,
	updateAllUsers,
	addOneToAllUsers,
	deleteFromAllUsers,
	updateFromAllUsers,
} = counterSlice.actions
export default counterSlice.reducer
