import { Button, Divider, Flex } from '@chakra-ui/react'
import React from 'react'
import { useLocation } from 'react-router-dom'

interface CardFooterProps {
	isEditMode: boolean
	isLoading: boolean
	deleteBtnLocation: string
	onDelete: () => void
	onUpdate: () => void
	onCancel: () => void
}

const CardFooter: React.FC<CardFooterProps> = ({
	isEditMode,
	isLoading,
	deleteBtnLocation,
	onCancel,
	onDelete,
	onUpdate,
	children,
}) => {
	const location = useLocation()

	return (
		<>
			<Divider position={'absolute'} bottom='58px' />
			<Flex mt='auto' p={3} gap={4} justifyContent='flex-end'>
				{isEditMode ? (
					<>
						{location.pathname === deleteBtnLocation && (
							<Button
								size='sm'
								variant={'solid'}
								bg='red.500'
								onClick={onDelete}
								color='white'>
								Delete
							</Button>
						)}
						<Button size='sm' variant={'ghost'} onClick={onCancel}>
							Cancel
						</Button>
						<Button
							onClick={onUpdate}
							size='sm'
							color='white'
							isLoading={isLoading}
							bg='teal'
							variant={'solid'}>
							Save
						</Button>
					</>
				) : (
					<>{children}</>
				)}
			</Flex>
		</>
	)
}

export default CardFooter
