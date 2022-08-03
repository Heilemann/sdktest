import * as React from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import VInput from './VInput'

export interface ICombatProps {
	register: UseFormRegister<FieldValues>
}

export default function Combat(props: ICombatProps) {
	return (
		<div className='flex space-x-2'>
			<VInput
				label='Max Hit Points'
				placeholder='Max...'
				{...props.register('maxhitpoints')}
			/>

			<VInput
				label='Current Hit Points'
				placeholder='Current...'
				{...props.register('currenthitpoints')}
			/>

			<VInput
				label='Damage Bonus'
				placeholder='Damage Bonus...'
				{...props.register('damagebonus')}
			/>

			<VInput
				label='Build'
				placeholder='Build...'
				{...props.register('build')}
			/>

			<VInput
				label='Dodge'
				placeholder='Dodge...'
				{...props.register('dodge')}
			/>
		</div>
	)
}
