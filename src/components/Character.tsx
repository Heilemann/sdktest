import { useContext } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import context from './context'
import Input from './Input'

export interface ICharacterProps {
	register: UseFormRegister<FieldValues>
}

export default function Character(props: ICharacterProps) {
	const { register } = props
	const { state } = useContext(context)
	const { document } = state

	return (
		<div>
			Character
			<br />
			<Input placeholder='Name...' {...register('name')} />
		</div>
	)
}
