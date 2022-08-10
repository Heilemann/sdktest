import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import context from './context'
import Input from './Input'
import TextArea from './Textarea'

export interface INoteProps {}

export default function Note(props: INoteProps) {
	const { state } = useContext(context)
	const { document, editMode } = state
	const { values } = document
	const { register } = useFormContext()

	if (!document?.values) return null

	if (editMode === 'view') {
		return (
			<div>
				<div className='mb-4 font-bold'>{values.name}</div>
				<div>{values.note}</div>
			</div>
		)
	} else {
		return (
			<>
				<Input
					className='flex-0 font-bold'
					placeholder='Name...'
					{...register('name')}
				/>
				<TextArea
					className='m-0 mt-2 flex-1 resize-none'
					placeholder='Note...'
					{...register('note')}
				/>
			</>
		)
	}
}
