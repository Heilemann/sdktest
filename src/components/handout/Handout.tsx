import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import Asset from '../Asset'
import context from '../context'
import Input from '../Input'
import TextArea from '../Textarea'

export interface IHandoutProps {}

export default function Handout(props: IHandoutProps) {
	const { state } = useContext(context)
	const { document, editMode } = state
	const { values } = document
	const { register } = useFormContext()

	if (!document?.values) return null

	return (
		<div>
			{editMode === 'view' && (
				<div>
					<div className='mb-4 font-bold'>{values.name}</div>
					<div>{values.note}</div>
				</div>
			)}

			<Input
				className={twMerge(
					'flex-0 font-bold mb-2',
					editMode === 'view' && 'hidden',
				)}
				placeholder='Name...'
				{...register('name')}
			/>

			<Asset name='image' addLabel='Add Media' />

			<TextArea
				className={twMerge(
					'm-0 mt-2 flex-1 resize-none',
					editMode === 'view' && 'hidden',
				)}
				placeholder='Note...'
				{...register('note')}
			/>
		</div>
	)
}
