import {
	Avatar,
	Box,
	Flex,
	IconButton,
	Stack,
	Text,
	useToast,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CrossIcon from '../assets/svg/CrossIcon'
import DeleteIcon from '../assets/svg/DeleteIcon'
import EditIcon from '../assets/svg/EditIcon'
import TickIcon from '../assets/svg/TickIcon'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { delteReview, updateReview } from '../redux/slices/restaurants'
import user from '../redux/slices/user'
import {
	addOneReviewService,
	deleteReviewService,
	updateReviewService,
} from '../services/ratingsService'
import { RatingT } from '../types'
import Rating from './Rating'
import EditfIeld from './UI/EditfIeld'

interface ReviewItemProps {
	item: RatingT
}

const ReviewItem: React.FC<ReviewItemProps> = ({ item }) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isEditMode, setIsEditMode] = useState<boolean>(false)
	const [comment, setComment] = useState<string>(item.comment)
	const [rating, setRating] = useState<number>(item.rating)
	const { user: currentUser } = useAppSelector((state) => state.user)
	const dispatch = useAppDispatch()
	const toast = useToast()

	const { id } = useParams()

	useEffect(() => {
		if (item.comment === '') {
			setIsEditMode(true)
		}
	}, [item.comment])

	const validateComment = () => {
		if (comment.trim() === '') {
			toast({
				title: 'Comment should be of atleast 1 char',
				status: 'error',
				isClosable: true,
			})
			return false
		}

		return true
	}

	const handleDelete = async () => {
		try {
			await deleteReviewService(item.id!)
			dispatch(delteReview(item))
			toast({
				title: 'Review Deleted Successfully',
				status: 'success',
				isClosable: true,
			})
		} catch (err) {
			toast({
				title: 'Something went wrong.',
				status: 'error',
				isClosable: true,
			})
			console.log('err', err)
		}
	}

	const onCancel = () => {
		if (!item.id) {
			dispatch(delteReview(item))
		}

		setComment(item.comment)
		setRating(item.rating)
		setIsEditMode(false)
	}

	const onUpdate = async () => {
		if (!validateComment()) return
		setIsLoading(true)
		try {
			let response
			if (!item.id) {
				response = await addOneReviewService({ comment, rating }, id!)
			} else {
				response = await updateReviewService(item.id!, { comment, rating })
			}
			console.log('response', response)
			dispatch(updateReview(response))
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
		<Box p={7} bg='gray.200' borderRadius={5} width='100%' minH={'10px'} mb={3}>
			<Flex alignItems={'center'} gap='2rem'>
				<Avatar size='md' />
				<Stack lineHeight='1.3'>
					<Box>
						<Text mb={0} as='h4' fontSize='13px' fontWeight={800}>
							{`${item.user?.name!} (${item.user?.email})`}
						</Text>
					</Box>
					<EditfIeld
						autoFocus={true}
						type='h1'
						isEdit={isEditMode}
						setValue={(e) => setComment(e)}
						value={comment}
						size={20}
						placeholder='Comment'
					/>
					<Rating
						isEdit={isEditMode}
						rating={rating}
						setRating={(num) => setRating(num)}
						size={20}
						scale={5}
					/>
				</Stack>
				{!isEditMode &&
					(currentUser?.admin || currentUser?.id === item.user?.id) && (
						<Flex gap={3} ml='auto'>
							<IconButton
								onClick={handleDelete}
								aria-label='More Details'
								size='sm'
								variant='ghost'
								isRound>
								<DeleteIcon />
							</IconButton>
							<IconButton
								onClick={() => setIsEditMode(true)}
								aria-label='More Details'
								size='sm'
								variant='ghost'
								isRound>
								<EditIcon />
							</IconButton>
						</Flex>
					)}
				{isEditMode && (
					<Flex gap={3} ml='auto'>
						<IconButton
							onClick={onCancel}
							aria-label='Cancel'
							size='sm'
							variant='ghost'
							isRound>
							<CrossIcon />
						</IconButton>
						<IconButton
							isLoading={isLoading}
							onClick={onUpdate}
							aria-label='More Details'
							size='sm'
							variant='ghost'
							isRound>
							<TickIcon />
						</IconButton>
					</Flex>
				)}
			</Flex>
		</Box>
	)
}

export default ReviewItem
