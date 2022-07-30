import { useContext } from 'react'
import { FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import Asset from './Asset'
import context from './context'
import Input from './Input'

export interface ISceneProps {
	register: UseFormRegister<FieldValues>
	setValue: UseFormSetValue<any>
	messageToApp: (message: string, data?: any) => void
}

export default function Scene(props: ISceneProps) {
	const { register, setValue, messageToApp } = props
	const { state } = useContext(context)
	const { document } = state

	if (!document?.values) return null

	const handleUpload = (name: string) => {
		messageToApp('onUpload', name)
	}

	const setScene = () => {
		window.top!.postMessage(
			{
				source: 'Frame',
				id: '123',
				message: 'setScene',
				data: messageToApp,
			},
			'http://localhost:3000',
		)
	}

	return (
		<div>
			Scene
			<button onClick={setScene}>Set Scene</button>
			<br />
			<Input placeholder='Name...' {...register('name')} />
			<Asset
				name='mapId'
				setValue={setValue}
				// onRemove={() => setValue('mapId', '')}
				messageToParent={messageToApp}
			/>
			<button
				className='mr-2 mt-2 rounded-lg bg-gray-100 p-2 dark:bg-gray-800'
				onClick={() => handleUpload('mapId')}
			>
				Upload Map
			</button>
			<button
				className='mr-2 mt-2 rounded-lg bg-gray-100 p-2 dark:bg-gray-800'
				onClick={() => handleUpload('coverId')}
			>
				Upload Cover
			</button>
		</div>
	)
}
