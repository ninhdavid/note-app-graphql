import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, List, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function FolderList({ folder }) {
	return (
		<div>
			<List>
				{folder.map((id, name) => {
					return (
						<Link
							key={id}
							to={`folder/${id}`}
							style={{ textDecoration: 'none' }}
						>
							<Card>
								<CardContent>
									<Typography>{name}</Typography>
								</CardContent>
							</Card>
						</Link>
					);
				})}
			</List>
		</div>
	);
}

FolderList.propTypes = {};

export default FolderList;
