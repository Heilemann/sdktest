import { useEffect, useReducer } from 'react'
import { useForm } from 'react-hook-form'
import './App.css'
import Character from './components/Character'
import Context from './components/context'
import Note from './components/Note'
import Reducer from './components/reducer'
import Scene from './components/Scene'
import { TDocument, TState } from './interfaces'

const initialData = {
	document: {
		_id: '',
		creator: '',
		access: [],
		type: 'character',
		values: {},
	},
	documents: [],
	assets: [],
} as TState

function App() {
	const [state, dispatch] = useReducer(Reducer, initialData)
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

			const payload = {
				...document,
				values: {
					...document.values,
					...values,
				},
			}

			console.log('system saving', payload)

			messageToApp('save', payload)
		})

		return () => {
			subscription.unsubscribe()
		}
	}
	useEffect(changeHandler, [document, watch])

	useEffect(() => {
		console.log('system state', state)
	}, [state])

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

	return (
		<Context.Provider value={{ state, dispatch }}>
			<div className='h-full bg-white p-4 text-sm text-gray-900 dark:bg-gray-900 dark:text-gray-100'>
				{type === 'character' && <Character register={register} />}
				{type === 'note' && <Note register={register} />}
				{type === 'scene' && (
					<Scene
						register={register}
						setValue={setValue}
						messageToApp={messageToApp}
					/>
				)}
			</div>
		</Context.Provider>
	)
}

export default App
