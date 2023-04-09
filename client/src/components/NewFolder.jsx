import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	TextField,
	Tooltip,
} from '@mui/material';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import { addNewFolder } from '../utils/folderUtils';
import { useNavigate, useSearchParams } from 'react-router-dom';

function NewFolder(props) {
	const [newFolderName, setNewFolderName] = useState('');
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();

	const popupName = searchParams.get('popup');

	const handleOpenPopup = () => {
		setSearchParams({ popup: 'add-folder' });
	};
	const handleNewFolderNameChange = (e) => {
		setNewFolderName(e.target.value);
	};
	const handleClose = () => {
		setNewFolderName('');
		navigate(-1);
	};
	const handleAddNewFolder = async () => {
		const { addFolder } = await addNewFolder({ name: newFolderName });

		handleClose();
	};
	useEffect(() => {
		if (popupName === 'add-folder') {
			setOpen(true);
			return;
		}
		setOpen(false);
	}, [popupName]);
	return (
		<div>
			<Tooltip title="Add Folder" onClick={handleOpenPopup}>
				<IconButton size="small">
					<CreateNewFolderOutlinedIcon
						sx={{ color: 'white', fontSize: 20, mt: '-4px' }}
					/>
				</IconButton>
			</Tooltip>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>New Folder</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Folder Name"
						fullWidth
						size="small"
						variant="standard"
						autoComplete="off"
						sx={{ width: '400px' }}
						value={newFolderName}
						onChange={handleNewFolderNameChange}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleAddNewFolder}>Accept</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

NewFolder.propTypes = {};

export default NewFolder;
