import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from '../context/AuthProvider';
import { Avatar, Box, Menu, MenuItem, Typography } from '@mui/material';

function UserMenu(props) {
	const {
		user: { displayName, photoURL, auth },
	} = useContext(AuthContext);
	const [anchorEl, setAnchorEl] = useState(null);

	const open = Boolean(anchorEl);
	const handleLogout = () => {
		auth.signOut();
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleClick = (e) => {
		setAnchorEl(e.currentTarget);
	};
	return (
		<div>
			<Box sx={{ display: 'flex' }} onClick={handleClick}>
				<Typography>{displayName}</Typography>
				<Avatar
					alt="avatar"
					src={photoURL}
					sx={{ width: 24, height: 24, marginLeft: '5px' }}
				/>
			</Box>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
			>
				<MenuItem onClick={handleLogout}>Logout</MenuItem>
			</Menu>
		</div>
	);
}

UserMenu.propTypes = {};

export default UserMenu;
