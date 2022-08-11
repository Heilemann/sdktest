import { useContext } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import Button from '../Button'
import context from '../context'
import VInput from '../VInput'
import Dodge from './Dodge'

export interface ICombatProps {}

export default function Combat(props: ICombatProps) {
	const { state } = useContext(context)
	const { document, editMode } = state
	const { values } = document
	const { register } = useFormContext()

	const damagebonus = useWatch({
		name: 'damagebonus',
	}) as string

	return (
		<div className='flex space-x-2'>
			<VInput
				label='Max Hit Points'
				placeholder='—'
				defaultValue={values.maxhitpoints}
				{...register('maxhitpoints')}
			/>

			<VInput
				label='Current Hit Points'
				placeholder='—'
				defaultValue={values.currenthitpoints}
				{...register('currenthitpoints')}
			/>

			<VInput
				label='Damage Bonus'
				placeholder='—'
				defaultValue={values.damagebonus}
				className={twMerge(editMode === 'view' && 'hidden')}
				{...register('damagebonus')}
			/>
			{editMode === 'view' && (
				<div>
					<Button onClick={() => {}}>
						Damage Bonus
						<br />
						{damagebonus}
					</Button>
				</div>
			)}

			<VInput label='Build' placeholder='—' {...register('build')} />

			<Dodge />
		</div>
	)
}
