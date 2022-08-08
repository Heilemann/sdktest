import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import context from './context'
import VInput from './VInput'

export interface ICombatProps {}

export default function Combat(props: ICombatProps) {
	const { state } = useContext(context)
	const { document } = state
	const { values } = document
	const { register } = useFormContext()

	// if (!register) return null

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
				{...register('damagebonus')}
			/>

			<VInput label='Build' placeholder='—' {...register('build')} />

			<VInput label='Dodge' placeholder='—' {...register('dodge')} />
		</div>
	)
}
