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
		<div className={twMerge('flex flex-1 flex-col space-x-2', className)}>
			<Label className='self-center' htmlFor='occupation'>
				{label}
			</Label>
			<Input className='flex-1' placeholder='Occupation...' {...rest} />
		</div>
	)
}
