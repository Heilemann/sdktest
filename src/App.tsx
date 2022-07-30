import { useEffect, useRef } from 'react'
import './App.css'
import Character from './components/Character'
import Note from './components/Notes'
import Scene from './components/Scene'
import { TDocument } from './interfaces'

const testDocument = {
	_id: 'test',
	type: 'character',
	access: [],
	creator: 'test',
	values: {
		name: 'Test',
		age: '42',
	},
}

function App() {
	const document = useRef<TDocument>(testDocument)
	const documents = useRef<TDocument[]>()

	const message = (message: string, data?: any) => {
		const parent = window.parent

		console.log('sending message:', message, data)

		parent.postMessage({
			source: 'System',
			message,
			data,
		})
	}

	useEffect(() => {
		// listen
		const messageListener = ({ data: payload }: any) => {
			const { message, source, data } = payload

			switch (message) {
				// aux server is sending us our data
				case 'load':
					const { documentId } = data

					documents.current = data.documents as TDocument[]

					document.current = data.documents?.find(
						(d: TDocument) => d._id === documentId,
					)
			}
		}

		window.addEventListener('message', messageListener)

		// tell aux server we're ready to load data
		message('system is ready')

		return () => {
			window.removeEventListener('message', messageListener)
		}
	}, [])

	console.log('system document', document.current)

	return (
		<div className='h-full bg-white p-4 text-sm text-gray-900 dark:bg-gray-900 dark:text-gray-100'>
			{document.current?.type === 'character' && (
				<Character
					message={message}
					document={document.current}
					documents={documents.current || []}
				/>
			)}

			{document.current?.type === 'note' && (
				<Note
					message={message}
					document={document.current}
					documents={documents.current || []}
				/>
			)}

			{document.current?.type === 'scene' && (
				<Scene
					message={message}
					document={document.current}
					documents={documents.current || []}
				/>
			)}
		</div>
	)
}

export default App
