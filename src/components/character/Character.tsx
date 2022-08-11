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
			<SectionDivider>Basic Information</SectionDivider>
			<BasicInfo />

			<SectionDivider>Characteristics</SectionDivider>
			<Characteristics />

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
