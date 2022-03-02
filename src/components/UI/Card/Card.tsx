import { Flex } from '@chakra-ui/react'
import React from 'react'

interface CardProps {}

const Card: React.FC<CardProps> = ({ children }) => {
	return (
		<Flex
			position={'relative'}
			overflow='hidden'
			lineHeight={2}
			flexDirection={'column'}
			width='70%'
			height='230px'
			borderWidth='thin'
			marginX={'auto'}
			_hover={{
				boxShadow: 'base',
			}}
			borderColor='gray.200'
			borderRadius={7}>
			{children}
		</Flex>
	)
}

export default Card
