import { FC } from 'react'
import { UseFormSetValue } from 'react-hook-form'

interface IAsset {
	_id: string
	name: string
	type: string
	fileurl: string
	filesize: number
	filetype: string
	width: number
	height: number
}

interface AssetProps {
	assets: IAsset[]
	id: string
	name: string
	setValue: UseFormSetValue<any>
	onRemove: () => void
	messageToParent: (message: string, data?: any) => void
	width?: string
	height?: string
	class?: string
}

const Asset: FC<AssetProps> = ({
	assets,
	id,
	width,
	height,
	name,
	setValue,
	onRemove,
	messageToParent,
	class: className,
}) => {
	const asset = assets.find((asset: IAsset) => asset._id === id)

	// should move this to a context
	let parentOrigin = ''
	if (process.env.NODE_ENV === 'development') {
		const protocol = window.location.protocol
		const host = window.location.hostname
		parentOrigin = `${protocol}//${host}:3000`
	} else {
		parentOrigin = 'https://newreal.ms'
	}

	const handleUpload = () => {
		messageToParent('onUpload', name)
	}

	const handleRemoveAsset = () => {
		// setValue(name, '')
		onRemove()
		messageToParent('onRemoveAsset', { id })
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
