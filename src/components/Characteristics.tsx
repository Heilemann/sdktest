import { useContext } from 'react'
import Characteristic from './Characteristic'
import context from './context'

export interface ICharacteristicsProps {}

export default function Characteristics(props: ICharacteristicsProps) {
	const { state } = useContext(context)
	const { register, document } = state
	const { values } = document

	if (!register) return null

	return (
		<div className='-mx-1 grid grid-cols-5 sm:-mx-2 md:grid-cols-10'>
			<Characteristic
				label='STR'
				value={values.strength}
				{...register('strength')}
			/>
			<Characteristic
				label='DEX'
				value={values.dexterity}
				{...register('dexterity')}
			/>
			<Characteristic
				label='INT'
				value={values.intelligence}
				{...register('intelligence')}
			/>
			<Characteristic
				label='CON'
				value={values.constitution}
				{...register('constitution')}
			/>
			<Characteristic
				label='APP'
				value={values.appearance}
				{...register('appearance')}
			/>
			<Characteristic label='POW' value={values.power} {...register('power')} />
			<Characteristic label='SIZ' value={values.size} {...register('size')} />
			<Characteristic
				label='EDU'
				value={values.education}
				{...register('education')}
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
