import * as React from 'react'
import { twMerge } from 'tailwind-merge'

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, IInputProps>((props, ref) => {
	return (
		<input
			ref={ref}
			className={twMerge(props.className, 'rounded-lg p-2 dark:bg-gray-800')}
			{...props}
		/>
	)
})

export default Input
