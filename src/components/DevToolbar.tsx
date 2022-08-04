import { useContext, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { TDocument, TState } from '../interfaces'
import systemConfig from '../system.json'
import Button from './Button'
import context from './context'
import Tabs from './Tabs'

export interface IDevToolbarProps {}

export default function DevToolbar(props: IDevToolbarProps) {
	const { state, dispatch } = useContext(context)
	const [collections, setCollections] = useState<any[]>([])
	const selectRef = useRef(null)
	const { register, watch } = useForm()

	useEffect(() => {
		const subscription = watch(values => {
			if (!values) return

			dispatch({
				type: 'LOAD',
				payload: {
					...state,
					...values,
				},
			})
		})

		return () => {
			subscription.unsubscribe()
		}
	})

	useEffect(() => {
		setCollections(systemConfig.collections)

		const fakeData = {
			document: {} as TDocument,
			documents: [],
			assets: [],
			editMode: 'edit',
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

		const type = fakeData['document'].type
		const savedData = JSON.parse(localStorage.getItem(type) || '{}')

		fakeData.document = {
			...fakeData.document,
			...savedData,
		}

		dispatch({
			type: 'LOAD',
			payload: {
				...state,
				...fakeData,
			},
		})
	}, []) // eslint-disable-line

	const handleChange = (e: any) => {
		const { value } = e.target
		const type = value

		let document = state.documents.find(doc => doc.type === value) as TDocument

		const savedData = JSON.parse(localStorage.getItem(type) || '{}')

		document.values = {
			...document.values,
			...savedData,
		}

		console.log('handleChange', value, document)

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

	const tabs = {
		name: 'editMode',
		options: [
			{
				label: 'Edit',
				value: 'edit',
			},
			{
				label: 'View',
				value: 'view',
			},
		],
	}

	const handleClearStorage = () => {
		localStorage.clear()
	}

	return (
		<div className='sticky top-0 flex bg-black py-4 px-4 text-white'>
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

			<Button onClick={handleClearStorage}>Clear Storage</Button>

			<Tabs tabs={tabs} register={register} activeTab={state.editMode} />
		</div>
	)
}
