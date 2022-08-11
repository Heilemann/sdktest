import { forwardRef, useContext } from 'react'
import VInput from '../VInput'
import context from '../context'
import Button from '../Button'

export interface ICharacteristicProps {
	label: string
	value: string
}

const Characteristic = forwardRef<HTMLInputElement, ICharacteristicProps>(
	(props: ICharacteristicProps, ref) => {
		const { label, value, ...rest } = props
		const { state } = useContext(context)

		const handleRoll = () => {
			if (!value) return
			if (!state.messageToApp) return

			state.messageToApp('send message', { message: `/roll d100 < ${value}` })
		}

		if (state.editMode === 'edit') {
			return (
				<VInput
					ref={ref}
					className='mx-1 sm:mx-2'
					label={label}
					placeholder='&mdash;'
					defaultValue={value}
					{...rest}
				/>
			)
		} else {
			return (
				<Button onClick={handleRoll} className='m-1'>
					<div className='flex'>
						<div>{label}</div>
						<div className='flex-1 text-right'>{value ? value : '—'}</div>
					</div>
				</Button>
			)
		}
	},
)

export default Characteristic
