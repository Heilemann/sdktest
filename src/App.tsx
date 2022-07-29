import logo from './logo.svg'
import './App.css'
import { useEffect, useRef } from 'react'

function App() {
	const document = useRef<any>()
	console.log('system loaded')

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
			console.log('=-=-=-=-=-=-> system heard message', payload)

			const { message, source, data } = payload

			switch (message) {
				case 'loadData':
					console.log('=-=-=-=-=-=> system loadData', data)
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
