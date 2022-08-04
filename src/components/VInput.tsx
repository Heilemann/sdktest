import * as React from 'react'
import { twMerge } from 'tailwind-merge'
import Input from './Input'
import Label from './Label'

interface IVInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string
}

export default function VInput(props: IVInputProps) {
	const { className, label, ...rest } = props

	return (
		<div
			className={twMerge(
				'my-1 flex flex-1 flex-col border-b border-gray-800',
				className,
			)}
		>
			<Label className='text-center' htmlFor='occupation'>
				{label}
			</Label>
			<Input
				className='flex-1  bg-transparent text-center dark:bg-transparent'
				placeholder='Occupation...'
				{...rest}
			/>
		</div>
	)
}
