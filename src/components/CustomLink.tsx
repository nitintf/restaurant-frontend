import {
	LinkProps,
	useResolvedPath,
	useMatch,
	Link as RouterLink,
} from 'react-router-dom'
import { Flex, Link } from '@chakra-ui/react'

const CustomLink = ({ children, to, ...props }: LinkProps) => {
	let resolved = useResolvedPath(to)
	let match = useMatch({ path: resolved.pathname, end: true })

	return (
		<Link
			as={RouterLink}
			width={'45px'}
			height={'45px'}
			borderRadius={15}
			bg={match ? 'teal.300' : 'white'}
			color={match ? 'white' : 'teal.300'}
			to={to}
			{...props}>
			<Flex alignItems={'center'} height='100%' justifyContent='center'>
				{children}
			</Flex>
		</Link>
	)
}

export default CustomLink
