import { useContext, useEffect, useRef, useState } from 'react'
import { TDocument, TState } from '../interfaces'
import systemConfig from '../system.json'
import context from './context'

export interface IDevToolbarProps {}

export default function DevToolbar(props: IDevToolbarProps) {
	const { state, dispatch } = useContext(context)
	const [collections, setCollections] = useState<any[]>([])
	const selectRef = useRef(null)

	useEffect(() => {
		setCollections(systemConfig.collections)
		console.log('system config', systemConfig.collections)

		const fakeData = {
			document: {} as TDocument,
			documents: [],
			assets: [],
		} as TState

		// for each collection create a fake document we can use to switch UI
		systemConfig.collections.forEach(collection => {
			const document = {
				_id: collection.type,
				type: collection.type,
				creator: 'abc',
				access: [],
				values: {
					name: 'No name',
				},
			}
			fakeData.documents.push(document)
		})

		fakeData['document'] = fakeData.documents[0]

		dispatch({
			type: 'LOAD',
			payload: fakeData,
		})
	}, [dispatch])

	const handleChange = (e: any) => {
		const { value } = e.target

		const document = state.documents.find(
			doc => doc.type === value,
		) as TDocument

		dispatch({
			type: 'LOAD',
			payload: {
				...state,
				document,
			},
		})

		// save to localstorage
		localStorage.setItem('document', JSON.stringify(document))
	}

	return (
		<div className='sticky top-0 -m-4 mb-4 bg-black py-4 px-4 text-white'>
			Development Settings
			<select
				ref={selectRef}
				className='mx-4 text-black'
				defaultValue={state.document.type}
				onChange={handleChange}
			>
				{collections.map((collection: any) => (
					<option
						key={collection.type}
						value={collection.type}
						onClick={() => {}}
					>
						{collection.singularName}
					</option>
				))}
			</select>
		</div>
	)
}
