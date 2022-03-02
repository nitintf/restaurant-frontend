import { Flex, HStack, Skeleton, Text } from '@chakra-ui/react'
import { useCallback, useEffect } from 'react'
import RestaurantCard from '../components/RestaurantCard'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { addRestaurants } from '../redux/slices/restaurants'
import Filter from '../components/Filter'
import Wrapper from '../components/UI/Wrapper'
import { fetchAllRestaurants } from '../services/restaurantService'

const Home = () => {
	const dispatch = useAppDispatch()
	const { restaurants, filter } = useAppSelector((state) => state.restaurants)

	const fetchRestaurants = useCallback(async () => {
		const restaurants = await fetchAllRestaurants()
		dispatch(addRestaurants(restaurants))
	}, [dispatch])

	useEffect(() => {
		fetchRestaurants()

		return () => {
			dispatch(addRestaurants(undefined))
		}
	}, [fetchRestaurants, dispatch])

	return (
		<Wrapper>
			<Filter />
			<Flex
				flexWrap={'wrap'}
				gap='2rem'
				position={'relative'}
				pb={'7rem'}
				width={'100%'}
				overflow='auto'>
				{restaurants?.length === 0 ? (
					<HStack>
						<Text fontSize={'20px'} fontWeight={'700'}>
							No restaurants found, try searching something else
						</Text>
					</HStack>
				) : !restaurants ? (
					<>
						<Skeleton height='250px' width='70%' marginX='auto' />
						<Skeleton height='250px' width='70%' marginX='auto' />
						<Skeleton height='250px' width='70%' marginX='auto' />
					</>
				) : (
					restaurants!
						.filter(
							(restaurant) =>
								restaurant.rating! >= filter[0] &&
								restaurant.rating! <= filter[1]
						)
						.map((restaurant, index) => (
							<RestaurantCard
								key={restaurant.id ?? index}
								restaurant={restaurant}
							/>
						))
				)}
			</Flex>
		</Wrapper>
	)
}

export default Home
