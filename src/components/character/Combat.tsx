import Build from './Build'
import DamageBonus from './DamageBonus'
import Dodge from './Dodge'
import HitPoints from './HitPoints'
import Move from './Move'

export interface ICombatProps {}

export default function Combat(props: ICombatProps) {
	return (
		<div className='grid grid-cols-5 gap-4'>
			<HitPoints />
			<Build />
			<DamageBonus />
			<Dodge />
			<Move />
		</div>
	)
}
