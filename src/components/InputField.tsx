import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import React, { InputHTMLAttributes } from 'react'

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
	name: string
	label: string
}

const InputField: React.FC<InputFieldProps> = ({
	label,
	name,
	size: _,
	...props
}) => {
	return (
		<FormControl>
			<FormLabel htmlFor={name}>{label}</FormLabel>
			<Input {...props} id={name} variant='filled' />
		</FormControl>
	)
}

export default InputField
