//Defining a custom scalar
import { GraphQLScalarType, Kind } from 'graphql';

export const dateScalar = new GraphQLScalarType({
    description: 'Date custom scalar type',
    name: 'Date',
    parseValue(value: unknown) {
        // method converts the scalar's JSON value to its back-end representation before it's added to a resolver's args
        if (typeof value === 'string' && /[12]{1}\d{3}-[01]?\d?-\d*/.test(value)) {
            return new Date(value); // Convert incoming integer to Date
        }
        throw new Error('GraphQL Date Scalar parser expected a formatted date string');
    },
    serialize(date) {
        // method converts the scalar's back-end representation to a JSON-compatible format so Apollo Server can include it in an operation response.
        if (date instanceof Date) {
            return { day: date.getDate(), month: date.toLocaleString('default', { month: 'long' }), year: date.getFullYear() }; // Convert outgoing Date for JSON
        }
        throw Error('GraphQL Date Scalar serializer expected a `Date` object');
    },
});
