import { useContext } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import Input from './Input'
import context from './context'
import Button from './Button'

export interface IWeaponSkillsProps {
	index: number
	weapon: any
}

export default function WeaponSkills(props: IWeaponSkillsProps) {
	const { index, weapon } = props
	const { register, control } = useFormContext()
	const { state } = useContext(context)
	const { document, editMode } = state
	const { values } = document
	const { skills } = values

	// force re-render when skill changes
	const weaponSkill = useWatch({
		control,
		name: `weapons.${index}.skill`,
	})

	// get default skill values
	const skillValues = {
		brawl: skills['Fighting (Brawl)'].value,
		handgun: skills['Firearms (Handgun)'].value,
		rifle: skills['Firearms (Rifle/Shotgun)'].value,
	}

	const isCustom = weaponSkill === 'custom' || !weaponSkill

	console.log('weaponSkill', weaponSkill)

	// @ts-ignore
	const regularSkill = isCustom ? 0 : skillValues[weaponSkill].toString()
	const hardSkill = isCustom
		? '0'
		: Math.floor(parseInt(regularSkill) / 2).toString()
	const extremeSkill = isCustom
		? '0'
		: Math.floor(parseInt(regularSkill) / 5).toString()

	const handleSkillClick = (skill: string) => {}

	return (
		<>
			{editMode === 'edit' && (
				<td>
					<select
						className='text-black'
						{...register(`weapons.${index}.skill`)}
					>
						<option value='brawl'>Brawl</option>
						<option value='handgun'>Handgun</option>
						<option value='rifle'>Rifle/Shotgun</option>
						<option value='custom'>Custom</option>
					</select>
				</td>
			)}
			<td>
				{editMode === 'edit' ? (
					<Input
						className='bg-transparent text-center dark:bg-transparent'
						placeholder={regularSkill ? regularSkill : '—'}
						{...register(`weapons.${index}.regular`)}
					/>
				) : (
					<Button
						className='w-12 px-1 py-1 text-center'
						onClick={() => handleSkillClick(regularSkill)}
					>
						{regularSkill ? regularSkill : '—'}%
					</Button>
				)}
			</td>
			<td>
				{editMode === 'edit' ? (
					<Input
						className='bg-transparent text-center dark:bg-transparent'
						placeholder={hardSkill ? hardSkill : '—'}
						{...register(`weapons.${index}.hard`)}
					/>
				) : (
					<Button
						className='w-12 px-1 py-1 text-center'
						onClick={() => handleSkillClick(hardSkill)}
					>
						{hardSkill ? hardSkill : '—'}%
					</Button>
				)}
			</td>
			<td>
				{editMode === 'edit' ? (
					<Input
						className='bg-transparent text-center dark:bg-transparent'
						placeholder={extremeSkill ? extremeSkill : '—'}
						{...register(`weapons.${index}.extreme`)}
					/>
				) : (
					<Button
						className='w-12 px-1 py-1 text-center'
						onClick={() => handleSkillClick(extremeSkill)}
					>
						{extremeSkill ? extremeSkill : '—'}%
					</Button>
				)}
			</td>
		</>
	)
}
