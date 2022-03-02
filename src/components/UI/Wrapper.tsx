import { Flex, Divider, Container } from '@chakra-ui/react'
import React from 'react'
import SideDrawer from '../SideDrawer'
import TopBar from '../TopBar'

const Wrapper: React.FC = ({ children }) => {
	return (
		<Flex as='main' width='100vw' height='100vh'>
			<SideDrawer />
			<Divider orientation='vertical' />
			<Container
				maxW={'container.xl'}
				minH='fit-content'
				mt={20}
				overflow='auto'
				css={{
					'&::-webkit-scrollbar': {
						display: 'none',
					},
				}}>
				<TopBar />
				{children}
			</Container>
		</Flex>
	)
}

export default Wrapper
