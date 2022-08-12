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

				<div className='flex-1 space-y-4'>
					<SectionDivider>Characteristics</SectionDivider>
					<Characteristics />

					<div className='space-y-4 hidden lg:block'>
						<SectionDivider>Combat</SectionDivider>
						<Combat />
					</div>
				</div>
			</div>

			<div className='space-y-4 block lg:hidden'>
				<SectionDivider>Combat</SectionDivider>
				<Combat />
			</div>

			<SectionDivider>Skills</SectionDivider>
			<Skills />

			<SectionDivider>Weapons</SectionDivider>
			<Weapons />

			<Copyright />
		</div>
	)
}
