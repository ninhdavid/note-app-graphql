import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Typography } from '@mui/material';
import UserMenu from '../components/UserMenu';

function Home(props) {
	return (
		<div>
			<Typography variant="h4" sx={{ mg: '20px' }}>
				Note App
			</Typography>
			<Box sx={{ display: 'flex', justifyContent: 'right', mb: '10px' }}>
				<UserMenu />
			</Box>

			<Grid
				container
				sx={{
					height: '50vh',
					boxShadow: '0 0 15px 0 rgb(193 913 193 / 60%',
				}}
			>
				<Grid item xs={3} sx={{ height: '100%' }}>
					<p>Folder List</p>
				</Grid>
				<Grid item xs={9} sx={{ height: '100%' }}>
					<p>Note List</p>
				</Grid>
			</Grid>
		</div>
	);
}

Home.propTypes = {};

export default Home;
