import fakeData from '../fakeData/index.js';
import { AuthorModel, FolderModel } from '../models/index.js';

export const resolvers = {
	Query: {
		folders: async (parent, args, context) => {
			const authorId = await FolderModel.find({ authorId: context.uid });
			return authorId;
		},
		folder: async (parent, args) => {
			const folderId = args.folderId;
			const foundFolder = await FolderModel.findOne({ folderId });
			return foundFolder;
		},
		note: (parent, args) => {
			const noteId = args.noteId;
			return fakeData.notes.find((note) => note.id === noteId);
		},
	},
	Folder: {
		author: (parent, args) => {
			const authorId = parent.authorId;
			return fakeData.authors.find((author) => author.id === authorId);
		},
		notes: (parent, args) => {
			return fakeData.notes.filter((note) => note.folderId === parent.id);
		},
	},
	Mutation: {
		addFolder: async (parent, args) => {
			const newFolder = new FolderModel({ ...args, authorId: '1' });
			await newFolder.save();
			return newFolder;
		},
		register: async (parent, args) => {
			const foundUser = new AuthorModel.findOne({ uid: args.uid });

			if (!foundUser) {
				const newUser = new AuthorModel(args);
				await newUser.save();
				return newUser;
			}
		},
	},
};
