import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
	ContentState,
	EditorState,
	convertFromHTML,
	convertToRaw,
} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import { useLoaderData, useSubmit, useLocation } from 'react-router-dom';
import { debounce } from '@mui/material';

function Note(props) {
	const { note } = useLoaderData();
	const submit = useSubmit();
	const location = useLocation();
	const [editorState, setEditorState] = useState(() => {
		return EditorState.createEmpty();
	});
	const [rawHtml, setRawHtml] = useState(note.content);

	useEffect(() => {
		const blockFromHtml = convertFromHTML(note.content);
		const state = ContentState.createFromBlockArray(
			blockFromHtml.contentBlocks,
			blockFromHtml.entityMap
		);
		setEditorState(EditorState.createWithContent(state));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [note.id]);
	console.log(rawHtml);

	useEffect(() => {
		debounceMemorized(rawHtml, note, location.pathname);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [rawHtml, note, location.pathname]);

	const debounceMemorized = useMemo(() => {
		return debounce((rawHtml, note, pathname) => {
			if (rawHtml === note.content) return;

			submit(
				{ ...note, content: rawHtml },
				{
					method: 'post',
					action: pathname,
				}
			);
		}, 1000);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		setRawHtml(note.content);
	}, [note.content]);

	const handleOnChange = (e) => {
		setEditorState(e);
		setRawHtml(draftToHtml(convertToRaw(e.getCurrentContent())));
	};
	return (
		<Editor
			editorState={editorState}
			onEditorStateChange={handleOnChange}
			placeholder="write something"
		/>
	);
}

Note.propTypes = {};

export default Note;
