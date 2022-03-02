import { SignupSchema } from '../shared/apiSchema'
import { UserT } from '../types'
import API from './index'

export const signup = async (body: SignupSchema) => {
	const res = await API.post('/auth/signin', body)

	const data = await res.data

	return data
}

export const currentUser = async () => {
	const response = await API.get('/auth/me')

	return await response.data
}

export const fetchAllUsersService = async () => {
	const response = await API.get('/auth')

	return await response.data
}

export const updateUserService = async (id: string, body: UserT) => {
	const response = await API.patch(`/auth/${id}`, body)

	return await response.data
}

export const createUserService = async (body: UserT) => {
	const response = await API.post(`/auth/signup`, body)

	return await response.data
}

export const deleteUserService = async (id: string) => {
	const response = await API.delete(`/auth/${id}`)

	return await response.data
}
