import {
	Box,
	Button,
	Container,
	Heading,
	Skeleton,
	Stack,
} from '@chakra-ui/react'
import { useCallback, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import RestaurantCard from '../components/RestaurantCard'
import Reviews from '../components/Reviews'
import Wrapper from '../components/UI/Wrapper'
import { calculateAverageRating } from '../helpers/calculateAverageRating'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { addReview, updateCurrent } from '../redux/slices/restaurants'
import { fetchOneRestaurant } from '../services/restaurantService'

const Restaurant = () => {
	const { restaurant } = useAppSelector(
		(state) => state.restaurants.currentRestaurant!
	)
	const { user } = useAppSelector((state) => state.user)
	const { id } = useParams()
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const fetch = useCallback(async () => {
		try {
			const res = await fetchOneRestaurant(id!)
			console.log('res', res)
			dispatch(updateCurrent(res))
		} catch (err) {
			console.log('err', err)
			navigate('/')
		}
	}, [id, navigate, dispatch])

	useEffect(() => {
		fetch()

		return () => {
			dispatch(updateCurrent(undefined))
		}
	}, [fetch, dispatch])

	return (
		<Wrapper>
			<Box width='100%' maxH={'100%'} minH={'100%'} pb={10}>
				{!restaurant ? (
					<Skeleton height='300px' width='100%' />
				) : (
					<>
						<Stack mt={5} height={'100%'}>
							<RestaurantCard
								restaurant={{
									...restaurant,
									rating: calculateAverageRating(restaurant.ratings!),
								}}
							/>
							<Container as='section' maxW={'container.lg'} alignSelf='center'>
								<Stack mt={5}>
									<Heading as='h3' size='md' mb={5}>
										Reviews
									</Heading>
									<Button
										onClick={() =>
											dispatch(
												addReview({
													comment: '',
													rating: 5,
													user: user!,
												})
											)
										}
										disabled={
											!user?.admin &&
											!!restaurant.ratings?.find(
												(itm) => itm.user?.id! === user?.id!
											)
										}
										width='min-content'>
										Submit Review
									</Button>

									<Reviews />
								</Stack>
							</Container>
						</Stack>
					</>
				)}
			</Box>
		</Wrapper>
	)
}

export default Restaurant
