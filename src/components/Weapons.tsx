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
			regular: '',
			hard: '',
			extreme: '',
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
						<th className='font-normal text-gray-500'>Name</th>
						<th className='font-normal text-gray-500'>Skill</th>
						<th className='w-12 text-center font-normal text-gray-500'>Re</th>
						<th className='w-12 text-center font-normal text-gray-500'>Ha</th>
						<th className='w-12 text-center font-normal text-gray-500'>Ex</th>
						<th>
							<span className='font-normal text-gray-500 hidden md:inline'>
								Damage
							</span>
							<span className='font-normal text-gray-500 inline md:hidden'>
								Dmg
							</span>
						</th>
						<th className='font-normal text-gray-500'>Range</th>
						<th className='font-normal text-gray-500'>Weight</th>
						<th className='w-4'>
							<Button onClick={handleAppend} className='p-1.5 my-1'>
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
								<WeaponSkills index={index} />
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
								<td className='w-4'>
									<Button
										onClick={() => handleRemove(index)}
										className='self-end p-1.5'
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
