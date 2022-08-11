import { XIcon } from '@heroicons/react/solid'
import { useContext } from 'react'
import { UseFieldArrayRemove, useFormContext, useWatch } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import Button from '../Button'
import WeaponSkills from '../character/WeaponSkills'
import context from '../context'
import Input from '../Input'

export interface IWeaponRowProps {
	index: number
	remove: UseFieldArrayRemove
}

export default function WeaponRow(props: IWeaponRowProps) {
	const { index, remove } = props
	const { state } = useContext(context)
	const { editMode } = state
	const { register } = useFormContext()

	const weapon = useWatch({
		name: `weapons.${index}`,
	}) as any

	const handleRemove = (index: number) => {
		remove(index)
	}

	return (
		<tr key={index} className='border-b border-gray-300 dark:border-gray-800'>
			<td>
				<Input
					className={twMerge(
						'bg-transparent dark:bg-transparent',
						editMode === 'view' && 'hidden',
					)}
					placeholder='Weapon...'
					{...register(`weapons.${index}.name`)}
				/>
				{editMode === 'view' && <span>{weapon.name || '—'}</span>}
			</td>
			<WeaponSkills index={index} />
			<td>
				<Input
					className={twMerge(
						'bg-transparent dark:bg-transparent',
						editMode === 'view' && 'hidden',
					)}
					placeholder='—'
					{...register(`weapons.${index}.damage`)}
				/>
				{editMode === 'view' && <span>{weapon.damage || '—'}</span>}
			</td>
			<td>
				<Input
					className={twMerge(
						'bg-transparent dark:bg-transparent',
						editMode === 'view' && 'hidden',
					)}
					placeholder='—'
					{...register(`weapons.${index}.range`)}
				/>
				{editMode === 'view' && <span>{weapon.range || '—'}</span>}
			</td>
			<td>
				<Input
					className={twMerge(
						'bg-transparent dark:bg-transparent',
						editMode === 'view' && 'hidden',
					)}
					placeholder='—'
					{...register(`weapons.${index}.weight`)}
				/>
				{editMode === 'view' && <span>{weapon.weight || '—'}</span>}
			</td>
			<td className='w-4'>
				<Button onClick={() => handleRemove(index)} className='self-end p-1.5'>
					<XIcon className='h-4 w-4' />
				</Button>
			</td>
		</tr>
	)
}
