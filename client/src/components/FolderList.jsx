import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Card, CardContent, List, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import NewFolder from './NewFolder';

function FolderList({ folders }) {
	const { folderId } = useParams();
	const [activeFolderId, setActiveFolderId] = useState(folderId);
	return (
		<List
			sx={{
				width: '100%',
				bgcolor: '#7D9D9C',
				height: '100%',
				padding: '10px',
				textAlign: 'left',
				overflowY: 'auto',
			}}
			subheader={
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignContent: 'center',
					}}
				>
					<Typography sx={{ fontWeight: 'bold', color: 'white' }}>
						Folders
					</Typography>
					<NewFolder />
				</Box>
			}
		>
			{folders.map(({ id, name }) => {
				return (
					<Link
						key={id}
						to={`folders/${id}`}
						style={{
							textDecoration: 'none',
						}}
						onClick={() => setActiveFolderId(id)}
					>
						<Card
							sx={{
								mb: '5px',
								backgroundColor:
									id === activeFolderId
										? 'rgb(255 211 140)'
										: null,
							}}
						>
							<CardContent
								sx={{
									'&:last-child': { pb: '10px' },
									padding: '10px',
								}}
							>
								<Typography
									sx={{
										fontSize: '16px',
										fontWeight: 'bold',
									}}
								>
									{name}
								</Typography>
							</CardContent>
						</Card>
					</Link>
				);
			})}
		</List>
	);
}

FolderList.propTypes = {};

export default FolderList;
