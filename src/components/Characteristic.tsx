import Input from './Input'

export interface ICharacteristicProps {
	label: string
	value: string
}

export default function Characteristic(props: ICharacteristicProps) {
	const { label, value, ...rest } = props

	return (
		<div className='space-y-1'>
			<div className='text-center'>{label}</div>
			<div className='flex flex-1 space-x-1'>
				<Input
					className='flex-1 text-center'
					defaultValue={value}
					placeholder='&mdash;'
					{...rest}
				/>
				{/* <Input
          className="w-10 text-center"
          defaultValue={value}
          placeholder="&mdash;"
          disabled
          // {...rest}
        />
        <Input
          className="w-10 text-center"
          defaultValue={value}
          placeholder="&mdash;"
          disabled
          // {...rest}
        /> */}
			</div>
		</div>
	)
}
