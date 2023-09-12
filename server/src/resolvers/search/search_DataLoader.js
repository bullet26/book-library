const SearchResult = {
    __resolveType(obj, contextValue, info) {
        // Only Author has a name field
        if (obj.surname || obj.name) {
            return 'Author';
        }
        // Only Book has a title field
        if (obj.title) {
            return 'Book';
        }
        return null; // GraphQLError is thrown
    },
};

export const SearchResolver = { ...SearchResult };
