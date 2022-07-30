import { useContext } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import context from './context'
import Input from './Input'
import TextArea from './Textarea'

export interface INoteProps {
	register: UseFormRegister<FieldValues>
}

export default function Note(props: INoteProps) {
	const { state } = useContext(context)
	const { document } = state
	const { register } = props

	if (!document?.values) return null

	console.log('note values', document.values)

	return (
		<div className='flex h-full flex-col'>
			<Input
				placeholder='Name...'
				defaultValue={document.values.name}
				{...register('name')}
			/>
			<TextArea
				className='mb-0 flex-1 resize-none'
				placeholder='Note...'
				defaultValue={document.values.note}
				{...register('note')}
			/>
		</div>
	)
}
