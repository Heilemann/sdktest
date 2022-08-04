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

	const messageToApp = (message: string, data?: any) => {
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

			console.log('values', values)

			const payload = {
				...document,
				values: {
					...document.values,
					...values,
				},
			}

			messageToApp('save', payload)
		})

		return () => {
			subscription.unsubscribe()
		}
	}
	useEffect(changeHandler, [document, watch])

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

					const payload = {
						editMode: data.editMode,
						documents: data.documents,
						assets: data.assets,
						document: data.documents?.find(
							(d: TDocument) => d._id === documentId,
						),
					}

					console.log('load', payload)

					dispatch({
						type: 'LOAD',
						payload,
					})

					break

				case 'onUpload':
					console.log('system onUpload', data)

					const { name } = data

					messageToApp('onUpload', {
						name,
					})

					break
			}
		}

		window.addEventListener('message', messageListener)

		// tell aux server we're ready to load data
		messageToApp('system is ready')

		return () => {
			window.removeEventListener('message', messageListener)
		}
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		console.log('register changed, updating state')

		dispatch({
			type: 'LOAD',
			payload: {
				register,
			},
		})
	}, [register]) // eslint-disable-line react-hooks/exhaustive-deps

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
