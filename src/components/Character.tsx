import Input from './Input'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { TDocument } from '../interfaces'

export interface ICharacterProps {
	message: (message: string, data?: any) => void
	document: TDocument
	documents: TDocument[]
}

export default function Character(props: ICharacterProps) {
	const { message, document } = props
	const { register, watch } = useForm()

	const mount = () => {
		const subscription = watch(values => {
			console.log('values', values)

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
			Character
			<br />
			<Input placeholder='Name...' {...register('name')} />
		</div>
	)
}
