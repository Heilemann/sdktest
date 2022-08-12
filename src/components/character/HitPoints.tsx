import { useContext } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import context from '../context'
import VInput from '../VInput'

export interface IHitPointsProps {}

export default function HitPoints(props: IHitPointsProps) {
	const { state } = useContext(context)
	const { document, editMode } = state
	const { values } = document
	const { register } = useFormContext()

	const con = useWatch({
		name: 'characteristics.constitution',
		defaultValue: 0,
	})
	const siz = useWatch({ name: 'characteristics.size', defaultValue: 0 })

	const maxHp = Math.floor(
		(parseInt(con, 10) + parseInt(siz, 10)) / 10,
	).toString()

	return (
		<>
			<VInput
				label='Max Hit Points'
				placeholder={maxHp || '—'}
				defaultValue={values.maxhitpoints}
				{...register('maxhitpoints')}
			/>

			<VInput
				label='Current Hit Points'
				placeholder='—'
				defaultValue={values.currenthitpoints}
				{...register('currenthitpoints')}
			/>
		</>
	)
}
