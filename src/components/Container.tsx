import merge from 'lodash/merge'
import { useContext, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { TDocument, TSkills, TValues } from '../interfaces'
import Character from './Character'
import context from './context'
import Note from './Note'
import Scene from './Scene'
import skillList from './skillList'

export interface IContainerProps {}

export default function Container(props: IContainerProps) {
	const isDevelopment = process.env.NODE_ENV === 'development'
	const { state, dispatch } = useContext(context)
	const { document } = state
	const { type } = document
	const form = useForm<TValues>()
	const [ready, setReady] = useState(false)

	const readyData = () => {
		let savedDocument = JSON.parse(
			localStorage.getItem('character') || '{"values":{"skills":{}}}',
		)

		let defaultSkills = {} as TSkills

		skillList.forEach(skill => {
			defaultSkills[skill.name] = {
				name: skill.name,
				value: skill.starting,
				starting: skill.starting,
			}
		})

		const skills = merge(defaultSkills, savedDocument.values.skills)
		const values = merge(savedDocument.values, { skills })

		form.reset(values)
		console.log('readyData resetting:', values)

		setReady(true)
	}
	useEffect(readyData, []) // eslint-disable-line

	const messageToApp = (message: string, data?: any) => {
		const parent = window.parent

		parent.postMessage({
			source: 'System',
			message,
			data,
		})
	}

	const handleFormChanges = () => {
		const subscription = form.watch(values => {
			console.log('the watcher', values)
			if (!document || !values) return

			skillList.forEach(skill => {
				if (values.skills[skill.name].value === '')
					form.setValue(`skills.${skill.name}.value`, skill.starting)
			})

			const payload = {
				...document,
				values: {
					...document.values,
					...values,
				},
			}

			messageToApp('save', payload)

			if (isDevelopment)
				localStorage.setItem(document.type, JSON.stringify(payload))
		})

		return () => {
			subscription.unsubscribe()
		}
	}
	useEffect(handleFormChanges, [document, form]) // eslint-disable-line

	useEffect(() => {
		const messageListener = ({ data: payload }: any) => {
			const {
				message,
				// source,
				data,
			} = payload

			switch (message) {
				// aux server is sending us our data
				case 'load':
					console.log('container received message', message, 'data', data)

					const { documentId } = data
					const document = data.documents?.find(
						(d: TDocument) => d._id === documentId,
					)

					const payload = {
						...data,
						document,
					}

					dispatch({
						type: 'LOAD',
						payload,
					})

					form.reset(document.values)

					break

				case 'onUpload':
					const { name } = data

					messageToApp('onUpload', {
						name,
					})

					break
			}
		}

		window.addEventListener('message', messageListener)

		messageToApp('system is ready')

		return () => {
			window.removeEventListener('message', messageListener)
		}
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		dispatch({
			type: 'LOAD',
			payload: {
				messageToApp,
			},
		})
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	if (!state.messageToApp) return null
	if (!ready) return <div>Loading...</div>

	return (
		<FormProvider {...form}>
			<div className='bottom-0 box-border flex min-h-full w-full flex-col bg-gray-100 p-4 text-sm text-gray-900 dark:bg-gray-900 dark:text-gray-100'>
				{type === 'character' && <Character />}
				{type === 'note' && <Note />}
				{type === 'scene' && <Scene messageToApp={messageToApp} />}
			</div>
		</FormProvider>
	)
}
