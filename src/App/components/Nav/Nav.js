import React from 'react'
import { Pane } from 'evergreen-ui'
import getCopy from '../../helpers/getCopy'

const Nav = () => {
	return (
		<Pane
			display="flex"
			background="greenTint"
			padding=".5rem"
			borderBottom="1px solid #999"
			justifyContent="center"
		>
			<Pane maxWidth="990px" flexGrow={1}>
				<Pane userSelect="none">{getCopy('pageTitle')}</Pane>
			</Pane>
		</Pane>
	)
}

export default Nav
