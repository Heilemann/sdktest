import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import Asset from './Asset'
import context from './context'
import HInput from './HInput'
import Label from './Label'

export interface IBasicInfoProps {}

export default function BasicInfo(props: IBasicInfoProps) {
	const { state } = useContext(context)
	const { messageToApp, document } = state
	const { values } = document
	const { register, setValue } = useFormContext()

	if (!messageToApp) return null

	return (
		<div className='flex'>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
				<HInput
					className='mx-2'
					label='Name'
					placeholder='&mdash;'
					{...register('info.name')}
				/>

				<HInput
					className='mx-2'
					label='Occupation'
					placeholder='&mdash;'
					{...register('info.occupation')}
				/>

				<HInput
					className='mx-2'
					label='Residence'
					placeholder='&mdash;'
					{...register('info.residence')}
				/>

				<HInput
					className='mx-2'
					label='Birthplace'
					placeholder='&mdash;'
					{...register('info.birthplace')}
				/>

				<HInput
					className='mx-2'
					label='Pronouns'
					placeholder='&mdash;'
					{...register('info.pronouns')}
				/>

				<HInput
					className='mx-2'
					label='Age'
					placeholder='&mdash;'
					{...register('info.age')}
				/>
			</div>

			<div className='flex w-60 flex-col space-y-2'>
				<Label className='mt-2 w-32' htmlFor='coverId'>
					Portrait
				</Label>
				<Asset
					name='portrait'
					setValue={setValue}
					messageToParent={messageToApp}
					style={{ maxWidth: '200px' }}
				/>
			</div>
		</div>
	)
}
