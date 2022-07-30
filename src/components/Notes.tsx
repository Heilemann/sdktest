import Input from './Input'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { TDocument } from '../interfaces'

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
		<div>
			Note
			<br />
			<Input placeholder='Name...' {...register('name')} />
			<textarea placeholder='Note...' {...register('note')} />
		</div>
	)
}
