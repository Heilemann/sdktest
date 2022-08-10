import { useContext } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import Input from './Input'
import context from './context'
import Button from './Button'
import skillList from './skillList'
import { twMerge } from 'tailwind-merge'

export interface IWeaponSkillsProps {
	index: number
}

type TWeaponSkill = 'brawl' | 'handgun' | 'rifle' | 'custom'

export default function WeaponSkills(props: IWeaponSkillsProps) {
	const { index } = props
	const { register, control } = useFormContext()
	const { state } = useContext(context)
	const { editMode, messageToApp } = state
	const list = skillList

	// force re-render when skill changes
	const weaponSkill: TWeaponSkill = useWatch({
		control,
		name: `weapons.${index}.skill`,
		defaultValue: 'custom',
	})

	// skill values
	let brawlSkill = useWatch({
		control,
		name: `skills.${'Fighting (Brawl)'}.value`,
		defaultValue: '',
	}) as string

	let handgunSkill = useWatch({
		control,
		name: `skills.${'Firearms (Handgun)'}.value`,
		defaultValue: '',
	}) as string

	let rifleSkill = useWatch({
		control,
		name: `skills.${'Firearms (Rifle/Shotgun)'}.value`,
		defaultValue: '',
	}) as string

	// weapon skill values
	const regular = useWatch({
		control,
		name: `weapons.${index}.regular`,
		defaultValue: '',
	}) as string

	// get default skill values
	const skillValues = {
		brawl: brawlSkill.length
			? brawlSkill
			: list.find(s => s.name === 'Fighting (Brawl)')!.starting,
		handgun: handgunSkill.length
			? handgunSkill
			: list.find(s => s.name === 'Firearms (Handgun)')!.starting,
		rifle: rifleSkill.length
			? rifleSkill
			: list.find(s => s.name === 'Firearms (Rifle/Shotgun)')!.starting,
		custom: '0',
	} as { [key in TWeaponSkill]: string }

	const regularSkill = regular.length
		? regular
		: skillValues[weaponSkill].toString()
	const hardSkill = Math.floor(parseInt(regularSkill) / 2).toString()
	const extremeSkill = Math.floor(parseInt(regularSkill) / 5).toString()

	console.log(skillValues, regular, regularSkill, hardSkill, extremeSkill)

	const handleSkillClick = (skill: string) => {
		messageToApp &&
			messageToApp('send message', {
				message: `/roll d10 < ${skill}`,
			})
	}

	return (
		<>
			<td className={editMode === 'view' ? 'hidden' : ''}>
				<select className='text-black' {...register(`weapons.${index}.skill`)}>
					<option value='brawl'>Brawl</option>
					<option value='handgun'>Handgun</option>
					<option value='rifle'>Rifle/Shotgun</option>
					<option value='custom'>Custom</option>
				</select>
			</td>
			<td>
				<Input
					className={twMerge(
						'bg-transparent text-center dark:bg-transparent',
						editMode === 'view' && 'hidden',
					)}
					placeholder={regularSkill ? regularSkill : '—'}
					{...register(`weapons.${index}.regular`)}
				/>

				{/* {editMode === 'view' && ( */}
				<Button
					className='w-12 px-1 py-1 text-center'
					onClick={() =>
						handleSkillClick(regular.length ? regular : regularSkill)
					}
				>
					{regularSkill ? regularSkill : '—'}%
				</Button>
				{/* )} */}
			</td>
			<td>
				{/* {editMode === 'view' && ( */}
				<Button
					className='w-12 px-1 py-1 text-center'
					onClick={() => handleSkillClick(hardSkill)}
				>
					{hardSkill ? hardSkill : '—'}%
				</Button>
				{/* )} */}
			</td>
			<td>
				{/* {editMode === 'view' && ( */}
				<Button
					className='w-12 px-1 py-1 text-center'
					onClick={() => handleSkillClick(extremeSkill)}
				>
					{extremeSkill ? extremeSkill : '—'}%
				</Button>
				{/* )} */}
			</td>
		</>
	)
}
