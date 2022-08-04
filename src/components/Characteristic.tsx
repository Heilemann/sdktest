import Input from './Input'
import VInput from './VInput'

export interface ICharacteristicProps {
	label: string
	value: string
}

export default function Characteristic(props: ICharacteristicProps) {
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
}
