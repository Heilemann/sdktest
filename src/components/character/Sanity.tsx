import { useWatch } from 'react-hook-form'
import Depletable from './Depletable'

export interface ISanityProps {}

export default function Sanity(props: ISanityProps) {
	const power = useWatch({
		name: 'characteristics.power',
	}) as string

	return (
		<Depletable
			className='col-span-2'
			label='Sanity'
			currentName='sanity.current'
			maxName='sanity.max'
			maxPlaceholder={power}
		/>
	)
}
