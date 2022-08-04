import * as React from 'react'

export interface ICopyrightProps {}

export default function Copyright(props: ICopyrightProps) {
	return (
		<div>
			<div className='mt-8 text-center text-gray-500'>
				Copyright 2022, Chaosium Inc.
			</div>
		</div>
	)
}
