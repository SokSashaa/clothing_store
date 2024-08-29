import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import {Provider} from 'react-redux';
import {persistor, store} from './store/store';
import {PersistGate} from 'redux-persist/integration/react';
import {QueryClient, QueryClientProvider} from 'react-query';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const query_client = new QueryClient();

root.render(
	<QueryClientProvider client={query_client}>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</PersistGate>
		</Provider>
	</QueryClientProvider>
);
