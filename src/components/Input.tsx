import * as React from 'react'
import { twMerge } from 'tailwind-merge'

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, IInputProps>((props, ref) => {
	const { className, ...rest } = props

	return (
		<input
			ref={ref}
			className={twMerge(
				'w-full rounded-lg p-2 dark:bg-gray-800',
				props.className,
			)}
			{...rest}
		/>
	)
})

export default Input
