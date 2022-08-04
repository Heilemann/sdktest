import { useContext } from 'react'
import context from './context'
import VInput from './VInput'

export interface ICombatProps {}

export default function Combat(props: ICombatProps) {
	const { state } = useContext(context)
	const { register, document } = state
	const { values } = document

	if (!register) return null

	return (
		<div className='flex space-x-2'>
			<VInput
				label='Max Hit Points'
				placeholder='Max...'
				defaultValue={values.maxhitpoints}
				{...register('maxhitpoints')}
			/>

			<VInput
				label='Current Hit Points'
				placeholder='Current...'
				defaultValue={values.currenthitpoints}
				{...register('currenthitpoints')}
			/>

			<VInput
				label='Damage Bonus'
				placeholder='Damage Bonus...'
				defaultValue={values.damagebonus}
				{...register('damagebonus')}
			/>

			<VInput label='Build' placeholder='Build...' {...register('build')} />

			<VInput label='Dodge' placeholder='Dodge...' {...register('dodge')} />
		</div>
	)
}
