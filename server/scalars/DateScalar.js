const { GraphQLScalarType, GraphQLError, Kind } = require('graphql');

const DateScalar = new GraphQLScalarType({
    name: 'Date',
    description: 'Date Transfer',
    parseValue(value) {
        return new Date(value); // sent to the client
    },
    serialize(value) {
        return value.toISOString(); // sent to resolvers
    },
    parseLiteral(ast) {
        if (ast.kind !== Kind.STRING) {
            throw new GraphQLError(
                `Query error: Can only parse dates strings, got a: ${ast.kind}`,
                [ast],
            );
        }
        if (isNaN(Date.parse(ast.value))) {
            throw new GraphQLError(`Query error: not a valid date`, [ast]);
        }
        return new Date(ast.value);
    },
})

module.exports = DateScalar;