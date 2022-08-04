import { useReducer } from 'react'
import './App.css'
import Container from './components/Container'
import Context from './components/context'
import DevToolbar from './components/DevToolbar'
import Reducer from './components/reducer'
import { TState } from './interfaces'

const initialData = {
	editMode: 'view',
	document: {
		_id: '',
		creator: '',
		access: [],
		type: '',
		values: {},
	},
	documents: [],
	assets: [],
} as TState

function App() {
	const [state, dispatch] = useReducer(Reducer, initialData)

	return (
		<Context.Provider value={{ state, dispatch }}>
			{process.env.NODE_ENV === 'development' && <DevToolbar />}
			<Container />
		</Context.Provider>
	)
}

export default App
