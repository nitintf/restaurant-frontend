import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './styles/theme'
import { Global } from '@emotion/react'
import { global } from './styles/global'

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<Global styles={global} />
			<ChakraProvider resetCSS theme={theme}>
				<App />
			</ChakraProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
