import { Container, Flex, Skeleton } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import Wrapper from '../components/UI/Wrapper'
import UserCard from '../components/UserCard'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { updateAllUsers } from '../redux/slices/user'
import { fetchAllUsersService } from '../services/userService'

const Dashboard = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const dispatch = useAppDispatch()
	const { allUsers } = useAppSelector((state) => state.user)

	useEffect(() => {
		const fetchUsers = async () => {
			setLoading(true)
			try {
				const users = await fetchAllUsersService()
				dispatch(updateAllUsers(users))
			} catch (error) {
				console.log('error', error)
			}
			setLoading(false)
		}

		fetchUsers()
	}, [dispatch])

	return (
		<Wrapper>
			<Container maxW={'container.lg'} py={5}>
				{loading || !allUsers ? (
					<>
						<Skeleton width='80%' height='150px' my={4} mx='auto' />
						<Skeleton width='80%' height='150px' mx='auto' />
					</>
				) : (
					<Flex gap={4} flexDirection='column'>
						{allUsers.map((user) => (
							<UserCard key={user.id!} user={user} />
						))}
					</Flex>
				)}
			</Container>
		</Wrapper>
	)
}

export default Dashboard
