import { useReducer } from 'react'
import './App.css'
import Context from './components/context'
import Document from './components/Document'
import Reducer from './components/reducer'
import { TState } from './interfaces'

const initialData = {
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
} as TState

function App() {
	const [state, dispatch] = useReducer(Reducer, initialData)

	return (
		<Context.Provider value={{ state, dispatch }}>
			<Document />
		</Context.Provider>
	)
}

export default App
