import { PlusIcon, XIcon } from '@heroicons/react/solid'
import { useContext } from 'react'
import { FieldValues, useFieldArray, useFormContext } from 'react-hook-form'
import Button from './Button'
import context from './context'
import Input from './Input'
import WeaponSkills from './WeaponSkills'

// type weaponSkill = 'brawl' | 'handgun' | 'rifle' | 'custom'

export interface IWeaponsProps {}

export default function Weapons(props: IWeaponsProps) {
	const { state } = useContext(context)
	const { editMode } = state
	const { register, control } = useFormContext()
	const { fields, prepend, remove } = useFieldArray<FieldValues, any, any>({
		control,
		name: 'weapons',
	})

	const handleAppend = () => {
		prepend({
			name: '',
			skill: 'custom',
			regular: '0',
			hard: '0',
			extreme: '0',
			damage: '',
			range: '',
			weight: '',
		})
	}

	const handleRemove = (index: number) => {
		remove(index)
	}

	return (
		<div>
			<table className='w-full border-collapse'>
				<thead>
					<tr className='border-b border-gray-300 p-2 text-left dark:border-gray-800'>
						<th>Name</th>
						{editMode === 'edit' && <th>Skill</th>}
						<th className='w-12 text-center'>Re</th>
						<th className='w-12 text-center'>Ha</th>
						<th className='w-12 text-center'>Ex</th>
						<th>
							<span className='hidden md:inline'>Damage</span>
							<span className='inline md:hidden'>Dmg</span>
						</th>
						<th>Range</th>
						<th>Weight</th>
						<th className='w-4'>
							<Button onClick={handleAppend} className='px-2'>
								<PlusIcon className='h-4 w-4' />
							</Button>
						</th>
					</tr>
				</thead>
				<tbody>
					{fields.map((weapon, index) => {
						return (
							<tr
								key={index}
								className='border-b border-gray-300 dark:border-gray-800'
							>
								<td>
									{editMode === 'edit' ? (
										<Input
											className='bg-transparent dark:bg-transparent'
											placeholder='Weapon...'
											{...register(`weapons.${index}.name`)}
										/>
									) : (
										<span>{weapon.name}</span>
									)}
								</td>
								<WeaponSkills index={index} weapon={weapon} />
								<td>
									<Input
										className='bg-transparent dark:bg-transparent'
										placeholder='—'
										{...register(`weapons.${index}.damage`)}
									/>
								</td>
								<td>
									<Input
										className='bg-transparent dark:bg-transparent'
										placeholder='—'
										{...register(`weapons.${index}.range`)}
									/>
								</td>
								<td>
									<Input
										className='bg-transparent dark:bg-transparent'
										placeholder='—'
										{...register(`weapons.${index}.weight`)}
									/>
								</td>
								<td className='w-4 bg-red-200'>
									<Button
										onClick={() => handleRemove(index)}
										className='self-end px-2'
									>
										<XIcon className='h-4 w-4' />
									</Button>
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}
