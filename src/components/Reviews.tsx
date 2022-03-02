import { Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import React from 'react'
import { useAppSelector } from '../redux/hooks'
import ReviewItem from './ReviewItem'

const Reviews: React.FC = () => {
	const { restaurant } = useAppSelector(
		(state) => state.restaurants.currentRestaurant!
	)

	return (
		<Tabs isFitted={true} colorScheme='teal' height='100%' mb={10}>
			<TabList mb='1em'>
				<Tab>Latest</Tab>
				<Tab>Highest</Tab>
				<Tab>Lowest</Tab>
			</TabList>
			<TabPanels>
				<TabPanel>
					{restaurant?.ratings?.map((itm, index) => {
						return <ReviewItem key={itm.id! ?? index} item={itm} />
					})}
				</TabPanel>
				<TabPanel>
					{restaurant?.ratings?.filter((itm) => itm.rating > 3)?.length ===
					0 ? (
						<Text>No Ratings</Text>
					) : (
						restaurant?.ratings
							?.filter((itm) => itm.rating > 3)
							.map((itm) => {
								return <ReviewItem key={itm.id!} item={itm} />
							})
					)}
				</TabPanel>
				<TabPanel>
					{restaurant?.ratings?.filter((itm) => itm.rating <= 3)?.length ===
					0 ? (
						<Text>No Ratings</Text>
					) : (
						restaurant?.ratings
							?.filter((itm) => itm.rating <= 3)
							.map((itm) => {
								return <ReviewItem key={itm.id!} item={itm} />
							})
					)}
				</TabPanel>
			</TabPanels>
		</Tabs>
	)
}

export default Reviews
