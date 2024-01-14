const typeSearchResolvers = `
search(searchString: String): [SearchResult!]
searchInAuthors(searchString: String) : [Author]
searchInSeries(searchString: String) : [Series]
searchInBooks(searchString: String) : [Book]
`;

export const search = {
    typeSearchResolvers,
};
