import React from 'react'
import { Pane } from 'evergreen-ui'
import Nav from './components/Nav'
import CatList from './containers/CatList'

const App = () => {
	return (
		<Pane minHeight="100vh" background="tint1">
			<Nav />
			<Pane maxWidth="990px" marginLeft="auto" marginRight="auto" marginTop="20px" padding="10px">
				<CatList />
			</Pane>
		</Pane>
	)
}

export default App
