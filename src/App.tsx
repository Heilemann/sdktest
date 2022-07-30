import { useEffect, useState } from 'react'
import './App.css'
import Character from './components/Character'
import Note from './components/Note'
import Scene from './components/Scene'
import { TDocument } from './interfaces'

const testDocument = {
	_id: 'test',
	type: 'note',
	access: [],
	creator: 'test',
	values: {
		name: 'Test',
		age: '42',
	},
}

function App() {
	// const document = useRef<TDocument>()
	// const documents = useRef<TDocument[]>()
	const [document, setDocument] = useState<TDocument>(testDocument)
	const [documents, setDocuments] = useState<TDocument[]>([])

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

					// documents.current = data.documents as TDocument[]
					setDocuments(data.documents as TDocument[])

					const d = data.documents?.find((d: TDocument) => d._id === documentId)
					setDocument(d)

					console.log('loaded document:', document, documentId, documents)
			}
		}

		window.addEventListener('message', messageListener)

		// tell aux server we're ready to load data
		message('system is ready')

		return () => {
			window.removeEventListener('message', messageListener)
		}
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	console.log('system document', document)

	return (
		<div className='h-full bg-white p-4 text-sm text-gray-900 dark:bg-gray-900 dark:text-gray-100'>
			{document?.type === 'character' && (
				<Character
					message={message}
					document={document}
					documents={documents || []}
				/>
			)}

			{document?.type === 'note' && (
				<Note
					message={message}
					document={document}
					documents={documents || []}
				/>
			)}

			{document?.type === 'scene' && (
				<Scene
					message={message}
					document={document}
					documents={documents || []}
				/>
			)}
		</div>
	)
}

export default App
