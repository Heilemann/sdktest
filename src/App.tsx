import { useEffect, useReducer } from 'react'
import './App.css'
import Container from './components/Container'
import Context from './components/context'
import DevToolbar from './components/DevToolbar'
import Reducer from './components/reducer'
import { TState } from './interfaces'

let initialData = {
	documentId: '123',
	editMode: 'view',
	documents: [
		{
			_id: '123',
			creator: 'abc',
			access: [],
			type: 'character',
			values: {},
		},
	],
	assets: [],
}

function App() {
	// @ts-ignore
	const [state, dispatch] = useReducer(Reducer, {} as TState)
	const isDevelopment = process.env.NODE_ENV === 'development'

	useEffect(() => {
		const simulatedMessages = ({ data: payload }: any) => {
			const { message, source, data } = payload

			if (source !== 'System') return

			console.log('system sent message:', message, data)

			switch (message) {
				case 'system is ready':
					let loadedState = JSON.parse(localStorage.getItem('state') || '{}')

					if (Object.keys(loadedState).length) {
						initialData = {
							...initialData,
							...loadedState,
						}
					}

					console.log('load state from localStorage', loadedState)

					window.parent.postMessage({
						source: 'Aux',
						message: 'load',
						data: initialData,
					})

					break

				case 'save':
					console.log('save state to localStorage', data)
					const newState = {
						...state,
						documents: [payload.data],
					}

					localStorage.setItem('state', JSON.stringify(newState))

					console.log(`save state to localStorage:`, newState)
			}
		}

		if (isDevelopment) window.addEventListener('message', simulatedMessages)

		return () => {
			window.removeEventListener('message', simulatedMessages)
		}
	}, []) // eslint-disable-line

	return (
		<Context.Provider value={{ state, dispatch }}>
			{isDevelopment && <DevToolbar />}
			{/* <DevToolbar /> */}
			<Container />
		</Context.Provider>
	)
}

export default App
