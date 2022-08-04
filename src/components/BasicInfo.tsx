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
		<div className='grid grid-cols-2 lg:grid-cols-3'>
			<HInput
				className='mx-2'
				label='Name'
				placeholder='Name...'
				defaultValue={values.name}
				{...register('name')}
			/>

			<HInput
				className='mx-2'
				label='Occupation'
				placeholder='Occupation...'
				defaultValue={values.occupation}
				{...register('occupation')}
			/>

			<HInput
				className='mx-2'
				label='Residence'
				placeholder='Residence...'
				defaultValue={values.residence}
				{...register('residence')}
			/>

			<HInput
				className='mx-2'
				label='Birthplace'
				placeholder='Birthplace...'
				defaultValue={values.birthplace}
				{...register('birthplace')}
			/>

			<HInput
				className='mx-2'
				label='Gender'
				placeholder='Gender...'
				defaultValue={values.gender}
				{...register('gender')}
			/>

			<HInput
				className='mx-2'
				label='Age'
				placeholder='Age...'
				defaultValue={values.age}
				{...register('age')}
			/>
		</div>
	)
}
