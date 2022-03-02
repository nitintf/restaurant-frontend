import { useCallback, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Auth from './components/Auth'
import * as ROUTES from './constants/routes'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Login from './pages/Login'
import Restaurant from './pages/Restaurant'
import { useAppDispatch } from './redux/hooks'
import { updateUser, updateUserError } from './redux/slices/user'
import { currentUser } from './services/userService'

function App() {
	const dispatch = useAppDispatch()

	const fetch = useCallback(async () => {
		try {
			const response = await currentUser()

			dispatch(updateUser(response))
		} catch (error) {
			dispatch(updateUserError(true))
		}
	}, [dispatch])

	useEffect(() => {
		fetch()
	}, [fetch])

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path={ROUTES.LOGIN} element={<Login />} />
					<Route path={ROUTES.HOME} element={<Auth element={<Home />} />} />
					<Route
						path={ROUTES.RESTAURANT}
						element={<Auth element={<Restaurant />} />}
					/>
					<Route
						path={ROUTES.DASHBOARD}
						element={<Auth role={['admin']} element={<Dashboard />} />}
					/>
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
