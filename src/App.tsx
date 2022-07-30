import { useEffect, useReducer } from 'react'
import { useForm } from 'react-hook-form'
import './App.css'
import Character from './components/Character'
import Context from './components/context'
import Note from './components/Note'
import Reducer from './components/reducer'
import Scene from './components/Scene'
import { TDocument } from './interfaces'

function App() {
	const [state, dispatch] = useReducer(Reducer, {
		document: {
			_id: '',
			creator: '',
			access: [],
			type: 'scene',
			values: {
				name: '',
				note: '',
			},
		},
		documents: [],
		assets: [],
	})
	const { register, setValue, watch } = useForm()
	const { document } = state
	const { type } = document

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

			message('save', payload)
		})

		return () => {
			subscription.unsubscribe()
		}
	}
	useEffect(changeHandler, []) // eslint-disable-line react-hooks/exhaustive-deps

	const message = (message: string, data?: any) => {
		const parent = window.parent

		parent.postMessage({
			source: 'System',
			message,
			data,
		})
	}

	useEffect(() => {
		const messageListener = ({ data: payload }: any) => {
			const { message, source, data } = payload

			switch (message) {
				// aux server is sending us our data
				case 'load':
					const { documentId } = data

					const payload = {
						...data,
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
		<Context.Provider value={{ state, dispatch }}>
			<div className='h-full bg-white p-4 text-sm text-gray-900 dark:bg-gray-900 dark:text-gray-100'>
				{type === 'character' && <Character register={register} />}
				{type === 'note' && <Note register={register} />}
				{type === 'scene' && (
					<Scene register={register} setValue={setValue} message={message} />
				)}
			</div>
		</Context.Provider>
	)
}

export default App
