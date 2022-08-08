import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import Input from './Input'
import Label from './Label'

interface IHInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string
}

const HInput = forwardRef<HTMLInputElement, IHInputProps>(
	(props: IHInputProps, ref) => {
		const { className, label, ...rest } = props

		return (
			<div
				className={twMerge(
					'flex flex-1 space-x-4 border-b border-gray-200 dark:border-gray-800',
					className,
				)}
			>
				<Label
					className='flex-shrink flex-grow self-center dark:text-gray-500'
					htmlFor={rest.name}
				>
					{label}
				</Label>

				<Input
					ref={ref}
					className='flex-grow bg-transparent text-right dark:bg-transparent'
					id={rest.name}
					{...rest}
				/>
			</div>
		)
	},
)

export default HInput
