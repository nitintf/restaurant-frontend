import {
	Button,
	Flex,
	Input,
	InputGroup,
	InputLeftElement,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import AddIcon from '../assets/svg/AddIcon'
import Search from '../assets/svg/Search'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { addRestaurants, updateRestaurants } from '../redux/slices/restaurants'
import { addOneToAllUsers } from '../redux/slices/user'
import {
	fetchAllRestaurants,
	searchRestaurantService,
} from '../services/restaurantService'

const TopBar = () => {
	const [searchQuery, setSearchQuery] = useState<string>('')
	const { user } = useAppSelector((state) => state.user)
	const location = useLocation()
	const dispatch = useAppDispatch()

	useEffect(() => {
		const fetchSearchResult = async () => {
			if (searchQuery.trim() !== '') {
				try {
					const response = await searchRestaurantService(searchQuery)
					dispatch(addRestaurants(response))
				} catch (error) {
					console.log('error :>> ', error)
				}
			} else {
				const response = await fetchAllRestaurants()
				dispatch(addRestaurants(response))
			}
		}

		fetchSearchResult()
	}, [searchQuery, dispatch])

	return (
		<Flex
			paddingY={4}
			zIndex={1}
			width='90%'
			alignItems={'center'}
			mb={4}
			position='fixed'
			top='0'>
			<InputGroup>
				<InputLeftElement pointerEvents='none' children={<Search />} />
				<Input
					variant='filled'
					placeholder='Search Restaurant'
					width='50%'
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
			</InputGroup>

			{user?.admin && (
				<Flex gap={3}>
					{location.pathname === '/' && (
						<Button
							leftIcon={<AddIcon />}
							colorScheme='teal'
							variant='solid'
							size='md'
							onClick={() =>
								dispatch(
									updateRestaurants({
										name: '',
										address: '',
										rating: 0,
									})
								)
							}
							fontSize={'14px'}>
							Add Restaurant
						</Button>
					)}
					{location.pathname === '/dashboard' && (
						<Button
							leftIcon={<AddIcon />}
							colorScheme='teal'
							variant='solid'
							size='md'
							onClick={() =>
								dispatch(
									addOneToAllUsers({
										email: '',
										name: '',
										admin: false,
									})
								)
							}
							fontSize={'14px'}>
							Add User
						</Button>
					)}
				</Flex>
			)}
		</Flex>
	)
}

export default React.memo(TopBar)
