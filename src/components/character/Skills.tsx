import { useContext } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import Button from '../Button'
import context from '../context'
import Input from '../Input'
import Label from '../Label'
import skillList from './skillList'

export interface ISkillsListProps {}

export default function SkillsList(props: ISkillsListProps) {
	const { state } = useContext(context)
	const { document, editMode, messageToApp } = state
	const { register } = useFormContext()

	const skillValues = useWatch({
		name: 'skills',
		defaultValue: document.values.skills || {},
	})

	const handleRoll = (skillName: string, skillValue: string) => {
		if (!messageToApp) return

		messageToApp('send message', {
			message: `/roll d10 < ${skillValue} for ${skillName}`,
		})
	}

	return (
		<div className='-mx-4 grid grid-cols-none sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
			{skillList.map(skill => {
				let value = skill.starting

				if (
					skillValues &&
					skillValues[skill.name] &&
					skillValues[skill.name].value
				) {
					value = skillValues[skill.name].value
				}

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

						<Input
							// type='number'
							className={twMerge(
								'my-1 w-12 appearance-none bg-transparent py-1 pr-0 text-right dark:bg-transparent',
								editMode === 'view' && 'hidden',
							)}
							disabled={state.editMode ? false : true}
							id={skill.name}
							placeholder={skill.starting.toString()}
							{...register(`skills.${skill.name}.value`)}
						/>
						<span className='self-center'>%</span>
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
