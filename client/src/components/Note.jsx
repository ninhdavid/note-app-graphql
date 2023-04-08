import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
	ContentState,
	EditorState,
	convertFromHTML,
	convertToRaw,
} from 'draft-js';
import { draftToHtml } from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import { useLoaderData } from 'react-router-dom';

function Note(props) {
	const { note } = useLoaderData();
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
	}, [note.id]);
	useEffect(() => {
		setRawHtml(note.content);
	}, [note.content]);

	const handleOnChange = (e) => {
		setEditorState(e);
		setRawHtml(draftToHtml(convertToRaw(e.getCurrentContent())));
	};
	return (
		<div>
			<Editor
				editorState={editorState}
				onEditorStateChange={handleOnChange}
				placeholder="write something"
			/>
		</div>
	);
}

Note.propTypes = {};

export default Note;
