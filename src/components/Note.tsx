import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import context from './context'
import Input from './Input'
import Label from './Label'
import TextArea from './Textarea'

export interface INoteProps {}

export default function Note(props: INoteProps) {
	const { state } = useContext(context)
	const { document } = state
	const { values } = document
	const { register } = useFormContext()

	// if (!register) return null
	if (!document?.values) return null

	return (
		<div className='mx-auto flex h-full w-full flex-1 flex-col bg-red-500'>
			<Input
				placeholder='Name...'
				defaultValue={values.name}
				{...register('name')}
			/>
			<Label className='mb-1 mt-1' htmlFor='name'></Label>
			<TextArea
				className='m-0 flex-1 resize-none'
				placeholder='Note...'
				defaultValue={values.note}
				{...register('note')}
			/>
		</div>
	)
}
