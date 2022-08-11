import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import Characteristic from './Characteristic'
import context from '../context'

export interface ICharacteristicsProps {}

export default function Characteristics(props: ICharacteristicsProps) {
	const { state } = useContext(context)
	const { document } = state
	const { values } = document
	const { register } = useFormContext()

	if (!register) return null

	return (
		<div className='-mx-1 grid grid-cols-5 sm:-mx-2 md:grid-cols-10'>
			<Characteristic
				label='STR'
				value={values.characteristics?.strength}
				{...register('characteristics.strength')}
			/>
			<Characteristic
				label='DEX'
				value={values.characteristics?.dexterity}
				{...register('characteristics.dexterity')}
			/>
			<Characteristic
				label='INT'
				value={values.characteristics?.intelligence}
				{...register('characteristics.intelligence')}
			/>
			<Characteristic
				label='CON'
				value={values.characteristics?.constitution}
				{...register('characteristics.constitution')}
			/>
			<Characteristic
				label='APP'
				value={values.characteristics?.appearance}
				{...register('characteristics.appearance')}
			/>
			<Characteristic
				label='POW'
				value={values.characteristics?.power}
				{...register('characteristics.power')}
			/>
			<Characteristic
				label='SIZ'
				value={values.characteristics?.size}
				{...register('characteristics.size')}
			/>
			<Characteristic
				label='EDU'
				value={values.characteristics?.education}
				{...register('characteristics.education')}
			/>
			<Characteristic label='Luck' value={values.luck} {...register('luck')} />{' '}
			<Characteristic
				label='Magic'
				value={values.magicpoints}
				{...register('magicpoints')}
			/>
		</div>
	)
}
