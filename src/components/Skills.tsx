import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import Button from './Button'
import context from './context'
import Input from './Input'
import Label from './Label'
import skillList from './skillList'

export interface ISkillsListProps {}

export default function SkillsList(props: ISkillsListProps) {
	const { state } = useContext(context)
	const { document, editMode, messageToApp } = state
	const { values } = document
	const { skills } = values
	const { register } = useFormContext()

	const handleRoll = (skillName: string, skillValue: string) => {
		if (!messageToApp) return

		messageToApp('send message', {
			message: `/roll d10 < ${skillValue} for ${skillName}`,
		})
	}

	console.log('skills', skills)

	return (
		<div className='-mx-4 grid grid-cols-none sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
			{skillList.map(skill => {
				let value = skill.starting
				if (skills && skills[skill.name] && skills[skill.name].value) {
					value = skills[skill.name].value
				}

				console.log('skill:', skill, value)

				return (
					<div
						key={skill.name}
						className='mx-4 flex space-x-2 border-b border-gray-200 py-0.5 dark:border-gray-800'
					>
						<input
							type='checkbox'
							className={twMerge(
								'h-4 w-4 cursor-pointer appearance-none self-center rounded-md bg-gray-200 hover:bg-gray-700 dark:bg-gray-800',
								skill.tickable === false && 'opacity-0',
							)}
							{...register(`skills.${skill.name}.ticked`)}
						/>

						<Label className='flex-1 self-center' htmlFor={skill.name}>
							{skill.name}
							{/* {skill.addable && <span> (addable)</span>} */}
						</Label>

						{editMode === 'edit' && (
							<>
								<Input
									// type='number'
									className='my-1 w-12 appearance-none bg-transparent py-1 pr-0 text-right dark:bg-transparent'
									disabled={state.editMode ? false : true}
									id={skill.name}
									placeholder={skill.starting.toString()}
									{...register(`skills.${skill.name}.value`)}
								/>
								<span className='self-center'>%</span>
							</>
						)}
						{editMode === 'view' && (
							<Button
								className='w-14 px-2'
								onClick={() => handleRoll(skill.name, value)}
							>
								{value}%
							</Button>
						)}
					</div>
				)
			})}
		</div>
	)
}
