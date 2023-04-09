import { graphQlRequest } from './request';

export const foldersLoader = async () => {
	const query = `query Folders{
        folders {
            id
            name
        }
    }`;

	const data = await graphQlRequest({ query });
	return data;
};

export const addNewFolder = async (newFolder) => {
	const query = `mutation Mutation($name: String!) {
        addFolder(name: $name) {
          name
          author {
            name
          }
        }
      }`;

	const data = await graphQlRequest({
		query,
		variables: { name: newFolder.name },
	});

	return data;
};
