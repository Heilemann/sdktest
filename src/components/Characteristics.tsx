import { useContext } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import Characteristic from './Characteristic'
import context from './context'

export interface ICharacteristicsProps {
	register: UseFormRegister<FieldValues>
}

export default function Characteristics(props: ICharacteristicsProps) {
	const { register } = props
	const { state } = useContext(context)
	const { document } = state
	const { values } = document

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
