import { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { TDocument } from '../interfaces'
import Character from './Character'
import context from './context'
import Note from './Note'
import Scene from './Scene'

export interface IDocumentProps {}

export default function Document(props: IDocumentProps) {
	const { state, dispatch } = useContext(context)
	const { document } = state
	const { type } = document
	const { register, setValue, watch } = useForm()

	useEffect(() => {
		console.log('system state', state)
	}, [state])

	const message = (message: string, data?: any) => {
		const parent = window.parent

		parent.postMessage({
			source: 'System',
			message,
			data,
		})
	}

	const changeHandler = () => {
		const subscription = watch(values => {
			if (!document || !values) return

			const payload = {
				...document,
				values: {
					...document.values,
					...values,
				},
			}

			console.log('system saving', payload)

			message('save', payload)
		})

		return () => {
			subscription.unsubscribe()
		}
	}
	useEffect(changeHandler, []) // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		const messageListener = ({ data: payload }: any) => {
			const { message, source, data } = payload

			switch (message) {
				// aux server is sending us our data
				case 'load':
					const { documentId } = data

					const payload = {
						documents: data.documents,
						assets: data.assets,
						document: data.documents?.find(
							(d: TDocument) => d._id === documentId,
						),
					}

					dispatch({
						type: 'LOAD',
						payload,
					})
			}
		}

		window.addEventListener('message', messageListener)

		// tell aux server we're ready to load data
		message('system is ready')

		return () => {
			window.removeEventListener('message', messageListener)
		}
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div className='h-full bg-white p-4 text-sm text-gray-900 dark:bg-gray-900 dark:text-gray-100'>
			{type === 'character' && <Character register={register} />}
			{type === 'note' && <Note register={register} />}
			{type === 'scene' && (
				<Scene register={register} setValue={setValue} message={message} />
			)}
		</div>
	)
}
