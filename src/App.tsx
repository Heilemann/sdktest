import { useEffect, useReducer } from 'react'
import './App.css'
import Container from './components/Container'
import Context from './components/context'
import DevToolbar from './components/DevToolbar'
import Reducer from './components/reducer'
import { TState } from './interfaces'

let initialData = {
	editMode: 'view',
	document: {
		_id: '',
		creator: '',
		access: [],
		type: '',
		values: {
			info: {
				name: '',
				occupation: '',
				residence: '',
				birthplace: '',
				pronouns: '',
				age: '',
			},
			weapons: [],
		},
	},
	documents: [],
	assets: [],
} as TState

function App() {
	const [state, dispatch] = useReducer(Reducer, initialData)
	const isDevelopment = process.env.NODE_ENV === 'development'

	useEffect(() => {
		const logMessages = ({ data: payload }: any) => {
			const { message, source, data } = payload

			if (source !== 'System') return

			console.log('system sent message', message, data)
		}

		if (isDevelopment) {
			window.addEventListener('message', logMessages)

			return () => {
				window.removeEventListener('message', logMessages)
			}
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
