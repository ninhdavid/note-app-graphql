import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, Typography } from '@mui/material';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { AuthContext } from '../context/AuthProvider';
import { Navigate } from 'react-router-dom';
import { graphQlRequest } from '../utils/request';

function Login(props) {
	const auth = getAuth();

	const { user } = useContext(AuthContext);

	const handleLoginWithGoogle = async () => {
		const provider = new GoogleAuthProvider();

		const {
			user: { uid, displayName },
		} = await signInWithPopup(auth, provider);

		const { data } = await graphQlRequest({
			query: `mutation Mutation($uid: String!, $name: String!) {
				register(uid: $uid, name: $name) {
				  uid
				  name
				}
			  }`,
			variables: {
				uid,
				name: displayName,
			},
		});
		return data;
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
