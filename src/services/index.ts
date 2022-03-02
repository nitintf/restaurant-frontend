import axios from 'axios'

const API = axios.create({
	baseURL: 'http://localhost:4000',
	headers: {
		Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
	},
})

export default API
