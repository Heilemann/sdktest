import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import context from './context'
import Input from './Input'
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
		<>
			<Input
				className='flex-0'
				placeholder='Name...'
				defaultValue={values.name}
				{...register('name')}
			/>
			<TextArea
				className='m-0 mt-2 flex-1 resize-none'
				placeholder='Note...'
				defaultValue={values.note}
				{...register('note')}
			/>
		</>
	)
}
