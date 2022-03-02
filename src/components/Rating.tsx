import { Box, Stack } from '@chakra-ui/react'
import React from 'react'
import StarIcon from '../assets/svg/StarIcon'

interface RatingProps {
	size: number
	isEdit: boolean
	scale: number
	rating: number
	setRating: (i: number) => void
}

const Rating: React.FC<RatingProps> = ({
	rating,
	scale,
	size,
	setRating,
	isEdit,
}) => {
	const buttons = []

	const onClick = (idx: number) => {
		if (!isEdit) return

		if (!isNaN(idx)) {
			if (rating === 1 && idx === 1) {
				setRating(0)
			} else {
				setRating(idx)
			}
		}
	}

	const RatingIcon = ({ fill }: { fill: boolean }) => {
		return <StarIcon size={25} fill={fill} />
	}

	const RatingButton = ({ idx, fill }: { idx: number; fill: boolean }) => {
		return (
			<Box
				as='button'
				cursor={isEdit ? 'pointer' : 'default'}
				aria-label={`Rate ${idx}`}
				height={`${size}px`}
				width={`${size}px`}
				onClick={() => onClick(idx)}
				_focus={{ outline: 0 }}>
				<RatingIcon fill={fill} />
			</Box>
		)
	}

	for (let i = 1; i <= scale; i++) {
		buttons.push(<RatingButton key={i} idx={i} fill={i <= rating} />)
	}

	return (
		<Stack isInline>
			<input name='rating' type='hidden' value={rating} />
			{buttons}
		</Stack>
	)
}

export default Rating
