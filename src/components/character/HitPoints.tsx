import { useFormContext, useWatch } from 'react-hook-form'
import Input from '../Input'
import Label from '../Label'

export interface IHitPointsProps {}

export default function HitPoints(props: IHitPointsProps) {
	const { register } = useFormContext()

	const siz = useWatch({ name: 'characteristics.size', defaultValue: 0 })
	const con = useWatch({
		name: 'characteristics.constitution',
		defaultValue: 0,
	})

	const maxHp = Math.floor(
		(parseInt(con, 10) + parseInt(siz, 10)) / 10,
	).toString()

	return (
		<div className='flex flex-col border-b flex-1'>
			<Label className='text-gray-500 text-center'>Hitpoints</Label>

			<div className='flex'>
				<Input
					className='text-right bg-transparent hover:bg-gray-200 focus:bg-gray-200'
					placeholder={'—'}
					{...register('currenthitpoints')}
				/>

				<span className='self-center mx-1'>of</span>

				<Input
					className='bg-transparent hover:bg-gray-200 focus:bg-gray-200'
					placeholder={maxHp || '—'}
					{...register('maxhitpoints')}
				/>
			</div>
		</div>
	)
}
