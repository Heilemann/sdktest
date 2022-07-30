import Input from './Input'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { TDocument } from '../interfaces'
import TextArea from './Textarea'

export interface INoteProps {
	message: (message: string, data?: any) => void
	document: TDocument
	documents: TDocument[]
}

export default function Note(props: INoteProps) {
	const { message, document } = props
	const { register, watch } = useForm()

	const mount = () => {
		const subscription = watch(values => {
			const payload = {
				...document,
				values: {
					...document.values,
					...values,
				},
			}

			message('save', payload)
		})

		// unmount
		return () => {
			subscription.unsubscribe()
		}
	}

	useEffect(mount, [document, message, watch])

	return (
		<div className='flex h-full flex-col'>
			<Input
				placeholder='Name...'
				defaultValue={document.values.name}
				{...register('name')}
			/>
			<TextArea
				className='mb-0 flex-1'
				placeholder='Note...'
				defaultValue={document.values.note}
				{...register('note')}
			/>
		</div>
	)
}
