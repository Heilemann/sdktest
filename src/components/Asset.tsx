import { FC, useContext } from 'react'
import { UseFormSetValue } from 'react-hook-form'
import { TAsset } from '../interfaces'
import context from './context'

interface AssetProps {
	name: string
	setValue: UseFormSetValue<any>
	messageToParent: (message: string, data?: any) => void
	className?: string
}

const Asset: FC<AssetProps> = ({
	name,
	setValue,
	messageToParent,
	className,
}) => {
	const { state } = useContext(context)
	const { assets, document } = state
	const assetId = document.values[name]
	const asset = assets.find((asset: TAsset) => asset._id === assetId)

	console.log('asset', name, assetId)

	// should move this to a context
	let parentOrigin = ''
	// if (process.env.NODE_ENV === 'development') {
	const protocol = window.location.protocol
	const host = window.location.hostname
	parentOrigin = `${protocol}//${host}:3000`
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
		return <button onClick={handleUpload}>Upload</button>
	}

	// TODO: Other file types
	// TODO: alt text
	return (
		<div className='asset'>
			<div
				// style={{
				//   width: width || asset.width,
				//   height: height || asset.height,
				// }}
				className={className}
			>
				{asset.filetype.includes('image') && (
					<img
						alt='wonderful'
						src={parentOrigin + '/' + asset.fileurl}
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
			</div>
			<button onClick={handleRemoveAsset}>Remove</button>
		</div>
	)
}

export default Asset
