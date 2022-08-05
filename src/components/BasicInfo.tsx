import { useContext } from 'react'
import Asset from './Asset'
import context from './context'
import HInput from './HInput'
import Label from './Label'

export interface IBasicInfoProps {}

export default function BasicInfo(props: IBasicInfoProps) {
	const { state } = useContext(context)
	const { register, setValue, messageToApp, document } = state
	const { values } = document

	if (!register || !setValue || !messageToApp) return null

	return (
		<div className='flex'>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
				<HInput
					className='mx-2'
					label='Name'
					placeholder='&mdash;'
					defaultValue={values.name}
					{...register('name')}
				/>

				<HInput
					className='mx-2'
					label='Occupation'
					placeholder='&mdash;'
					defaultValue={values.occupation}
					{...register('occupation')}
				/>

				<HInput
					className='mx-2'
					label='Residence'
					placeholder='&mdash;'
					defaultValue={values.residence}
					{...register('residence')}
				/>

				<HInput
					className='mx-2'
					label='Birthplace'
					placeholder='&mdash;'
					defaultValue={values.birthplace}
					{...register('birthplace')}
				/>

				<HInput
					className='mx-2'
					label='Gender'
					placeholder='&mdash;'
					defaultValue={values.gender}
					{...register('gender')}
				/>

				<HInput
					className='mx-2'
					label='Age'
					placeholder='&mdash;'
					defaultValue={values.age}
					{...register('age')}
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
