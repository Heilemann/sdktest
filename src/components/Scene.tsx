import { useContext } from 'react'
import { FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import Asset from './Asset'
import context from './context'
import Input from './Input'

export interface ISceneProps {
	register: UseFormRegister<FieldValues>
	setValue: UseFormSetValue<any>
	message: (message: string, data?: any) => void
}

export default function Scene(props: ISceneProps) {
	const { register, setValue, message } = props
	const { state } = useContext(context)
	const { document } = state

	if (!document?.values) return null

	const handleUpload = (name: string) => {
		message('onUpload', name)
	}

	return (
		<div>
			Scene
			<br />
			<Input placeholder='Name...' {...register('name')} />
			<Asset
				name='mapId'
				setValue={setValue}
				// onRemove={() => setValue('mapId', '')}
				messageToParent={message}
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
