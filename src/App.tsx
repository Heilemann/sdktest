import logo from './logo.svg'
import './App.css'
import { useEffect } from 'react'

function App() {
	console.log('system loaded')

	const message = (message: string, data?: any) => {
		const parent = window.parent

		parent.postMessage(
			{
				source: 'App',
				message,
				data,
			},
			'*',
		)
	}

	useEffect(() => {
		message('test', 'hello world')

		window.addEventListener('message', message => {
			console.log('message', message)
		})

		return () => {
			window.removeEventListener('message', message => {
				console.log('message', message)
			})
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
