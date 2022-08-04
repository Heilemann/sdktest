import BasicInfo from './BasicInfo'
import Characteristics from './Characteristics'
import Copyright from './Copyright'
import Combat from './Combat'
import SectionDivider from './SectionDivider'
import SkillsList from './Skills'

export interface ICharacterProps {}

export default function Character(props: ICharacterProps) {
	return (
		<div className='space-y-4'>
			<div className='flex flex-col md:flex-row md:space-x-10'>
				<div
					className='m-auto mt-2 mb-6 grid h-14 w-full place-items-center bg-cover md:mb-0 md:h-28 md:w-60'
					style={{
						background:
							'url(' + require('../assets/coclogo.png') + ') no-repeat center',
						backgroundSize: 'contain',
					}}
				/>

				<div className='space-y-2'>
					<SectionDivider>Basic Information</SectionDivider>
					<BasicInfo />
				</div>
			</div>

			<SectionDivider>Characteristics</SectionDivider>
			{/* <Characteristics /> */}

			<SectionDivider>Skills</SectionDivider>
			<SkillsList />

			<SectionDivider>Combat</SectionDivider>
			<Combat />

			<Copyright />
		</div>
	)
}
