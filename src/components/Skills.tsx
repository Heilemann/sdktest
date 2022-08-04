import { useContext } from 'react'
import { twMerge } from 'tailwind-merge'
import context from './context'
import Input from './Input'
import Label from './Label'

export interface ISkillsListProps {}

export default function SkillsList(props: ISkillsListProps) {
	const { state } = useContext(context)
	const { register } = state
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

	if (!register) return null

	return (
		<div className='-mx-4 grid grid-cols-none sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
			{skills.map(skill => {
				return (
					<div
						key={skill.name}
						className='mx-4 flex space-x-2 border-b border-gray-800 py-0.5'
					>
						<input
							type='checkbox'
							className={twMerge(
								'h-4 w-4 cursor-pointer appearance-none self-center rounded-md bg-gray-800 hover:bg-gray-700',
								skill.tickable === false && 'opacity-0',
							)}
							defaultChecked={values.skills?.[skill.name] > 0}
							{...register(`skills.${skill.name}.ticked`)}
						/>

						<Label className='flex-1 self-center' htmlFor={skill.name}>
							{skill.name}
							{/* {skill.addable && <span> (addable)</span>} */}
						</Label>

						<Input
							// type='number'
							className='my-1 w-12 appearance-none bg-transparent py-1 pr-0 text-right dark:bg-transparent'
							// defaultValue={values.skills[skill.name].value}
							disabled={state.editMode ? false : true}
							id={skill.name}
							placeholder={skill.starting.toString()}
							{...register(`skills.${skill.name}.value`)}
						/>
						<span className='self-center'>%</span>
					</div>
				)
			})}
		</div>
	)
}
