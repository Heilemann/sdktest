import { forwardRef, useContext } from 'react'
import VInput from '../VInput'
import context from '../context'
import Button from '../Button'
import { twMerge } from 'tailwind-merge'

export interface ICharacteristicProps {
	label: string
	value: string
}

const Characteristic = forwardRef<HTMLInputElement, ICharacteristicProps>(
	(props: ICharacteristicProps, ref) => {
		const { label, value, ...rest } = props
		const { state } = useContext(context)
		const { editMode } = state

		const handleRoll = () => {
			if (!value) return
			if (!state.messageToApp) return

			state.messageToApp('send message', { message: `/roll d100 < ${value}` })
		}

		return (
			<>
				<VInput
					ref={ref}
					className={twMerge('mx-1 sm:mx-2', editMode === 'view' && 'hidden')}
					label={label}
					placeholder='&mdash;'
					defaultValue={value}
					{...rest}
				/>

				{editMode === 'view' && (
					<Button onClick={handleRoll} className='m-1'>
						<div className='flex flex-col text-xs font-bold'>
							<div>{label}</div>
							<div className='flex-1'>{value ? value + '%' : '—'}</div>
						</div>
					</Button>
				)}
			</>
		)
	},
)

export default Characteristic
