import { useContext } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import context from './context'
import Input from './Input'
import Label from './Label'
import TextArea from './Textarea'

export interface INoteProps {
	register: UseFormRegister<FieldValues>
}

export default function Note(props: INoteProps) {
	const { state } = useContext(context)
	const { document } = state
	const { values } = document
	const { register } = props

	if (!document?.values) return null

	console.log('note values', document.values)

	return (
		<div className='mx-auto flex h-full flex-col'>
			<Input
				placeholder='Name...'
				defaultValue={values.name}
				{...register('name')}
			/>

			<Label className='mb-1 mt-1' htmlFor='name'></Label>
			<TextArea
				className='m-0 flex-1 resize-none'
				placeholder='Note...'
				defaultValue={document.values.note}
				{...register('note')}
			/>
		</div>
	)
}
