import logo from './logo.svg'
import './App.css'
import { useEffect, useRef } from 'react'

function App() {
	console.log('system loaded')

	const message = (message: string, data?: any) => {
		const parent = window.parent

		console.log('POSTMESSAGE', window.parent)

		parent.postMessage({
			source: 'App',
			message,
			data,
		})
	}

	const document = useRef<any>()

	useEffect(() => {
		// listen
		const messageListener = (msg: any) => {
			const { message, source, data } = msg

			switch (message) {
				case 'loadData':
					console.log('loadData', data)
			}

			console.log('=-=-=-=-=-=-> system heard message', message)
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
