import { FC, useContext } from 'react'
import { UseFormSetValue } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { TAsset } from '../interfaces'
import Button from './Button'
import context from './context'

interface AssetProps {
	name: string
	setValue: UseFormSetValue<any>
	messageToParent: (message: string, data?: any) => void
	className?: string
	style?: React.CSSProperties
}

const Asset: FC<AssetProps> = props => {
	const { name, setValue, messageToParent, className, style } = props
	const { state } = useContext(context)
	const { assets, document } = state
	const assetId = document.values[name]
	const asset = assets.find((asset: TAsset) => asset._id === assetId)

	// should move this to a context
	let parentOrigin = ''
	// if (process.env.NODE_ENV === 'development') {
	// const protocol = window.location.protocol;
	// const host = window.location.hostname;
	parentOrigin = `http://localhost:3000`
	// } else {
	// 	parentOrigin = 'https://newreal.ms'
	// }

	const handleUpload = () => {
		messageToParent('onUpload', name)
	}

	const handleRemoveAsset = () => {
		setValue(name, '')
		messageToParent('onRemoveAsset', { assetId })
	}

	if (!asset) {
		return <Button onClick={handleUpload}>Upload</Button>
	}

	// TODO: Other file types
	// TODO: alt text
	return (
		<div className={twMerge('space-y-2', className)} style={style}>
			{asset.filetype.includes('image') && (
				<img
					alt='wonderful'
					src={parentOrigin + '/' + asset.fileurl}
					className='rounded-lg'
					style={{
						objectFit: 'cover',
					}}
				/>
			)}
			{asset.filetype.includes('video') && (
				<video
					// autoPlay={true}
					loop={true}
					muted={true}
					playsInline={true}
					src={parentOrigin + '/' + asset.fileurl}
					style={{
						objectFit: 'cover',
					}}
				/>
			)}
			<Button onClick={handleRemoveAsset}>Remove</Button>
		</div>
	)
}

export default Asset
