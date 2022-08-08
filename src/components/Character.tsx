import BasicInfo from './BasicInfo'
import Characteristics from './Characteristics'
import Copyright from './Copyright'
import Combat from './Combat'
import SectionDivider from './SectionDivider'
import SkillsList from './Skills'
import Weapons from './Weapons'
import Logo from './Logo'

export interface ICharacterProps {}

export default function Character(props: ICharacterProps) {
	return (
		<div className='space-y-4'>
			{/* <Logo /> */}

			<SectionDivider>Basic Information</SectionDivider>
			<BasicInfo />

			<SectionDivider>Characteristics</SectionDivider>
			<Characteristics />

			{/* <SectionDivider>Skills</SectionDivider>
			<SkillsList /> */}

			<SectionDivider>Combat</SectionDivider>
			<Combat />

			<SectionDivider>Weapons</SectionDivider>
			<Weapons />

			<Copyright />
		</div>
	)
}
