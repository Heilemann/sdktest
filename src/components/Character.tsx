import { useContext } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import BasicInfo from './BasicInfo'
import Characteristics from './Characteristics'
import Combat from './Combat'
import context from './context'
import Input from './Input'
import Label from './Label'
import SectionDivider from './SectionDivider'
import SkillsList from './Skills'
// import logo from "../assets/coclogo.png";

export interface ICharacterProps {
	register: UseFormRegister<FieldValues>
}

export default function Character(props: ICharacterProps) {
	const { register } = props
	const { state } = useContext(context)
	const { document } = state
	const { values } = document

	return (
		<div className='space-y-2'>
			<div className='flex flex-col md:flex-row md:space-x-10'>
				<div
					className='m-auto mt-2 mb-4 grid h-20 w-full place-items-center bg-cover md:mb-0 md:h-28 md:w-60'
					style={{
						background:
							'url(' + require('../assets/coclogo.png') + ') no-repeat center',
						backgroundSize: 'contain',
					}}
				/>

				<div className='flex-1 flex-col space-y-2'>
					<BasicInfo register={register} />
				</div>
			</div>

			<SectionDivider>Abilities</SectionDivider>
			<Characteristics register={register} />

			<SectionDivider>Skills</SectionDivider>
			<SkillsList register={register} />

			<SectionDivider>Combat</SectionDivider>
			<Combat register={register} />
		</div>
	)
}
