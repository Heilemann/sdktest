import { useContext } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import context from './context'
import HInput from './HInput'

export interface IBasicInfoProps {
	register: UseFormRegister<FieldValues>
}

export default function BasicInfo(props: IBasicInfoProps) {
	const { register } = props
	const { state } = useContext(context)
	const { document } = state
	const { values } = document

	return (
		<div className='space-y-2'>
			<HInput
				label='Name'
				placeholder='Name...'
				defaultValue={values.name}
				{...register('name')}
			/>

			<HInput
				label='Occupation'
				placeholder='Occupation...'
				defaultValue={values.occupation}
				{...register('occupation')}
			/>

			<div className='flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0'>
				<HInput
					label='Residence'
					placeholder='Residence...'
					defaultValue={values.residence}
					{...register('residence')}
				/>

				<HInput
					label='Birthplace'
					placeholder='Birthplace...'
					defaultValue={values.birthplace}
					{...register('birthplace')}
				/>
			</div>

			<div className='flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0'>
				<HInput
					label='Gender'
					placeholder='Gender...'
					defaultValue={values.gender}
					{...register('gender')}
				/>

				<HInput
					label='Age'
					placeholder='Age...'
					defaultValue={values.age}
					{...register('age')}
				/>
			</div>
		</div>
	)
}
