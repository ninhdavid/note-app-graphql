import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, Typography } from '@mui/material';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { AuthContext } from '../context/AuthProvider';
import { Navigate } from 'react-router-dom';

function Login(props) {
	const auth = getAuth();

	const { user } = useContext(AuthContext);

	const handleLoginWithGoogle = async () => {
		const provider = new GoogleAuthProvider();

		const res = await signInWithPopup(auth, provider);
		console.log(res);
	};

	if (localStorage.getItem('accessToken')) {
		return <Navigate to="/" />;
	}
	return (
		<div>
			<Typography variant="h5" sx={{ marginBottom: '10px' }}>
				Welcome to Note App
			</Typography>
			<Button variant="outlined" onClick={handleLoginWithGoogle}>
				Login with Google
			</Button>
		</div>
	);
}

Login.propTypes = {};

export default Login;
