import BasicInfo from './BasicInfo'
import Characteristics from './Characteristics'
import Combat from './Combat'
import Copyright from '../Copyright'
import SectionDivider from '../SectionDivider'
import Skills from './Skills'
import Weapons from './Weapons'

export interface ICharacterProps {}

export default function Character(props: ICharacterProps) {
	return (
		<div className='space-y-4'>
			<div className='md:flex md:space-x-4'>
				<div className='flex-1'>
					<SectionDivider>Basic Information</SectionDivider>
					<BasicInfo />
				</div>

				<div className='flex-1'>
					<SectionDivider>Characteristics</SectionDivider>
					<Characteristics />
				</div>
			</div>
			<SectionDivider>Skills</SectionDivider>
			<Skills />
			<SectionDivider>Combat</SectionDivider>
			<Combat />
			<SectionDivider>Weapons</SectionDivider>
			<Weapons />
			<Copyright />
		</div>
	)
}
