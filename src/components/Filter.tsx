import { Tab, TabList, Tabs } from '@chakra-ui/react'
import { useAppDispatch } from '../redux/hooks'
import { updateFilter } from '../redux/slices/restaurants'

const Filter = () => {
	const dispatch = useAppDispatch()

	const handleFilter = async (min: number, max: number) => {
		dispatch(updateFilter([min, max]))
	}

	return (
		<>
			<Tabs mt={10} variant={'soft-rounded'} colorScheme='teal' height='70px'>
				<TabList mb='1em' fontSize={'13px'}>
					<Tab onClick={() => handleFilter(0, 5)}>{`All`}</Tab>
					<Tab onClick={() => handleFilter(3, 5)}>{`Rating >= 3`}</Tab>
					<Tab onClick={() => handleFilter(0, 2.9)}>{`Rating < 3`}</Tab>
				</TabList>
			</Tabs>
		</>
	)
}

export default Filter
