import { info } from 'console'
import { useContext } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import Asset from '../Asset'
import context from '../context'
import HInput from '../HInput'
import Label from '../Label'

export interface IBasicInfoProps {}

export default function BasicInfo(props: IBasicInfoProps) {
	const { state } = useContext(context)
	const { editMode, messageToApp } = state
	const { register, setValue } = useFormContext()

	const name = useWatch({ name: 'name' })
	const info = useWatch({ name: 'info', defaultValue: {} })

	if (!messageToApp) return null

	return (
		<div className='flex flex-col sm:flex-row'>
			{editMode === 'view' && (
				<div className='text-center text-lg'>
					<strong>{name || 'Unnamed Character'}</strong>
					{info.occupation && ` — ${info.occupation}`}
					{info.residence && `• Resides in ${info.residence}`}
					{info.birthplace && `• Born in ${info.birthplace}`}
					{info.age && `• ${info.age}yo`}
				</div>
			)}

			<div className={twMerge('flex-1', editMode === 'view' && 'hidden')}>
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
						style={{ maxWidth: '200px' }}
					/>
				</div>
			</div>
		</div>
	)
}
