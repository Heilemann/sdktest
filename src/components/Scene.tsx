import { useContext } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import context from './context'
import Input from './Input'

export interface ISceneProps {
	register: UseFormRegister<FieldValues>
	message: (message: string, data?: any) => void
}

export default function Scene(props: ISceneProps) {
	const { register, message } = props
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
			<button
				className='mr-2 mt-2 rounded-lg bg-gray-800 p-2'
				onClick={() => handleUpload('mapId')}
			>
				Upload Map
			</button>
			<button
				className='mr-2 mt-2 rounded-lg bg-gray-800 p-2'
				onClick={() => handleUpload('coverId')}
			>
				Upload Cover
			</button>
		</div>
	)
}
