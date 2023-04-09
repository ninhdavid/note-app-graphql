import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { createClient } from 'graphql-ws';
import { GRAPHQL_SUBSCRIPTION_ENDPOINT } from '../utils/constants';
import { Badge, Menu, MenuItem } from '@mui/material';

const client = createClient({
	url: GRAPHQL_SUBSCRIPTION_ENDPOINT,
});
const query = `subscription PushNotification {
    notification {
        message
    }
}`;
function PushNotification(props) {
	const [invisible, setInvisible] = useState(true);
	const [notification, setNotification] = useState('');
	const [anchorEl, setAnchorEl] = useState(null);

	const open = Boolean(anchorEl);

	const handleClose = () => {
		setAnchorEl(null);
		setNotification('');
		setInvisible(true);
	};
	const handleClick = (e) => {
		if (notification) {
			setAnchorEl(e.currentTarget);
		}
	};

	useEffect(() => {
		(async () => {
			const onNext = (data) => {
				/* handle incoming values */
				setInvisible(false);
				const message = data?.data?.notification?.message;
				setNotification(message);
			};
			const result = await new Promise((resolve, reject) => {
				let result;
				client.subscribe(
					{
						query,
					},
					{
						next: onNext,
						error: reject,
						complete: () => resolve(result),
					}
				);
			});

			expect(result).toEqual({ hello: 'Hello World!' });
		})();
	}, []);

	return (
		<>
			<Badge
				color="secondary"
				variant="dot"
				invisible={invisible}
				sx={{ cursor: invisible ? '' : 'pointer' }}
			>
				<NotificationsIcon onClick={handleClick} />
			</Badge>
			<Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
				<MenuItem onClick={handleClose}>{notification}</MenuItem>
			</Menu>
		</>
	);
}

PushNotification.propTypes = {};

export default PushNotification;
