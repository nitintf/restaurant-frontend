import { Flex } from '@chakra-ui/react'
import * as React from 'react'
import { FC } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../redux/hooks'
import Spinner from './Spinner'
import * as ROUTES from '../constants/routes'

interface IProps {
	role?: string[]
	element: JSX.Element
}

const Auth: FC<IProps> = ({ role = [], element }) => {
	const { user, userError, userToken } = useAppSelector((state) => state.user)
	const navigate = useNavigate()
	const { pathname } = useLocation()

	if (pathname === ROUTES.LOGIN && user) {
		navigate(ROUTES.HOME)
	}

	if (!user && !userError)
		return (
			<>
				<Flex
					width='100vw'
					height='100vh'
					alignItems='center'
					justifyContent='center'>
					<Spinner />
				</Flex>
			</>
		)

	if (userError && !user && !userToken) {
		return <Navigate to='/login' replace={true} />
	}

	if (role.length === 0) {
		return element
	}

	if (user?.admin) {
		return element
	}

	return <Navigate to='/' replace={true} />
}

export default React.memo(Auth)
