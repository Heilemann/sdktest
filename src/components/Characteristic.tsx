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
			label={label}
			defaultValue={value}
			placeholder='&mdash;'
			{...rest}
		/>
	)
}
