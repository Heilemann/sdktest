import { useCallback, useContext, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { TDocument, TValues } from '../interfaces'
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
		({ data: payload }: any) => {
			const { message, source, data } = payload
			const wrongSource = source !== 'Aux' && source !== 'App'

			console.log(
				'container received message',
				message,
				'data',
				data,
				'source',
				source,
			)

			if (wrongSource) return

			switch (message) {
				case 'load':
					const { documentId } = data
					const document = data.documents?.find(
						(d: TDocument) => d._id === documentId,
					)

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

				case 'onDocumentsChange':
					console.log('system onDocumentsChange', data)
					dispatch({
						type: 'LOAD',
						payload: data,
					})

					break

				case 'onDocumentModeChange':
					dispatch({
						type: 'LOAD',
						payload: data,
					})
					break

				case 'onUpload':
					messageToApp('upload', {
						name: data.name,
					})

					break
			}
		},
		[dispatch, form],
	)

	useEffect(() => {
		dispatch({
			type: 'LOAD',
			payload: {
				messageToApp,
			},
		})

		window.addEventListener('message', messageListener)

		// messageToApp('system is ready')

		return () => {
			window.removeEventListener('message', messageListener)
		}
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	// if (!state.messageToApp) return null

	console.log('render container', state)

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
