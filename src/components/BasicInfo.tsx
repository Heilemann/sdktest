import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import Asset from './Asset'
import context from './context'
import HInput from './HInput'
import Label from './Label'

export interface IBasicInfoProps {}

export default function BasicInfo(props: IBasicInfoProps) {
	const { state } = useContext(context)
	const { messageToApp } = state
	const { register, setValue } = useFormContext()

	if (!messageToApp) return null

	return (
		<div className='flex flex-col sm:flex-row'>
			<div className='flex-1'>
				<div className='-ml-2 grid grid-cols-1 xl:grid-cols-2'>
					<HInput
						className='mx-2'
						label='Name'
						placeholder='&mdash;'
						{...register('name')}
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
			</div>

			<div className='mt-4 flex flex-row md:mt-0 md:flex-col'>
				<div className='max-w-60 mx-2 flex max-h-60 flex-col space-y-2'>
					<Label className='mt-2 w-32' htmlFor='coverId'>
						Portrait
					</Label>
					<Asset
						name='portrait'
						setValue={setValue}
						messageToApp={messageToApp}
						style={{ maxWidth: '200px' }}
					/>
				</div>
				<div className='max-w-60 flex flex-col space-y-2'>
					<Label className='mt-2 w-32' htmlFor='coverId'>
						Token
					</Label>
					<Asset
						name='token'
						setValue={setValue}
						messageToApp={messageToApp}
						style={{ maxWidth: '200px' }}
					/>
				</div>
			</div>
		</div>
	)
}
