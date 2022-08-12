import Build from './Build'
import DamageBonus from './DamageBonus'
import Dodge from './Dodge'
import HitPoints from './HitPoints'
import Move from './Move'
import Sanity from './Sanity'

export interface ICombatProps {}

export default function Combat(props: ICombatProps) {
	return (
		<div className='grid grid-cols-6 gap-4 lg:gap-2'>
			<HitPoints />
			<Sanity />
			<Build />
			<Move />
			<DamageBonus />
			<Dodge />
		</div>
	)
}
