import { useEffect, useRef } from 'react'
import './App.css'
import { IDocument } from './interfaces'
import logo from './logo.svg'

function App() {
	const document = useRef<IDocument>()
	const documents = useRef<IDocument[]>()

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
				case 'loadData':
					const { id } = data
					documents.current = data.documents as IDocument[]
					document.current = documents.current.find(d => d._id === id)

					console.log(document.current, data)
			}
		}

		window.addEventListener('message', messageListener)

		// tell aux server we're ready to load data
		message('loadData')

		return () => {
			window.removeEventListener('message', messageListener)
		}
	}, [])

	return (
		<div className='App'>
			<header className='App-header'>
				<img src={logo} className='App-logo' alt='logo' />
			</header>
		</div>
	)
}

export default App
