import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardIcon from '../assets/svg/DashboardIcon'
import HomeIcon from '../assets/svg/Home'
import Logo from '../assets/svg/Logo'
import LogoutIcons from '../assets/svg/LogoutIcons'
import * as ROUTES from '../constants/routes'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { removeUser } from '../redux/slices/user'
import CustomLink from './CustomLink'

const SideDrawer: React.FC = () => {
	const { user } = useAppSelector((state) => state.user)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const handleLogout = () => {
		dispatch(removeUser())
		localStorage.removeItem('auth-token')
		navigate(ROUTES.LOGIN)
	}

	return (
		<Flex
			paddingY={5}
			as='nav'
			flexDirection={'column'}
			gap={2}
			alignItems='center'
			height={'100vh'}
			width={'70px'}>
			<Box as='div' color={'teal.400'} marginBottom={10}>
				<Logo />
			</Box>
			<CustomLink to={ROUTES.HOME}>
				<HomeIcon />
			</CustomLink>

			{user?.admin && (
				<CustomLink to={ROUTES.DASHBOARD}>
					<DashboardIcon />
				</CustomLink>
			)}
			<Box mt='auto' cursor='pointer' onClick={handleLogout}>
				<LogoutIcons />
			</Box>
		</Flex>
	)
}

export default SideDrawer
