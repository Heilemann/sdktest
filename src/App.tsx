import logo from './logo.svg'
import './App.css'
import { useEffect } from 'react'

function App() {
	console.log('system loaded')

	useEffect(() => {
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
