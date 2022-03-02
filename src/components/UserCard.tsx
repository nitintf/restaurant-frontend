import {
	Avatar,
	Flex,
	IconButton,
	Select,
	Tooltip,
	useToast,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import EditIcon from '../assets/svg/EditIcon'
import { useAppDispatch } from '../redux/hooks'
import { deleteFromAllUsers, updateFromAllUsers } from '../redux/slices/user'
import {
	createUserService,
	deleteUserService,
	updateUserService,
} from '../services/userService'
import { UserT } from '../types'
import Card from './UI/Card/Card'
import CardFooter from './UI/Card/CardFooter'
import EditfIeld from './UI/EditfIeld'

interface UserCardProps {
	user: UserT
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
	const dispatch = useAppDispatch()
	const toast = useToast()
	const [isEditMode, setIsEditMode] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [email, setEmail] = useState(user.email)
	const [name, setName] = useState(user.name)
	const [password, setPassword] = useState(user.password)
	const [isAdmin, setIsAdmin] = useState(user.admin)

	useEffect(() => {
		if (user.name.trim() === '' || user.email.trim() === '') {
			setIsEditMode(true)
		}
	}, [user])

	const onDelete = async () => {
		try {
			if (user.id) {
				await deleteUserService(user.id!)
			}

			dispatch(deleteFromAllUsers(user))
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

	const onUpdate = async () => {
		if (email.trim().length < 5 || name.trim().length < 2) {
			toast({
				title: 'Please Fill all fields',
				status: 'error',
			})
		}
		setIsLoading(true)
		let response
		if (!user.id) {
			response = await createUserService({
				email,
				name,
				admin: isAdmin,
				password,
			})
		} else {
			response = await updateUserService(user.id, {
				name,
				email,
				admin: isAdmin,
				password,
			})
		}
		dispatch(updateFromAllUsers(response))
		setIsLoading(false)
		setIsEditMode(false)
		toast({
			title: 'Updated Successfully',
			status: 'success',
		})
		try {
		} catch (error: any) {
			toast({
				title: error.message,
				status: 'success',
			})
		}
	}

	const onCancel = async () => {
		if (
			user.name.trim() === '' ||
			user.email.trim() === '' ||
			user?.password!.trim() === ''
		) {
			dispatch(deleteFromAllUsers(user))
		}

		setEmail(user.email)
		setName(user.name)
		setPassword(user.password)
		setIsAdmin(user.admin)
		setIsEditMode(false)
	}
	return (
		<>
			<Card>
				<Flex p={5} alignItems='center' gap={3}>
					<Avatar size={'lg'} />
					<Flex flexDirection={'column'}>
						<EditfIeld
							autoFocus={true}
							isEdit={isEditMode}
							setValue={(val) => setEmail(val)}
							type='h1'
							value={email}
							size={15}
							placeholder='Email'
						/>
						<EditfIeld
							autoFocus={false}
							isEdit={isEditMode}
							setValue={(val) => setName(val)}
							type='p'
							value={name}
							placeholder='Name'
							size={12}
						/>
						<EditfIeld
							autoFocus={false}
							isEdit={isEditMode}
							setValue={(val) => setPassword(val)}
							type='p'
							value={password!}
							placeholder='Password'
							size={12}
						/>
					</Flex>
					<Select
						width='150px'
						ml='auto'
						onChange={(e) => {
							e.target.value === 'Admin' ? setIsAdmin(true) : setIsAdmin(false)
						}}
						variant={'filled'}
						defaultValue={isAdmin ? 'Admin' : 'User'}
						isDisabled={!isEditMode}>
						<option value='Admin'>Admin</option>
						<option value='User'>User</option>
					</Select>
				</Flex>
				<CardFooter
					isEditMode={isEditMode}
					isLoading={isLoading}
					onCancel={onCancel}
					onDelete={onDelete}
					onUpdate={onUpdate}
					deleteBtnLocation='/dashboard'>
					<Tooltip
						label='Edit'
						hasArrow
						placement='top'
						arrowSize={10}
						fontSize='12px'>
						<IconButton
							onClick={() => setIsEditMode(true)}
							aria-label='Edit'
							size='sm'
							isRound
							mr={5}
							width='min-content'
							icon={<EditIcon />}
						/>
					</Tooltip>
				</CardFooter>
			</Card>
		</>
	)
}

export default UserCard
