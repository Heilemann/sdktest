import { PlusIcon } from '@heroicons/react/solid'
import { FieldValues, useFieldArray, useFormContext } from 'react-hook-form'
import Button from '../Button'
import WeaponRow from './WeaponRow'

// type weaponSkill = 'brawl' | 'handgun' | 'rifle' | 'custom'

export interface IWeaponsProps {}

export default function Weapons(props: IWeaponsProps) {
	const { control } = useFormContext()
	const { fields, prepend, remove } = useFieldArray<FieldValues, any, any>({
		control,
		name: 'weapons',
	})

	const handleAdd = () => {
		prepend({
			name: '',
			skill: 'custom',
			regular: '',
			damage: '',
			range: '',
			weight: '',
		})
	}

	return (
		<div>
			<table className='w-full border-collapse'>
				<thead>
					<tr className='border-b border-gray-300 p-2 text-left dark:border-gray-800'>
						<th className='font-normal text-gray-500'>Name</th>
						<th className='font-normal text-gray-500'>Skill</th>
						<th className='w-12 text-center font-normal text-gray-500'>Reg.</th>
						<th className='w-12 text-center font-normal text-gray-500'>Har.</th>
						<th className='w-12 text-center font-normal text-gray-500'>Exp.</th>
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
							<Button onClick={handleAdd} className='p-1.5 my-1'>
								<PlusIcon className='h-4 w-4' />
							</Button>
						</th>
					</tr>
				</thead>
				<tbody>
					{fields.map((weapon, index) => {
						return <WeaponRow key={index} index={index} remove={remove} />
					})}
				</tbody>
			</table>
		</div>
	)
}
