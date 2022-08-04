import { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { TDocument } from '../interfaces'
import Character from './Character'
import context from './context'
import Note from './Note'
import Scene from './Scene'

export interface IContainerProps {}

export default function Container(props: IContainerProps) {
	const { state, dispatch } = useContext(context)
	const { register, setValue, watch } = useForm()
	const { document } = state
	const { type } = document
	const isDevelopment = process.env.NODE_ENV === 'development'

	const messageToApp = (message: string, data?: any) => {
		const parent = window.parent

		console.log('parent', parent)

		parent.postMessage({
			source: 'System',
			message,
			data,
		})
	}

	const handleFormChanges = () => {
		const subscription = watch(values => {
			if (!document || !values) return

			const payload = {
				...document,
				values: {
					...document.values,
					...values,
				},
			}

			messageToApp('save', payload)

			if (isDevelopment)
				localStorage.setItem(document.type, JSON.stringify(payload))
		})

		return () => {
			subscription.unsubscribe()
		}
	}
	useEffect(handleFormChanges, [document, watch]) // eslint-disable-line

	useEffect(() => {
		const messageListener = ({ data: payload }: any) => {
			const {
				message,
				// source,
				data,
			} = payload

			switch (message) {
				// aux server is sending us our data
				case 'load':
					const { documentId } = data
					const document = data.documents?.find(
						(d: TDocument) => d._id === documentId,
					)

					const payload = {
						...data,
						document,
					}

					dispatch({
						type: 'LOAD',
						payload,
					})

					break

				case 'onUpload':
					const { name } = data

					messageToApp('onUpload', {
						name,
					})

					break
			}
		}

		window.addEventListener('message', messageListener)

		messageToApp('system is ready')

		return () => {
			window.removeEventListener('message', messageListener)
		}
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		dispatch({
			type: 'LOAD',
			payload: {
				register,
				// messageToApp,
			},
		})
	}, [register]) // eslint-disable-line react-hooks/exhaustive-deps

	if (!state.messageToApp || !state.register) return null

	return (
		<div className='flex h-full flex-col bg-white p-4 text-sm text-gray-900 dark:bg-gray-900 dark:text-gray-100'>
			<div className='flex-1'>
				{type === 'character' && <Character />}
				{type === 'note' && <Note />}
				{type === 'scene' && (
					<Scene setValue={setValue} messageToApp={messageToApp} />
				)}
			</div>
		</div>
	)
}
