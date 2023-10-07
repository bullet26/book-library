const typeSearchResolvers = `
search(searchString: String): [SearchResult!]
searchInAuthors(searchString: String) : [Author]
searchInSeries(searchString: String) : [Series]
`;

export const search = {
    typeSearchResolvers,
};
