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
			<div className='flex flex-col md:flex-row md:space-x-10'>
				<div
					className='m-auto mt-2 mb-4 grid h-20 w-full place-items-center bg-cover md:mb-0 md:h-28 md:w-60'
					style={{
						background:
							'url(' + require('../assets/coclogo.png') + ') no-repeat center',
						backgroundSize: 'contain',
					}}
				/>

				<div className='flex-1 flex-col space-y-2 self-center'>
					<div className='flex space-x-2'>
						<Label className='flex-0 w-32 self-center' htmlFor='name'>
							Name
						</Label>
						<Input
							className='flex-1'
							placeholder='Name...'
							{...register('name')}
						/>
					</div>

					<div className='flex space-x-2'>
						<Label className='flex-0 w-32 self-center' htmlFor='occupation'>
							Occupation
						</Label>
						<Input
							className='flex-1'
							placeholder='Occupation...'
							{...register('occupation')}
						/>
					</div>

					<div className='flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0'>
						<div className='flex space-x-2'>
							<Label className='flex-0 w-32 self-center' htmlFor='gender'>
								Gender
							</Label>
							<Input
								className='flex-1'
								placeholder='Gender...'
								{...register('gender')}
							/>
						</div>

						<div className='flex space-x-2'>
							<Label className='flex-0 w-32 self-center md:w-10' htmlFor='age'>
								Age
							</Label>
							<Input
								className='flex-1'
								placeholder='Age...'
								{...register('age')}
							/>
						</div>
					</div>
				</div>
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
