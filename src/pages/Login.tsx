import {
	Button,
	Container,
	Heading,
	Stack,
	useToast,
	VStack,
} from '@chakra-ui/react'
import React, { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InputField from '../components/InputField'
import { useAppDispatch } from '../redux/hooks'
import { updateUser, updateUserToken } from '../redux/slices/user'
import { signup } from '../services/userService'

const Login: React.FC = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')

	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const toast = useToast()

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		setLoading(true)
		if (email.trim().length < 6 || password.trim().length < 6) {
			toast({
				title: 'Email and password should be atleast of 6 char',
				status: 'error',
			})
			setLoading(false)
			return
		}
		try {
			const response = await signup({ email, password })
			localStorage.setItem('auth-token', response.token)
			dispatch(updateUser(response))
			dispatch(updateUserToken(response.token))
			navigate('/')
		} catch (err: any) {
			setLoading(false)
			toast({
				title: 'Invalid Cerdentials',
				status: 'error',
			})
		}
	}

	return (
		<Container height='100vh' maxW='container.md'>
			<VStack width='100%' mt='6rem'>
				<Heading as='h1'>Login</Heading>
				<form onSubmit={handleSubmit}>
					<Stack width='450px'>
						<InputField
							name='email'
							type={'email'}
							label='Your Email'
							onChange={(e) => setEmail(e.target.value)}
						/>
						<InputField
							name='password'
							type={'password'}
							label='Password'
							onChange={(e) => setPassword(e.target.value)}
						/>
						<Button
							isLoading={loading}
							loadingText='Wait'
							type='submit'
							variant={'solid'}
							bg='teal.300'>
							Login
						</Button>
					</Stack>
				</form>
			</VStack>
		</Container>
	)
}

export default Login
