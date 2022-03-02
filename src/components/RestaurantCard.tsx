import {
	Box,
	Flex,
	IconButton,
	Text,
	Tooltip,
	useToast,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AddresIcon from '../assets/svg/AddresIcon'
import ArrowIcon from '../assets/svg/ArrowIcon'
import EditIcon from '../assets/svg/EditIcon'
import StarIcon from '../assets/svg/StarIcon'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { deleteOne, updateOne } from '../redux/slices/restaurants'
import {
	addRestaurant,
	deleteRestaurantService,
	updateRestaurant,
} from '../services/restaurantService'
import { RestaurantT } from '../types'
import Card from './UI/Card/Card'
import CardFooter from './UI/Card/CardFooter'
import EditfIeld from './UI/EditfIeld'

interface RestaurantCardProps {
	restaurant: RestaurantT
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
	const [isEditMode, setIsEditMode] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [name, setName] = useState<string>(restaurant.name)
	const [address, setAddress] = useState<string>(restaurant.address)
	const { user } = useAppSelector((state) => state.user)
	const toast = useToast()
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (restaurant.name.trim() === '' || restaurant.address.trim() === '') {
			setIsEditMode(true)
		}
	}, [restaurant.address, restaurant.name])

	const onDelete = async () => {
		try {
			if (!restaurant.id) {
				dispatch(deleteOne(restaurant))
				return
			}
			await deleteRestaurantService(restaurant.id!)
			dispatch(deleteOne(restaurant))
			toast({
				title: 'Deleted Successfully',
				isClosable: true,
				status: 'success',
			})
		} catch (err) {
			console.log('err', err)
			toast({
				title: 'Something went wrong',
				isClosable: true,
				status: 'error',
			})
		}
	}

	const onCancel = async () => {
		if (!restaurant.id) {
			dispatch(deleteOne(restaurant))
		}

		setName(restaurant.name)
		setAddress(restaurant.address)
		setIsEditMode(false)
	}

	const onUpdate = async () => {
		if (name.trim().length < 4 || address.trim().length < 4) {
			toast({
				title: 'Please fill all the fields with min length of 4 char',
				status: 'error',
				isClosable: true,
			})
			return
		}
		setIsLoading(true)
		try {
			let response
			if (!restaurant.id) {
				response = await addRestaurant({ name, address })
			} else {
				response = await updateRestaurant(restaurant.id!, { name, address })
			}

			dispatch(updateOne(response))
			setIsEditMode(false)
			toast({
				title: 'Updated Successfully',
				isClosable: true,
				status: 'success',
			})
		} catch (err) {
			console.log('err', err)
			toast({
				title: 'Something went wrong',
				isClosable: true,
				status: 'error',
			})
		}
		setIsLoading(false)
	}

	return (
		<Card>
			<Box p={5}>
				<EditfIeld
					isEdit={isEditMode}
					setValue={(value) => setName(value)}
					type='h1'
					value={name}
					autoFocus={true}
					size={28}
					placeholder='Restaurant name'
				/>
				<Flex
					maxWidth={'fit-content'}
					mt={1}
					gap={2}
					alignItems='center'
					fontWeight='700'
					color='gray.600'
					fontSize='12px'>
					<AddresIcon />
					<EditfIeld
						isEdit={isEditMode}
						setValue={(value) => setAddress(value)}
						type='p'
						value={address}
						autoFocus={false}
						size={12}
						placeholder='Restaurant address'
					/>
				</Flex>
				<Flex
					mt={2}
					gap={2}
					alignItems='center'
					fontWeight='700'
					color='gray.600'
					fontSize='12px'>
					<StarIcon fill={true} size={25} />
					<Text as='p' isTruncated>
						{restaurant.rating?.toFixed(1)}
					</Text>
				</Flex>
			</Box>
			<CardFooter
				isEditMode={isEditMode}
				isLoading={isLoading}
				onCancel={onCancel}
				onUpdate={onUpdate}
				onDelete={onDelete}
				deleteBtnLocation='/'>
				<>
					{user?.admin && (
						<Tooltip
							label='Edit'
							hasArrow
							placement='top'
							arrowSize={10}
							fontSize='12px'>
							<IconButton
								onClick={() => setIsEditMode(true)}
								aria-label='More Details'
								size='sm'
								isRound
								width='min-content'
								icon={<EditIcon />}
							/>
						</Tooltip>
					)}
					<Link to={`/${restaurant.id}`}>
						<Tooltip
							label='More Details'
							hasArrow
							placement='top'
							arrowSize={10}
							fontSize='12px'>
							<IconButton
								aria-label='More Details'
								size='sm'
								isRound
								width='min-content'
								icon={<ArrowIcon />}
							/>
						</Tooltip>
					</Link>
				</>
			</CardFooter>
		</Card>
	)
}

export default RestaurantCard
