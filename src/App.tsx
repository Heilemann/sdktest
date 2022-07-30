import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import './App.css'
import { TDocument } from './interfaces'

function App() {
	const { register, watch } = useForm()
	const document = useRef<TDocument>()
	const documents = useRef<TDocument[]>()

	const message = (message: string, data?: any) => {
		const parent = window.parent

		parent.postMessage({
			source: 'App',
			message,
			data,
		})
	}

	useEffect(() => {
		// listen
		const messageListener = ({ data: payload }: any) => {
			const { message, source, data } = payload

			switch (message) {
				case 'load':
					const { documentId } = data
					documents.current = data.documents as TDocument[]
					document.current = data.documents?.(
						(d: TDocument) => d._id === documentId,
					)

					console.log(document.current, data)
			}
		}

		const subscription = watch(values => {
			const payload = {
				...document.current,
				values: {
					...document.current?.values,
					...values,
				},
			}

			message('save', payload)
		})

		window.addEventListener('message', messageListener)

		// tell aux server we're ready to load data
		message('loadData')

		return () => {
			window.removeEventListener('message', messageListener)
			subscription.unsubscribe()
		}
	}, [])

	return (
		<div className='App'>
			<header className='App-header'>
				<input {...register('name')} />
				<p className='App-logo'>{document.current?._id}</p>
			</header>
		</div>
	)
}

export default App
