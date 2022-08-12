import { useFormContext } from 'react-hook-form'
import Build from './Build'
import Characteristic from './Characteristic'
import DamageBonus from './DamageBonus'
import Dodge from './Dodge'
import HitPoints from './HitPoints'
import MagicPoints from './MagicPoints'
import Move from './Move'
import Sanity from './Sanity'

export interface ICharacteristicsProps {}

export default function Characteristics(props: ICharacteristicsProps) {
	const { register } = useFormContext()

	return (
		<div className='grid grid-cols-5 sm:grid-cols-5 flex-1 gap-2 mt-2 grid-flow-dense'>
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
			<Characteristic label='Luck' {...register('luck')} />
			<MagicPoints />

			<Move />
			<Build />
			<DamageBonus />
			<Dodge />
			<HitPoints />
			<Sanity />
		</div>
	)
}
