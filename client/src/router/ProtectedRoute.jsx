import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute(props) {
	if (!localStorage.getItem('accessToken')) {
		return <Navigate to="/login" />;
	}
	return <Outlet />;
}

ProtectedRoute.propTypes = {};
