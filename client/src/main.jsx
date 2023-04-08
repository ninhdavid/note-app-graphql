import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import router from './router';
import { RouterProvider } from 'react-router-dom';
import { Container } from '@mui/system';
import './firebase/config';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	// <React.StrictMode>
	<Container maxWidth="lg" sx={{ textAlign: 'center', marginTop: '5px' }}>
		<RouterProvider router={router} />
	</Container>
	// </React.StrictMode>
);
