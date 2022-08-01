import { useContext } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import Characteristic from './Characteristic'
import context from './context'
import Input from './Input'
import Label from './Label'
import SectionDivider from './SectionDivider'
// import logo from "../assets/coclogo.png";

export interface ICharacterProps {
	register: UseFormRegister<FieldValues>
}

export default function Character(props: ICharacterProps) {
	const { register } = props
	const { state } = useContext(context)
	const { document } = state
	const { values } = document

	return (
		<div className='space-y-2'>
			<img
				src={require('../assets/coclogo.png')}
				alt='Call of Cthulhu Logo'
				className='m-auto mt-2 mb-6 max-w-xs'
			/>

			<div className='flex space-x-2'>
				<Label className='w-32 self-center' htmlFor='name'>
					Name
				</Label>
				<Input placeholder='Name...' {...register('name')} />
			</div>
			<div className='flex space-x-2'>
				<Label className='w-32 self-center' htmlFor='occupation'>
					Occupation
				</Label>
				<Input placeholder='Occupation...' {...register('occupation')} />
			</div>
			<SectionDivider>Abilities</SectionDivider>
			<div className='flex space-x-2'>
				<div className='space-y-1'>
					<Characteristic
						label='STR'
						value={values.strength}
						{...register('strength')}
					/>
					<Characteristic
						label='APP'
						value={values.appearance}
						{...register('appearance')}
					/>
					<Characteristic
						label='CON'
						value={values.constitution}
						{...register('constitution')}
					/>
					<Characteristic
						label='INT'
						value={values.intelligence}
						{...register('intelligence')}
					/>
				</div>

				<div className='space-y-1'>
					<Characteristic
						label='SIZ'
						value={values.size}
						{...register('size')}
					/>
					<Characteristic
						label='POW'
						value={values.power}
						{...register('power')}
					/>
					<Characteristic
						label='DEX'
						value={values.dexterity}
						{...register('dexterity')}
					/>
					<Characteristic
						label='EDU'
						value={values.education}
						{...register('education')}
					/>
				</div>
			</div>
			<SectionDivider>Skills</SectionDivider>
		</div>
	)
}
