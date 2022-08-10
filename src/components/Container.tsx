import { useCallback, useContext, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { TDocument, TSystemReceivableMessages, TValues } from '../interfaces'
import Character from './Character'
import context from './context'
import Note from './Note'
import Scene from './Scene'

export interface IContainerProps {}

export default function Container(props: IContainerProps) {
	// const isDevelopment = process.env.NODE_ENV === 'development'
	const { state, dispatch } = useContext(context)
	const { document } = state
	const type = document?.type || null
	const form = useForm<TValues>({
		shouldUnregister: true,
	})

	const messageToApp = (message: string, data?: any) => {
		window.parent.postMessage({
			source: 'System',
			message,
			data,
		})
	}

	const handleFormChanges = () => {
		const subscription = form.watch(values => {
			console.log('watch:', values)

			if (!document || !values) return

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
	useEffect(handleFormChanges, [state]) // eslint-disable-line

	const messageListener = useCallback(
		(e: MessageEvent) => {
			const messagePayload = e.data as TSystemReceivableMessages
			const { message, source, data } = { ...messagePayload }
			const wrongSource = source !== 'Aux' && source !== 'App'

			if (wrongSource) return

			console.log(
				'container received message:',
				message,
				', data:',
				messagePayload.data,
				', source:',
				source,
			)

			switch (message) {
				case 'load':
					const { documentId } = data
					const document = data.documents?.find(
						(d: TDocument) => d._id === documentId,
					)

					if (!document) {
						throw new Error(`document with id ${documentId} not found by aux`)
					}

					const payload = {
						...data,
						document,
					}

					console.log('system load', payload)

					dispatch({
						type: 'LOAD',
						payload,
					})

					form.reset(document.values)

					break

				case 'update data':
					console.log('system update data:', data)

					dispatch({
						type: 'LOAD',
						payload: data,
					})

					break

				case 'update document mode':
					dispatch({
						type: 'LOAD',
						payload: data,
					})
					break

				// case 'onUpload':
				// 	messageToApp('upload', {
				// 		name: data.name,
				// 	})

				// 	break
			}
		},
		[dispatch, form],
	)

	useEffect(() => {
		window.addEventListener('message', messageListener)

		return () => {
			window.removeEventListener('message', messageListener)
		}
	}, [messageListener])

	const addMessageToAppToState = useCallback(() => {
		dispatch({
			type: 'LOAD',
			payload: {
				messageToApp,
			},
		})

		messageToApp('system is ready')
	}, [dispatch])
	useEffect(addMessageToAppToState, [addMessageToAppToState])

	// if (!state.messageToApp) return null

	if (!type) return null

	return (
		<FormProvider {...form}>
			<div className='bottom-0 box-border flex min-h-full w-full flex-col bg-gray-100 p-4 text-sm text-gray-900 dark:bg-gray-900 dark:text-gray-100'>
				{type === 'character' && <Character />}
				{type === 'note' && <Note />}
				{type === 'scene' && <Scene messageToApp={messageToApp} />}
			</div>
		</FormProvider>
	)
}
