import { useContext } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import context from './context'
import Input from './Input'

export interface ISkillsListProps {
	register: UseFormRegister<FieldValues>
}

export default function SkillsList(props: ISkillsListProps) {
	const { register } = props
	const { state } = useContext(context)
	const { document } = state
	const { values } = document

	const skills = [
		{
			name: 'Accounting',
			starting: 5,
		},
		{
			name: 'Anthropology',
			starting: 1,
		},
		{
			name: 'Appraise',
			starting: 5,
		},
		{
			name: 'Archaeology',
			starting: 1,
		},
		{
			name: 'Art/Craft',
			starting: 5,
			addable: true,
		},
		{
			name: 'Charm',
			starting: 15,
		},
		{
			name: 'Climb',
			starting: 20,
		},
		{
			name: 'Credit Rating',
			starting: 0,
			tickable: false,
		},
		{
			name: 'Cthulhu Mythos',
			starting: 0,
			tickable: false,
		},
		{
			name: 'Disguise',
			starting: 5,
		},
		{
			name: 'Dodge (Half DEX)',
			starting: 0,
		},
		{
			name: 'Drive Auto',
			starting: 20,
		},
		{
			name: 'Electrical Repair',
			starting: 10,
		},
		{
			name: 'Fast Talk',
			starting: 5,
		},
		{
			name: 'Fighting (Brawl)',
			starting: 25,
			addable: true,
		},
		{
			name: 'Firearms (Handgun)',
			starting: 20,
		},
		{
			name: 'Firearms (Rifle/Shotgun)',
			starting: 25,
		},
		{
			name: 'First Aid',
			starting: 30,
		},
		{
			name: 'History',
			starting: 5,
		},
		{
			name: 'Intimidate',
			starting: 15,
		},
		{
			name: 'Jump',
			starting: 20,
		},
		{
			name: 'Language (Other)',
			starting: 1,
			addable: true,
		},
		{
			name: 'Language (Own)',
			starting: 0,
		},
		{
			name: 'Law',
			starting: 5,
		},
		{
			name: 'Library Use',
			starting: 20,
		},
		{
			name: 'Listen',
			starting: 20,
		},
		{
			name: 'Locksmith',
			starting: 1,
		},
		{
			name: 'Mechanical Repair',
			starting: 10,
		},
		{
			name: 'Medicine',
			starting: 1,
		},
		{
			name: 'Natural World',
			starting: 10,
		},
		{
			name: 'Navigate',
			starting: 10,
		},
		{
			name: 'Occult',
			starting: 5,
		},
		{
			name: 'Operate Heavy Machinery',
			starting: 1,
		},
		{
			name: 'Persuade',
			starting: 10,
		},
		{
			name: 'Pilot',
			starting: 1,
		},
		{
			name: 'Psychology',
			starting: 10,
		},
		{
			name: 'Psychoanalysis',
			starting: 1,
		},
		{
			name: 'Ride',
			starting: 5,
		},
		{
			name: 'Science',
			starting: 1,
			addable: true,
		},
		{
			name: 'Sleight of Hand',
			starting: 10,
		},
		{
			name: 'Spot Hidden',
			starting: 25,
		},
		{
			name: 'Stealth',
			starting: 20,
		},
		{
			name: 'Survival',
			starting: 10,
		},
		{
			name: 'Swim',
			starting: 20,
		},
		{
			name: 'Throw',
			starting: 20,
		},
		{
			name: 'Track',
			starting: 10,
		},
	]

	return (
		<div className='columns-3xs'>
			{skills.map(skill => {
				return (
					<div className='flex space-x-2 py-0.5'>
						{skill.tickable !== false && (
							<input
								type='checkbox'
								className='self-center'
								checked={values[skill.name] > 0}
							/>
						)}
						<span className='flex-1 self-center'>
							{skill.name}
							{/* {skill.addable && <span> (addable)</span>} */}
						</span>
						<div className='rounded-lg bg-gray-100 pr-2'>
							<Input
								className='w-8 py-1 pr-1 text-right'
								defaultValue=''
								placeholder={skill.starting.toString()}
								{...register(skill.name)}
							/>
							%
						</div>
					</div>
				)
			})}
		</div>
	)
}
