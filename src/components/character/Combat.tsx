import Build from './Build'
import DamageBonus from './DamageBonus'
import Dodge from './Dodge'
import HitPoints from './HitPoints'
import Move from './Move'

export interface ICombatProps {}

export default function Combat(props: ICombatProps) {
	return (
		<div className='flex space-x-4'>
			<HitPoints />
			<DamageBonus />
			<Build />
			<Dodge />
			<Move />
		</div>
	)
}
