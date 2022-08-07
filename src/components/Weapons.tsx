import { useContext } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import Button from './Button'
import context from './context'
import Input from './Input'
import { PlusIcon, XIcon } from '@heroicons/react/solid'

export interface IWeaponsProps {}

export default function Weapons(props: IWeaponsProps) {
	const { state } = useContext(context)
	const { document, editMode } = state
	const { values } = document
	const { register, control } = useFormContext()
	const { fields, prepend, remove } = useFieldArray({
		control,
		name: 'weapons',
	})

	const handleAppend = () => {
		prepend({
			name: '',
			damage: '',
			range: '',
			weight: '',
			cost: '',
		})
	}

	const handleRemove = (index: number) => {
		remove(index)
	}

	return (
		<div>
			<table className='w-full border-collapse'>
				<thead>
					<tr>
						<th className='border-b border-gray-300 p-2 text-left dark:border-gray-800'>
							Name
						</th>
						<th className='border-b border-gray-300 p-2 text-left dark:border-gray-800'>
							Skill
						</th>
						<th className='w-16 border-b border-gray-300 p-2 text-left dark:border-gray-800'>
							Re
						</th>
						<th className='w-16 border-b border-gray-300 p-2 text-left dark:border-gray-800'>
							Ha
						</th>
						<th className='w-16 border-b border-gray-300 p-2 text-left dark:border-gray-800'>
							Ex
						</th>
						<th className='border-b border-gray-300 p-2 text-left dark:border-gray-800'>
							Damage
						</th>
						<th className='border-b border-gray-300 p-2 text-left dark:border-gray-800'>
							Range
						</th>
						<th className='border-b border-gray-300 p-2 text-left dark:border-gray-800'>
							Weight
						</th>
						<th className='border-b border-gray-300 p-2 text-left dark:border-gray-800'>
							Cost
						</th>
						<th className='border-b border-gray-300 text-left  dark:border-gray-800'>
							<Button onClick={handleAppend} className='px-2'>
								<PlusIcon className='h-4 w-4' />
							</Button>
						</th>
					</tr>
				</thead>
				<tbody>
					{fields.map((weapon, index) => {
						const skill = {
							brawl: values.skills['Fighting (Brawl)'],
							handgun: values.skills['Firearms (Handgun)'],
							rifle: values.skills['Firearms (Rifle/Shotgun)'],
							custom: '0',
						}

						console.log(skill)

						// @ts-ignore
						// eslint-disable-next-line react/no-array-index-key
						const skillName = weapon.skill as
							| 'brawl'
							| 'handgun'
							| 'rifle'
							| 'custom'

						const regularSkill = skill[skillName].value.toString()
						const hardSkill = Math.floor(parseInt(regularSkill) / 2).toString()
						const extremeSkill = Math.floor(
							parseInt(regularSkill) / 5,
						).toString()

						return (
							<tr key={index}>
								<td className='border-b border-gray-300 dark:border-gray-800'>
									<Input
										placeholder='Weapon...'
										{...register(`weapons.${index}.name`)}
									/>
								</td>
								<td className='border-b border-gray-300 dark:border-gray-800'>
									<select
										{...register(`weapons.${index}.skill`)}
										className='text-black'
									>
										<option value='brawl'>Brawl</option>
										<option value='handgun'>Handgun</option>
										<option value='rifle'>Rifle/Shotgun</option>
										<option value='custom'>Custom</option>
									</select>{' '}
								</td>
								<td className='border-b border-gray-300 dark:border-gray-800'>
									<Input
										placeholder={regularSkill ? regularSkill : '—'}
										{...register(`weapons.${index}.regular`)}
									/>
								</td>
								<td className='border-b border-gray-300 dark:border-gray-800'>
									<Input
										placeholder={regularSkill ? hardSkill : '—'}
										{...register(`weapons.${index}.hard`)}
									/>
								</td>
								<td className='border-b border-gray-300 dark:border-gray-800'>
									<Input
										placeholder={regularSkill ? extremeSkill : '—'}
										{...register(`weapons.${index}.expwer`)}
									/>
								</td>
								<td className='border-b border-gray-300 dark:border-gray-800'>
									<Input
										placeholder='Damage...'
										{...register(`weapons.${index}.damage`)}
									/>
								</td>
								<td className='border-b border-gray-300 dark:border-gray-800'>
									<Input
										placeholder='Range...'
										{...register(`weapons.${index}.range`)}
									/>
								</td>
								<td className='border-b border-gray-300 dark:border-gray-800'>
									<Input
										placeholder='Weight...'
										{...register(`weapons.${index}.weight`)}
									/>
								</td>
								<td className='border-b border-gray-300 dark:border-gray-800'>
									<Input
										placeholder='Cost...'
										{...register(`weapons.${index}.cost`)}
									/>
								</td>
								<td className='w-4 border-b border-gray-300 dark:border-gray-800'>
									<Button onClick={() => handleRemove(index)} className='px-2'>
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
