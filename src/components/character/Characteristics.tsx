import { useContext } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import Characteristic from './Characteristic'
import context from '../context'
import Move from './Move'

export interface ICharacteristicsProps {}

export default function Characteristics(props: ICharacteristicsProps) {
	const { state } = useContext(context)
	const { document } = state
	const { values } = document
	const { register } = useFormContext()

	const characteristics = useWatch({ name: 'characteristics' })

	return (
		<div className='-mx-1 grid grid-cols-5 sm:-mx-2 md:grid-cols-10'>
			<Characteristic label='STR' {...register('characteristics.strength')} />
			<Characteristic label='DEX' {...register('characteristics.dexterity')} />
			<Characteristic
				label='INT'
				{...register('characteristics.intelligence')}
			/>
			<Characteristic
				label='CON'
				{...register('characteristics.constitution')}
			/>
			<Characteristic label='APP' {...register('characteristics.appearance')} />
			<Characteristic label='POW' {...register('characteristics.power')} />
			<Characteristic label='SIZ' {...register('characteristics.size')} />
			<Characteristic label='EDU' {...register('characteristics.education')} />
			<Characteristic label='Luck' {...register('luck')} />{' '}
			<Characteristic label='Magic' {...register('magicpoints')} />
		</div>
	)
}
