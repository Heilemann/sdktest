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
					'flex flex-1 space-x-2 border-b border-gray-800',
					className,
				)}
			>
				<Label
					className='flex-0 w-24 self-center dark:text-gray-500 md:w-32'
					htmlFor={rest.name}
				>
					{label}
				</Label>

				<Input
					ref={ref}
					className='flex-1 bg-transparent text-right dark:bg-transparent'
					id={rest.name}
					{...rest}
				/>
			</div>
		)
	},
)

export default HInput
