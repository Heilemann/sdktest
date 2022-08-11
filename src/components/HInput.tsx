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
					className='w-2/5 self-center dark:text-gray-500 whitespace-nowrap'
					htmlFor={rest.name}
				>
					{label}
				</Label>

				<Input
					ref={ref}
					className=' my-1 py-1.5 hover:bg-gray-200 bg-transparent text-right dark:bg-transparent'
					id={rest.name}
					{...rest}
				/>
			</div>
		)
	},
)

export default HInput
