import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { App } from '@app/App.tsx'

import { store } from '@shared/config/storeConfig'

import './app/styles/global.css'
import './app/styles/reset.css'
import './shared/libs/utils/i18n'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<BrowserRouter>
			<ToastContainer />
			<App />
		</BrowserRouter>
	</Provider>
)
