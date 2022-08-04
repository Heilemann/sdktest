import { forwardRef } from 'react'
import VInput from './VInput'

export interface ICharacteristicProps {
	label: string
	value: string
}

const Characteristic = forwardRef<HTMLInputElement, ICharacteristicProps>(
	(props: ICharacteristicProps, ref) => {
		const { label, value, ...rest } = props

		return (
			<VInput
				className='mx-1 sm:mx-2'
				label={label}
				defaultValue={value}
				placeholder='&mdash;'
				{...rest}
			/>
		)
	},
)

export default Characteristic
