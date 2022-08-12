import { forwardRef, useContext } from 'react'
import VInput from '../VInput'
import context from '../context'
import Button from '../Button'
import { twMerge } from 'tailwind-merge'
import { useWatch } from 'react-hook-form'

export interface ICharacteristicProps {
	label: string
	name: string
}

const Characteristic = forwardRef<HTMLInputElement, ICharacteristicProps>(
	(props: ICharacteristicProps, ref) => {
		const { label, name, ...rest } = props
		const { state } = useContext(context)
		const { editMode, messageToApp } = state

		const value = useWatch({ name: name })
		const hasNoValue = value === undefined || value === null

		const hard = Math.floor(parseInt(value, 10) / 2)
		const extreme = Math.floor(parseInt(value, 10) / 5)

		const handleRoll = (val: string | number) => {
			messageToApp &&
				messageToApp('send message', { message: `/roll d100 < ${val}` })
		}

		return (
			<>
				<VInput
					ref={ref}
					className={twMerge('', editMode === 'view' && 'hidden')}
					label={label}
					placeholder='&mdash;'
					name={name}
					{...rest}
				/>

				{editMode === 'view' && (
					<div className='flex flex-col text-xs'>
						<div className='text-center font-bold'>{label}</div>
						<div className='flex'>
							<Button
								onClick={() => handleRoll(value)}
								className='m-0.5 px-2'
								disabled={hasNoValue}
							>
								<div className='flex-1'>{value ? value + '%' : '—'}</div>
							</Button>

							<div className='flex-col'>
								<Button
									onClick={() => handleRoll(hard)}
									className='m-0.5 px-2'
									disabled={hasNoValue}
								>
									<div className='flex-1'>{hard ? hard + '%' : '—'}</div>
								</Button>

								<Button
									onClick={() => handleRoll(extreme)}
									className='m-0.5 px-2'
									disabled={hasNoValue}
								>
									<div className='flex-1'>{extreme ? extreme + '%' : '—'}</div>
								</Button>
							</div>
						</div>
					</div>
				)}
			</>
		)
	},
)

export default Characteristic
